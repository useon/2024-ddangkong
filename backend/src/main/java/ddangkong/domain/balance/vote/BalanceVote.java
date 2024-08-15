package ddangkong.domain.balance.vote;

import ddangkong.domain.balance.option.BalanceOption;
import ddangkong.domain.room.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class BalanceVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "balance_option_id", nullable = false)
    private BalanceOption balanceOption;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    public BalanceVote(BalanceOption balanceOption, Member member) {
        this.balanceOption = balanceOption;
        this.member = member;
    }

    public Long getOptionId() {
        return balanceOption.getId();
    }

    public String getMemberNickname() {
        return member.getNickname();
    }
}
