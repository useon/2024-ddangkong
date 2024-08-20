package ddangkong.exception.room.member;

import static ddangkong.exception.ErrorCode.NOT_ROOM_MEMBER;

import ddangkong.exception.BadRequestException;

public class NotRoomMemberException extends BadRequestException {

    public NotRoomMemberException() {
        super(NOT_ROOM_MEMBER.getMessage());
    }
}
