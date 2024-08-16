package ddangkong.documentation.room;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.JsonFieldType.ARRAY;
import static org.springframework.restdocs.payload.JsonFieldType.BOOLEAN;
import static org.springframework.restdocs.payload.JsonFieldType.NUMBER;
import static org.springframework.restdocs.payload.JsonFieldType.OBJECT;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ddangkong.controller.room.RoomController;
import ddangkong.documentation.BaseDocumentationTest;
import ddangkong.domain.balance.content.Category;
import ddangkong.facade.room.RoomFacade;
import ddangkong.facade.room.dto.RoomInfoResponse;
import ddangkong.facade.room.dto.RoomJoinRequest;
import ddangkong.facade.room.dto.RoomJoinResponse;
import ddangkong.facade.room.dto.RoomSettingRequest;
import ddangkong.facade.room.dto.RoomSettingResponse;
import ddangkong.facade.room.dto.RoundFinishedResponse;
import ddangkong.facade.room.member.dto.MemberResponse;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

@WebMvcTest(RoomController.class)
class RoomDocumentationTest extends BaseDocumentationTest {

    @MockBean
    private RoomFacade roomFacade;

    @Nested
    class 방_생성 {

        private static final String ENDPOINT = "/api/balances/rooms";

        @Test
        void 방을_생성한다() throws Exception {
            // given
            MemberResponse memberResponse = new MemberResponse(1L, "땅콩", true);
            RoomJoinResponse response = new RoomJoinResponse(1L, memberResponse);
            when(roomFacade.createRoom(anyString())).thenReturn(response);

            RoomJoinRequest request = new RoomJoinRequest("땅콩");
            String content = objectMapper.writeValueAsString(request);

            // when & then
            mockMvc.perform(post(ENDPOINT, 1L)
                            .content(content)
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isCreated())
                    .andDo(document("room/create",
                            requestFields(
                                    fieldWithPath("nickname").description("닉네임")
                            ),
                            responseFields(
                                    fieldWithPath("roomId").type(NUMBER).description("생성된 방 ID"),
                                    fieldWithPath("member.memberId").type(NUMBER).description("멤버 ID"),
                                    fieldWithPath("member.nickname").type(STRING).description("멤버 닉네임"),
                                    fieldWithPath("member.isMaster").type(BOOLEAN).description("방장 여부")
                            )
                    ));
        }

    }

