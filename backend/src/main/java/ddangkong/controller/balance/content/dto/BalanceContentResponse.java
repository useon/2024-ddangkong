package ddangkong.controller.balance.content.dto;

import ddangkong.controller.balance.option.dto.BalanceOptionResponse;
import ddangkong.domain.balance.content.Category;
import ddangkong.domain.balance.option.BalanceOptions;
import ddangkong.domain.balance.room.RoomContent;
import lombok.Builder;

public record BalanceContentResponse(
        Long contentId,
        Category category,
        int totalRound,
        int currentRound,
        String question,
        BalanceOptionResponse firstOption,
        BalanceOptionResponse secondOption
) {

    @Builder
    private BalanceContentResponse(RoomContent roomContent,
                                   BalanceOptions balanceOptions) {
        this(roomContent.getContentId(),
                roomContent.getContentCategory(),
                roomContent.getTotalRound(),
                roomContent.getRound(),
                roomContent.getContentName(),
                BalanceOptionResponse.from(balanceOptions.getFistOption()),
                BalanceOptionResponse.from(balanceOptions.getSecondOption()));
    }
}
