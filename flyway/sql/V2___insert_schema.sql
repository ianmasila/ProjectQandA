INSERT INTO users (email, password, admin)
  VALUES ('nai@notadmin.com', '$2a$12$Rak6Y.JwgaMm5DdbjoasuO/ytCJs5gB5buaJDMlDZeAHwwfi9ZhrC', FALSE);

INSERT INTO users (email, password, admin)
  VALUES ('other@notadmin.com', '$2a$12$KLtwFkEUGbOFVcuPBFzxgufjFIIjwcgWZsyjcT2MXauYs/QIH7DsS', FALSE);

INSERT INTO questions (user_id, topic_id, question_text)
  VALUES ((SELECT id FROM users WHERE email = 'admin@admin.com'), (SELECT id FROM topics WHERE name = 'Finnish language'), 'What is the word for <black> in Finnish?');

INSERT INTO question_answer_options (question_id, option_text, is_correct)
  VALUES ((SELECT id FROM questions WHERE question_text = 'What is the word for <black> in Finnish?'), 'Musta', true);

INSERT INTO question_answer_options (question_id, option_text, is_correct)
  VALUES ((SELECT id FROM questions WHERE question_text = 'What is the word for <black> in Finnish?'), 'Valkoinen', FALSE);

INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
  VALUES ((SELECT id FROM users WHERE email = 'nai@notadmin.com'), (SELECT id FROM questions WHERE question_text = 'What is the word for <black> in Finnish?'),
    (SELECT id FROM question_answer_options WHERE option_text = 'Musta'));

INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
  VALUES ((SELECT id FROM users WHERE email = 'other@notadmin.com'), (SELECT id FROM questions WHERE question_text = 'What is the word for <black> in Finnish?'),
    (SELECT id FROM question_answer_options WHERE option_text = 'Valkoinen'));