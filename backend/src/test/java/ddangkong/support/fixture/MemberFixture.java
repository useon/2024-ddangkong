package ddangkong.support.fixture;

import ddangkong.domain.balance.room.Room;
import ddangkong.domain.member.Member;

public enum MemberFixture {
    PRIN,
    TACAN,
    KEOCHAN,
    EDEN,
    MARU,
    POME,
    SUNDAY,
    ;

    public Member master(Room room) {
        return Member.createMaster(name().toLowerCase(), room);
    }

    public Member common(Room room) {
        return Member.createCommon(name().toLowerCase(), room);
    }
}
