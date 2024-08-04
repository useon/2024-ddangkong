INSERT INTO room (total_round, current_round, time_limit, status, category)
VALUES (5, 2, 30000, 'PROGRESS', 'EXAMPLE'),
       (5, 1, 30000, 'PROGRESS', 'EXAMPLE'),
       (5, 1, 30000, 'PROGRESS', 'EXAMPLE'),
       (3, 1, 30000, 'READY', 'EXAMPLE'),
       (3, 1, 30000, 'FINISH', 'EXAMPLE');

INSERT INTO member (nickname, room_id, is_master)
VALUES ('mohamedeu al katan', 1, true),
       ('deundeun', 1, false),
       ('rupi', 1, false),
       ('rapper lee', 1, false),
       ('alpha', 2, true),
       ('bravo', 2, false),
       ('ready player', 4, true),
       ('finish player', 5, true);

INSERT INTO balance_content (category, name)
VALUES ('EXAMPLE', '민초 vs 반민초'),
       ('EXAMPLE', '월 200 백수 vs 월 500 직장인'),
       ('EXAMPLE', '다음 중 여행가고 싶은 곳은?');

INSERT INTO room_content (room_id, balance_content_id, round, created_at, is_used)
VALUES (1, 2, 1, '2024-07-18 19:50:00.000', false),
       (1, 1, 2, '2024-07-18 20:00:00.000', false),
       (1, 3, 3, '2024-07-18 20:00:00.000', false),
       (3, 1, 1, '2024-07-18 19:51:00.000', false);

INSERT INTO balance_option (name, balance_content_id)
VALUES ('민초', 1),
       ('반민초', 1),
       ('월 200 백수', 2),
       ('월 200 직장인', 2),
       ('산', 3),
       ('바다', 3);

INSERT INTO balance_vote (balance_option_id, member_id)
VALUES (4, 1),
       (4, 2),
       (4, 3),
       (4, 4),
       (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (2, 5),
       (2, 6);
