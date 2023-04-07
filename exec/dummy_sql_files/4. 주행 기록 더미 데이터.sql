DELIMITER $$
DROP PROCEDURE IF EXISTS insertHistory$$
 
CREATE PROCEDURE insertHistory()
BEGIN
    DECLARE i INT DEFAULT 1; 	# 넣을 데이터 개수
    DECLARE distance INT;      		# 이동한 거리(m)
    DECLARE speed INT;					# 속력 (km/h)
	 DECLARE favorites_count INT;	# 좋아요 횟수
    DECLARE TIME INT;					# 주행 시간
    DECLARE id INT;						# users id 값
    DECLARE score INT;
    DECLARE image VARCHAR(255) DEFAULT 'https://www.wildbike.co.kr/files/attach/images/298461/490/819/006/9d6e94eee5d564550631abcb53fc16d3.PNG';			# 임시 이미지
    DECLARE start_address VARCHAR(255);		# 출발지 데이터
    DECLARE end_address VARCHAR(255);			# 도착지 데이터
    
    WHILE i <= 50 DO
    	SET distance = FLOOR(RAND() * 15000) + 100;	# 거리 100m ~ 15,000m 랜덤
    	SET speed = FLOOR(RAND()*15) + 7;				# 속도 7~15km/h 랜덤
    	SET TIME = ((distance /1000) / speed) * 3600;			# 소요 시간 계산, 시속 -> 초속 변환
    	SET favorites_count = FLOOR(RAND()*100);
     	SELECT users_id INTO id FROM users ORDER BY RAND() LIMIT 1;
		SELECT address INTO start_address FROM spot WHERE address != 'nan' ORDER BY RAND() LIMIT 1;
		SELECT address INTO end_address FROM spot where address != start_address ORDER BY RAND() LIMIT 1;
		SELECT total_distance+distance INTO score FROM users_info WHERE users_info.users_id = id LIMIT 1;
    	
    	
    	# 전체 경로 수정
    	UPDATE users_info SET total_distance =  total_distance + distance WHERE users_info.users_id = id;
    	
    	
    	# 뱃지 변경
    	IF score >= 10000 AND score <20000 THEN
		  	UPDATE users_info
		  	SET badge_id = 2
		  	WHERE users_id = id;
		ELSEIF score >= 20000 AND score <40000 THEN
			UPDATE users_info
		   SET badge_id = 3
		   WHERE users_id = id;
		ELSEIF score >= 40000 AND score <60000 THEN
			UPDATE users_info
		   SET badge_id = 4
		   WHERE users_id = id;
		ELSEIF score >= 60000 THEN
			UPDATE users_info
		   SET badge_id = 5
		   WHERE users_id = id;
		END IF;
    	
      INSERT INTO history(content , distance, image,start_address, end_address , favorites_count,personal, TIME, users_id) 
         VALUES(
			 '테스트 내용입니다.', 
			 distance,
			 image,
			 start_address, 
			 end_address,
			 favorites_count, 
			 False, 
			 TIME, 
			 id);
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER $$


CALL insertHistory;

SELECT * FROM history;