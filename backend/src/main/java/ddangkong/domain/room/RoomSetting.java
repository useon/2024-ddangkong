package ddangkong.domain.room;

import ddangkong.domain.balance.content.Category;
import ddangkong.exception.BadRequestException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomSetting {

    private static final int DEFAULT_TOTAL_ROUND = 5;
    private static final int MIN_TOTAL_ROUND = 3;
    private static final int MAX_TOTAL_ROUND = 10;
    private static final List<Integer> ALLOWED_TIME_LIMIT = List.of(5_000, 10_000, 15_000);
    private static final int DEFAULT_TIME_LIMIT_MSEC = 10_000;

    @Column(nullable = false)
    private int totalRound;

    @Column(nullable = false)
    private int timeLimit;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    public static RoomSetting createNewRoomSetting() {
        return new RoomSetting(DEFAULT_TOTAL_ROUND, DEFAULT_TIME_LIMIT_MSEC, Category.EXAMPLE);
    }

    public RoomSetting(int totalRound, int timeLimit, Category category) {
        validateTotalRound(totalRound);
        validateTimeLimit(timeLimit);

        this.totalRound = totalRound;
        this.timeLimit = timeLimit;
        this.category = category;
    }

    private void validateTotalRound(int totalRound) {
        if (totalRound < MIN_TOTAL_ROUND || totalRound > MAX_TOTAL_ROUND) {
            throw new BadRequestException("총 라운드는 %d 이상, %d 이하만 가능합니다. requested totalRound: %d"
                    .formatted(MIN_TOTAL_ROUND, MAX_TOTAL_ROUND, totalRound));
        }
    }

    private void validateTimeLimit(int timeLimit) {
        if (!ALLOWED_TIME_LIMIT.contains(timeLimit)) {
            throw new BadRequestException("시간 제한은 %dms / %dms / %dms 만 가능합니다. requested timeLimit: %d"
                    .formatted(ALLOWED_TIME_LIMIT.get(0), ALLOWED_TIME_LIMIT.get(1), ALLOWED_TIME_LIMIT.get(2),
                            timeLimit));
        }
    }

    public void updateTotalRound(int totalRound) {
        validateTotalRound(totalRound);
        this.totalRound = totalRound;
    }

    public void updateTimeLimit(int timeLimit) {
        validateTimeLimit(timeLimit);
        this.timeLimit = timeLimit;
    }

    public void updateCategory(Category category) {
        this.category = category;
    }

    public boolean isFinalRound(int currentRound) {
        return totalRound == currentRound;
    }
}
