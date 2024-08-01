package ddangkong.domain.balance.room;

public enum RoomStatus {
    READY,
    PROGRESS,
    FINISH,
    ;

    public boolean isGameProgress() {
        return this == PROGRESS;
    }
}