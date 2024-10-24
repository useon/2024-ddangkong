package ddangkong.controller.room;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RoomMemberCookieEncryptor {

    private static final String DEFAULT_PATH = "/api/balances/rooms";
    private static final String NONE = "None";
    private static final String LAX = "Lax";
    private static final String LOCALHOST = "http://localhost";

    private final EncryptionUtils encryptionUtils;

    private final String rejoinKey;

    public RoomMemberCookieEncryptor(EncryptionUtils encryptionUtils, @Value("${cookie.rejoin-key}") String rejoinKey) {
        this.encryptionUtils = encryptionUtils;
        this.rejoinKey = rejoinKey;
    }

    public ResponseCookie getEncodedCookie(Object value, String requestURL) {
        String encrypt = encryptionUtils.encrypt(String.valueOf(value));
        return ResponseCookie.from(rejoinKey, encrypt)
                .httpOnly(true)
                .secure(true)
                .path(DEFAULT_PATH)
                .sameSite(getSameSiteOption(requestURL))
                .build();
    }

    private String getSameSiteOption(String url) {
        log.info("request url = {}", url);
        if (url.startsWith(LOCALHOST)) {
            return NONE;
        }
        return LAX;
    }

    public Long getDecodedCookieValue(String cookieValue) {
        return Long.parseLong(encryptionUtils.decrypt(cookieValue));
    }
}
