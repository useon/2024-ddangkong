package ddangkong.service.balance.room;

import ddangkong.controller.balance.content.dto.BalanceContentResponse;
import ddangkong.controller.balance.member.dto.MemberResponse;
import ddangkong.controller.balance.room.dto.RoomInfoResponse;
import ddangkong.controller.balance.room.dto.RoomJoinResponse;
import ddangkong.domain.balance.content.BalanceContent;
import ddangkong.domain.balance.content.BalanceContentRepository;
import ddangkong.domain.balance.content.Category;
import ddangkong.domain.balance.option.BalanceOptionRepository;
import ddangkong.domain.balance.option.BalanceOptions;
import ddangkong.domain.balance.room.Room;
import ddangkong.domain.balance.room.RoomContent;
import ddangkong.domain.balance.room.RoomContentRepository;
import ddangkong.domain.balance.room.RoomRepository;
import ddangkong.domain.member.Member;
import ddangkong.domain.member.MemberRepository;
import ddangkong.exception.BadRequestException;
import ddangkong.exception.InternalServerException;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    private final MemberRepository memberRepository;

    private final RoomContentRepository roomContentRepository;

    private final BalanceContentRepository balanceContentRepository;

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
    public void startGame(Long roomId) {
        Room room = roomRepository.getById(roomId);
        room.startGame();

        // TODO Room에 카테고리 도입 후 수정
        List<BalanceContent> balanceContents = findByRandom(Category.EXAMPLE, room.getTotalRound());
        List<RoomContent> roomContents = createRoomContents(room, balanceContents);
        startRound(roomContents.get(0));
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
                .mapToObj(index -> new RoomContent(room, balanceContents.get(index), index + 1))
                .toList();
    }

    private void startRound(RoomContent roomContent) {
        // TODO #109 머지 시 반영
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
}
