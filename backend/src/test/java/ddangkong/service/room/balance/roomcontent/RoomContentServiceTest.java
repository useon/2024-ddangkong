package ddangkong.service.room.balance.roomcontent;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import ddangkong.domain.balance.content.BalanceContent;
import ddangkong.domain.balance.content.Category;
import ddangkong.domain.room.Room;
import ddangkong.domain.room.RoomSetting;
import ddangkong.domain.room.RoomStatus;
import ddangkong.domain.room.balance.roomcontent.RoomContent;
import ddangkong.exception.BadRequestException;
import ddangkong.facade.BaseServiceTest;
import ddangkong.support.annotation.FixedClock;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class RoomContentServiceTest extends BaseServiceTest {

    @Autowired
    private RoomContentService roomContentService;

    @Nested
    class 방_컨텐츠들_준비 {

        @Test
        void 컨텐츠_개수만큼_방_컨텐츠를_생성하고_첫_번째_방_컨텐츠를_시작한다() {
            // given
            Room room = roomRepository.save(Room.createNewRoom());
            List<BalanceContent> contents = balanceContentRepository.saveAll(List.of(
                    new BalanceContent(Category.EXAMPLE, "민초 vs 반민초"),
                    new BalanceContent(Category.EXAMPLE, "카리나 vs 윈터"),
                    new BalanceContent(Category.EXAMPLE, "산 vs 바다"),
                    new BalanceContent(Category.EXAMPLE, "얼굴 vs 성격"),
                    new BalanceContent(Category.EXAMPLE, "부먹 vs 찍먹")
            ));

            // when
            roomContentService.prepareRoomContents(room, contents);

            // then
            List<RoomContent> roomContents = roomContentRepository.findAllByRoom(room);
            roomContents.sort(Comparator.comparingInt(RoomContent::getRound));
            assertAll(
                    () -> assertThat(roomContents).hasSize(5),
                    () -> assertThat(roomContents.get(0).getRoundEndedAt()).isNotNull(),
                    () -> assertThatThrownBy(() -> roomContents.get(1).getRoundEndedAt())
                            .isExactlyInstanceOf(BadRequestException.class)
            );
        }
    }

    @Nested
    class 다음_방_컨텐츠_진행 {

        @Test
        void 다음_방_컨텐츠를_진행한다() {
            // given
            int currentRound = 2;
            RoomSetting roomSetting = new RoomSetting(5, 10_000, Category.EXAMPLE);
            Room room = roomRepository.save(
                    new Room("uuid", currentRound, RoomStatus.PROGRESS, roomSetting));
            BalanceContent content = balanceContentRepository.save(new BalanceContent(Category.EXAMPLE, "A vs B"));
            roomContentRepository.save(RoomContent.newRoomContent(room, content, currentRound));

            // when
            roomContentService.progressNextRoomContent(room);

            // then
            RoomContent roomContent = roomContentRepository.findByRoomAndRound(room, currentRound).orElseThrow();
            assertThat(roomContent.getRoundEndedAt()).isNotNull();
        }
    }

    @Nested
    class 방_컨텐츠_삭제 {

        @Test
        void 모든_방_컨텐츠를_삭제한다() {
            // given
            Room room = roomRepository.save(Room.createNewRoom());
            List<BalanceContent> contents = balanceContentRepository.saveAll(List.of(
                    new BalanceContent(Category.EXAMPLE, "민초 vs 반민초"),
                    new BalanceContent(Category.EXAMPLE, "카리나 vs 윈터"),
                    new BalanceContent(Category.EXAMPLE, "산 vs 바다"),
                    new BalanceContent(Category.EXAMPLE, "얼굴 vs 성격"),
                    new BalanceContent(Category.EXAMPLE, "부먹 vs 찍먹")
            ));
            for (int i = 0; i < contents.size(); i++) {
                roomContentRepository.save(RoomContent.newRoomContent(room, contents.get(i), i + 1));
            }

            // when
            roomContentService.deleteRoomContents(room);

            // then
            List<RoomContent> roomContents = roomContentRepository.findAllByRoom(room);
            assertThat(roomContents).hasSize(0);
        }
    }

    @Nested
    class 현재_라운드의_방_컨텐츠_조회 {

        @Test
        void 현재_라운드의_방_컨텐츠를_조회한다() {
            // given
            int currentRound = 3;
            RoomSetting roomSetting = new RoomSetting(5, 10_000, Category.EXAMPLE);
            Room room = roomRepository.save(
                    new Room("uuid", currentRound, RoomStatus.PROGRESS, roomSetting));
            BalanceContent content = balanceContentRepository.save(new BalanceContent(Category.EXAMPLE, "A vs B"));
            roomContentRepository.save(RoomContent.newRoomContent(room, content, currentRound));

            // when
            RoomContent roomContent = roomContentService.getCurrentRoundRoomContent(room);

            // then
            assertThat(roomContent.getRound()).isEqualTo(currentRound);
        }
    }

    @Nested
    class 라운드_종료_여부_조회 {

        @Test
        @FixedClock(date = "2024-08-17", time = "16:20:15")
        void 현재_시간이_현재_라운드_방_컨텐츠의_종료_시간보다_이후이면_해당_라운드는_종료된_것이다() {
            // given
            int currentRound = 3;
            RoomSetting roomSetting = new RoomSetting(5, 10_000, Category.EXAMPLE);
            Room room = roomRepository.save(
                    new Room("uuid", currentRound, RoomStatus.PROGRESS, roomSetting));
            BalanceContent content = balanceContentRepository.save(new BalanceContent(Category.EXAMPLE, "A vs B"));
            LocalDateTime roundEndedAt = LocalDateTime.parse("2024-08-17T16:20:14");
            roomContentRepository.save(new RoomContent(room, content, currentRound, roundEndedAt));

            // when
            boolean isRoundFinished = roomContentService.isRoundFinished(room, content);

            // then
            assertThat(isRoundFinished).isTrue();
        }

        @Test
        @FixedClock(date = "2024-08-17", time = "16:20:15")
        void 현재_시간이_현재_라운드_방_컨텐츠의_종료_시간보다_이전이면_해당_라운드는_종료되지_않은_것이다() {
            // given
            int currentRound = 3;
            RoomSetting roomSetting = new RoomSetting(5, 10_000, Category.EXAMPLE);
            Room room = roomRepository.save(
                    new Room("uuid", currentRound, RoomStatus.PROGRESS, roomSetting));
            BalanceContent content = balanceContentRepository.save(new BalanceContent(Category.EXAMPLE, "A vs B"));
            LocalDateTime roundEndedAt = LocalDateTime.parse("2024-08-17T16:20:16");
            roomContentRepository.save(new RoomContent(room, content, currentRound, roundEndedAt));

            // when
            boolean isRoundFinished = roomContentService.isRoundFinished(room, content);

            // then
            assertThat(isRoundFinished).isFalse();
        }
    }
}
