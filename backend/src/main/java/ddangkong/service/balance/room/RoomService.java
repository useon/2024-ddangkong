package ddangkong.service.balance.room;

import ddangkong.controller.balance.content.dto.BalanceContentResponse;
import ddangkong.controller.balance.member.dto.MemberResponse;
import ddangkong.controller.balance.room.dto.RoomInfoResponse;
import ddangkong.controller.balance.room.dto.RoomJoinResponse;
import ddangkong.controller.balance.room.dto.RoomSettingRequest;
import ddangkong.domain.balance.option.BalanceOptionRepository;
import ddangkong.domain.balance.option.BalanceOptions;
import ddangkong.domain.balance.room.Room;
import ddangkong.domain.balance.room.RoomContent;
import ddangkong.domain.balance.room.RoomContentRepository;
import ddangkong.domain.balance.room.RoomRepository;
import ddangkong.domain.member.Member;
import ddangkong.domain.member.MemberRepository;
import ddangkong.exception.BadRequestException;
import ddangkong.service.balance.room.dto.RoundFinishedResponse;
import java.util.List;
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

    private final BalanceOptionRepository balanceOptionRepository;

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
        Room room = roomRepository.getById(roomId);
        Member member = memberRepository.save(Member.createCommon(nickname, room));
        return new RoomJoinResponse(room.getId(), new MemberResponse(member));
    }

    @Transactional
    public BalanceContentResponse moveToNextRound(Long roomId) {
        Room room = roomRepository.getById(roomId);
        room.moveToNextRound();

        RoomContent roomContent = findCurrentRoomContent(room);
        BalanceOptions balanceOptions = balanceOptionRepository.getBalanceOptionsByBalanceContent(
                roomContent.getBalanceContent());
        return BalanceContentResponse.builder()
                .roomContent(roomContent)
                .balanceOptions(balanceOptions)
                .build();
    }

    private RoomContent findCurrentRoomContent(Room room) {
        return roomContentRepository.findByRoomAndRound(room, room.getCurrentRound())
                .orElseThrow(() -> new BadRequestException("해당 방의 현재 진행중인 질문이 존재하지 않습니다."));
    }

    @Transactional
    public void updateRoomSetting(Long roomId, RoomSettingRequest request) {
        Room room = roomRepository.getById(roomId);

        room.updateTimeLimit(request.timeLimit());
        room.updateTotalRound(request.totalRound());
        room.updateCategory(request.category());
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
            roomContent.updateUsed();
        }

        if (room.getTotalRound() != roomContents.size()) {
            log.error("방의 총 라운드와 방 컨텐츠 개수가 일치하지 않습니다. roomId: {}, totalRound: {}, roomContent 개수: {}",
                    roomId, room.getTotalRound(), roomContents.size());
        }
    }
}
