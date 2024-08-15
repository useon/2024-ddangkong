package ddangkong.service.balance.room;

import ddangkong.domain.balance.content.BalanceContent;
import ddangkong.domain.balance.content.BalanceContentRepository;
import ddangkong.domain.balance.content.Category;
import ddangkong.domain.balance.room.Room;
import ddangkong.domain.balance.room.RoomContent;
import ddangkong.domain.balance.room.RoomContentRepository;
import ddangkong.domain.balance.room.RoomRepository;
import ddangkong.domain.member.Member;
import ddangkong.domain.member.MemberRepository;
import ddangkong.exception.BadRequestException;
import ddangkong.exception.InternalServerException;
import ddangkong.service.balance.member.dto.MemberResponse;
import ddangkong.service.balance.room.dto.RoomInfoResponse;
import ddangkong.service.balance.room.dto.RoomJoinResponse;
import ddangkong.service.balance.room.dto.RoomSettingRequest;
import ddangkong.service.balance.room.dto.RoundFinishedResponse;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;

    private final MemberRepository memberRepository;

    private final RoomContentRepository roomContentRepository;

    private final BalanceContentRepository balanceContentRepository;

    private final Clock clock;

    @Transactional(readOnly = true)
    public RoomInfoResponse findRoomInfo(Long roomId) {
        Room room = roomRepository.getById(roomId);
        List<Member> members = memberRepository.findAllByRoom(room);

        return RoomInfoResponse.of(members, room);
    }

    @Transactional
    public RoomJoinResponse createRoom(String nickname) {
        Room room = roomRepository.save(Room.createNewRoom());
        Member member = memberRepository.save(Member.createMaster(nickname, room));
        return new RoomJoinResponse(room.getId(), new MemberResponse(member));
    }

    @Transactional
    public RoomJoinResponse joinRoom(String nickname, Long roomId) {
        Room room = roomRepository.findByIdWithLock(roomId)
                .orElseThrow(() -> new BadRequestException("해당 방이 존재하지 않습니다."));
        long memberCountInRoom = memberRepository.countByRoom(room);

        if (room.isOverMaximumMember(memberCountInRoom)) {
            throw new BadRequestException("방의 인원 수가 가득 찼습니다.");
        }

        Member member = memberRepository.save(Member.createCommon(nickname, room));
        return new RoomJoinResponse(room.getId(), new MemberResponse(member));
    }

    @Transactional
    public void startGame(Long roomId) {
        Room room = roomRepository.getById(roomId);
        room.startGame();

        List<BalanceContent> balanceContents = findByRandom(room.getCategory(), room.getTotalRound());
        List<RoomContent> roomContents = createRoomContents(room, balanceContents);
        startFirstRound(roomContents, room.getTimeLimit());
        roomContentRepository.saveAll(roomContents);
    }

    private List<BalanceContent> findByRandom(Category category, int count) {
        List<BalanceContent> contents = balanceContentRepository.findByCategory(category);
        if (contents.size() < count) {
            throw new InternalServerException("DB의 질문 수가 부족합니다. category : " + category);
        }

        Collections.shuffle(contents);
        return contents.subList(0, count);
    }

    private List<RoomContent> createRoomContents(Room room, List<BalanceContent> balanceContents) {
        return IntStream.range(0, balanceContents.size())
                .mapToObj(index -> RoomContent.newRoomContent(room, balanceContents.get(index), index + 1))
                .toList();
    }

    private void startFirstRound(List<RoomContent> roomContents, int timeLimit) {
        roomContents.get(0).updateRoundEndedAt(LocalDateTime.now(clock), timeLimit);
    }

    @Transactional
    public void updateRoomSetting(Long roomId, RoomSettingRequest request) {
        Room room = roomRepository.getById(roomId);

        room.updateTimeLimit(request.timeLimit());
        room.updateTotalRound(request.totalRound());
        room.updateCategory(request.category());
    }

    @Transactional
    public void moveToNextRound(Long roomId) {
        Room room = roomRepository.getById(roomId);
        room.moveToNextRound();

        if (room.isGameProgress()) {
            RoomContent roomContent = getCurrentRoomContent(room);
            roomContent.updateRoundEndedAt(LocalDateTime.now(clock), room.getTimeLimit());
        }
    }

    private RoomContent getCurrentRoomContent(Room room) {
        return roomContentRepository.findByRoomAndRound(room, room.getCurrentRound())
                .orElseThrow(() -> new InternalServerException("해당 룸에서 진행 중인 라운드 컨텐츠가 존재하지 않습니다."));
    }

    @Transactional(readOnly = true)
    public RoundFinishedResponse getRoundFinished(Long roomId, int round) {
        Room room = roomRepository.getById(roomId);
        return new RoundFinishedResponse(room.isRoundFinished(round), room.isAllRoundFinished());
    }

    @Transactional
    public void resetRoom(Long roomId) {
        Room room = roomRepository.getById(roomId);
        room.reset();
        List<RoomContent> roomContents = roomContentRepository.findAllByRoomAndIsUsed(room, false);
        for (RoomContent roomContent : roomContents) {
            roomContent.finish();
        }

        if (room.getTotalRound() != roomContents.size()) {
            log.error("방의 총 라운드와 방 컨텐츠 개수가 일치하지 않습니다. roomId: {}, totalRound: {}, roomContent 개수: {}",
                    roomId, room.getTotalRound(), roomContents.size());
        }
    }
}
