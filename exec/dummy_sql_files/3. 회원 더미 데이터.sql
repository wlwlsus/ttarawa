DELIMITER $$
DROP PROCEDURE IF EXISTS insertUser$$
 
CREATE PROCEDURE insertUser()
BEGIN
    DECLARE i INT DEFAULT 1;
        
    WHILE i <= 30 DO
        INSERT INTO users (email, nickname, provider) VALUES(concat('test',i,'@test.com'), concat('test',i), (SELECT * FROM
			(SELECT 'GOOGLE' AS provider FROM DUAL UNION ALL SELECT 'NAVER' AS provider FROM DUAL UNION ALL SELECT 'KAKAO' AS provider FROM DUAL) AS provider
			ORDER BY RAND()
			LIMIT 1) );
        
      	INSERT INTO users_info (total_distance, badge_id, users_id)
      	SELECT 0, 1, users_id
      	FROM users
      	WHERE nickname = CONCAT('test',i)
      	ORDER BY users_id
      	LIMIT 1;  
      	
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER $$


CALL insertUser;