    @Nested
    class 방_정보_조회 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}";

        @Test
        void 방_정보를_조회한다() throws Exception {
            // given
            int totalRound = 5;
            int timeLimit = 30000;
            Category category = Category.EXAMPLE;
            RoomInfoResponse response = new RoomInfoResponse(
                    false,
                    new RoomSettingResponse(totalRound, timeLimit, category),
                    List.of(
                            new MemberResponse(1L, "땅콩", true),
                            new MemberResponse(2L, "타콩", false)
                    ));
            when(roomFacade.findRoomInfo(anyLong())).thenReturn(response);

            // when & then
            mockMvc.perform(get(ENDPOINT, 1L))
                    .andExpect(status().isOk())
                    .andDo(document("room/info",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            ),
                            responseFields(
                                    fieldWithPath("isGameStart").type(BOOLEAN).description("게임 시작 여부"),
                                    fieldWithPath("roomSetting").type(OBJECT).description("현재 방 설정 값"),
                                    fieldWithPath("roomSetting.totalRound").type(NUMBER).description("전체 라운드"),
                                    fieldWithPath("roomSetting.timeLimit").type(NUMBER).description("라운드 당 시간제한(ms)"),
                                    fieldWithPath("roomSetting.category").type(STRING).description("컨텐츠 카테고리"),
                                    fieldWithPath("members").type(ARRAY).description("방에 참여중 인원 목록"),
                                    fieldWithPath("members[].memberId").type(NUMBER).description("멤버 ID"),
                                    fieldWithPath("members[].nickname").type(STRING).description("멤버 닉네임"),
                                    fieldWithPath("members[].isMaster").type(BOOLEAN).description("방장 여부")
                            )
                    ));
        }
    }

    @Nested
    class 방_설정_변경 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}";

        @Test
        void 방의_설정_정보를_변경한다() throws Exception {
            // given
            int totalRound = 5;
            int timeLimit = 30_000;
            Category category = Category.EXAMPLE;
            RoomSettingRequest content = new RoomSettingRequest(totalRound, timeLimit, category);

            // then
            mockMvc.perform(patch(ENDPOINT, 1L)
                            .content(objectMapper.writeValueAsString(content))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isNoContent())
                    .andDo(document("room/setting",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            ),
                            requestFields(
                                    fieldWithPath("totalRound").type(NUMBER).description("변경할 총 라운드"),
                                    fieldWithPath("timeLimit").type(NUMBER).description("변경할 제한 시간"),
                                    fieldWithPath("category").type(STRING).description("변경할 카테고리")
                            )
                    ));
        }
    }

    @Nested
    class 방_참여 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}/members";

        @Test
        void 방에_참여한다() throws Exception {
            // given
            RoomJoinResponse response = new RoomJoinResponse(1L, new MemberResponse(2L, "타콩", false));
            when(roomFacade.joinRoom(anyString(), anyLong())).thenReturn(response);

            RoomJoinRequest request = new RoomJoinRequest("타콩");
            String content = objectMapper.writeValueAsString(request);

            //when & then
            mockMvc.perform(post(ENDPOINT, 1L)
                            .content(content)
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isCreated())
                    .andDo(document("room/join",
                            pathParameters(
                                    parameterWithName("roomId").description("참여방 ID")
                            ),
                            requestFields(
                                    fieldWithPath("nickname").description("닉네임")
                            ),
                            responseFields(
                                    fieldWithPath("roomId").type(NUMBER).description("생성된 방 ID"),
                                    fieldWithPath("member.memberId").type(NUMBER).description("멤버 ID"),
                                    fieldWithPath("member.nickname").type(STRING).description("멤버 닉네임"),
                                    fieldWithPath("member.isMaster").type(BOOLEAN).description("방장 여부")
                            )
                    ));
        }

    }

    @Nested
    class 게임_시작 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}/start";

        @Test
        void 게임을_시작한다() throws Exception {
            // given
            Long roomId = 1L;

            // when & then
            mockMvc.perform(patch(ENDPOINT, roomId))
                    .andExpect(status().isNoContent())
                    .andDo(document("room/start",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            )
                    ));
        }
    }

    @Nested
    class 다음_라운드로_이동 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}/next-round";

        @Test
        void 다음_라운드로_이동한다() throws Exception {
            // when & then
            mockMvc.perform(patch(ENDPOINT, 1L)
                            .contentType(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isNoContent())
                    .andDo(document("room/nextRound",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            )
                    ));
        }
    }

    @Nested
    class 라운드_종료_여부 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}/round-finished";

        @Test
        void 라운드가_종료되었는지_조회한다() throws Exception {
            // given
            RoundFinishedResponse response = new RoundFinishedResponse(true, false);
            when(roomFacade.getRoundFinished(anyLong(), anyInt())).thenReturn(response);

            // when & then
            mockMvc.perform(get(ENDPOINT, 1)
                            .param("round", "1")
                    )
                    .andExpect(status().isOk())
                    .andDo(document("room/roundFinished",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            ),
                            queryParameters(
                                    parameterWithName("round").description("라운드")
                            ),
                            responseFields(
                                    fieldWithPath("isRoundFinished").description("라운드 종료 여부"),
                                    fieldWithPath("isGameFinished").description("게임 종료 여부")
                            )
                    ));
        }
    }

    @Nested
    class 방_초기화 {

        private static final String ENDPOINT = "/api/balances/rooms/{roomId}/reset";

        @Test
        void 방을_초기화한다() throws Exception {
            // given
            doNothing().when(roomFacade).resetRoom(anyLong());

            // when & then
            mockMvc.perform(patch(ENDPOINT, 1L))
                    .andExpect(status().isNoContent())
                    .andDo(document("room/reset",
                            pathParameters(
                                    parameterWithName("roomId").description("방 ID")
                            )
                    ));
        }
    }
}