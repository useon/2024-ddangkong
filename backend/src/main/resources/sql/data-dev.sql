INSERT INTO balance_content (category, name)
VALUES ('EXAMPLE', '민초 vs 반민초'),
       ('EXAMPLE', '월 150 백수 vs 월 500 직장인'),
       ('EXAMPLE', '팔만대장경 다 읽기 vs 대장내시경 팔만번 하기'),
       ('EXAMPLE', '개구리 맛 초콜릿 vs 초콜릿 맛 개구리'),
       ('EXAMPLE', '언제 죽을 지 알기 vs 어떻게 죽을 지 알기');


INSERT INTO balance_option (name, balance_content_id)
VALUES ('민초', 1),
       ('반민초', 1),
       ('월 150 백수', 2),
       ('월 500 직장인', 2),
       ('팔만대장경 다 읽기', 3),
       ('대장내시경 팔만번 하기', 3),
       ('개구리 맛 초콜릿', 4),
       ('초콜릿 맛 개구리', 4),
       ('언제 죽을 지 알기', 5),
       ('어떻게 죽을 지 알기', 5);


INSERT INTO room(total_round, current_round, time_limit, status)
VALUES (5, 1, 30000, 'READY');


INSERT INTO room_content(room_id, balance_content_id, round, created_at)
VALUES (1, 1, 1, '2024-07-25 13:24:09'),
       (1, 2, 2, '2024-07-25 13:24:09'),
       (1, 3, 3, '2024-07-25 13:24:09'),
       (1, 4, 4, '2024-07-25 13:24:09'),
       (1, 5, 5, '2024-07-25 13:24:09');


INSERT INTO member(room_id, nickname, is_master)
VALUES (1, '콩콩', true);