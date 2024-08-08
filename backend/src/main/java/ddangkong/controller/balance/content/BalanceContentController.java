package ddangkong.controller.balance.content;

import ddangkong.controller.balance.content.dto.BalanceContentResponse;
import ddangkong.service.balance.content.BalanceContentService;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Validated
@RequiredArgsConstructor
@Slf4j
public class BalanceContentController {

    private final BalanceContentService balanceContentService;

    @GetMapping("/balances/rooms/{roomId}/content")
    public BalanceContentResponse getBalanceContent(@PathVariable @Positive Long roomId) {
        BalanceContentResponse recentBalanceContent = balanceContentService.getRecentBalanceContent(roomId);
        log.info("recentBalanceContent: {}", recentBalanceContent);
        return recentBalanceContent;
    }
}
