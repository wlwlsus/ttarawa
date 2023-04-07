INSERT INTO category (name) VALUES("음식점");
INSERT INTO category (name) VALUES("카페");
INSERT INTO category (name) VALUES("관광지");
INSERT INTO category (name) VALUES("화장실");

LOAD DATA LOCAL INFILE "D:/SSAFY2/data/food.csv"
INTO TABLE ssafy605.spot
CHARACTER SET euckr
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 ROWS
(address, name, lat, lng, visit, @category, sub_category)
SET category_id = (SELECT category_id FROM ssafy605.category WHERE name = @category);

LOAD DATA LOCAL INFILE "D:/SSAFY2/data/spot.csv"
INTO TABLE ssafy605.spot
CHARACTER SET euckr
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 ROWS
(address, name, lat, lng, visit, @category, sub_category)
SET category_id = (SELECT category_id FROM ssafy605.category WHERE name = @category);

LOAD DATA LOCAL INFILE "D:/SSAFY2/data/toilet.csv"
INTO TABLE ssafy605.spot
CHARACTER SET euckr
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 ROWS
(address, name, lat, lng, visit, @category, sub_category)
SET category_id = (SELECT category_id FROM ssafy605.category WHERE name = @category);