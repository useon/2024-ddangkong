package ddangkong.service.balance.vote.dto;

public record VoteFinishedResponse(
        boolean isFinished
) {

    public static VoteFinishedResponse roundFinished() {
        return new VoteFinishedResponse(true);
    }

    public static VoteFinishedResponse allVoteFinished(boolean isAllVoteFinished) {
        return new VoteFinishedResponse(isAllVoteFinished);
    }
}
