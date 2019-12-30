
INSERT INTO users (username, salt, password) VALUES
('user1', 'de7ffcddc92bb453ef6f802bf367bbc6af36db709ff864f02fab5fc914918bd5', 'c26ebd5c42ee105de01aa7d09693bd3d8d2f0396301b5490da48057d604d5d93'),
('user2', 'b35870b815e6c08788135598262df17d1e3675abbc422241f458e45c3434da57', 'd2836abc867745190d2c1fc539c1c17baa47e8a075371b7ff8ddd98a0e74aaef'),
('user3', 'bf2cd9505ad22aafcee7e3ff62f80fd39281889265325eb7c97f9c033848d173', 'ec54bd743206446fa7b4d480429b8fe214c581363460f131f77d6d135d8390df');

INSERT INTO todos (user_id, description) VALUES
(1, 'Vivamus tempus'),
(1, 'lorem ac odio'),
(1, 'Ut congue odio'),
(1, 'Sodales finibus'),
(1, 'Accumsan nunc vitae'),
(2, 'Lorem ipsum'),
(2, 'In lacinia est'),
(2, 'Odio varius gravida');