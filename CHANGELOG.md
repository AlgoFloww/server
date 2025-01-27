# BoongTam Server - 프로젝트 변경 이력

### 12월 16일 first commit_gitignore
### 12월 17일 db연동 및 테스트 완료
### 12월 18일 환경 변수 설정을 .env 파일로 분리하여 데이터베이스 연결 정보 관리

### 12월 23일 
- sql 쿼리 추가
    1. vscode 확장 프로그램 "MySQL" 설치
    2. Connect to server에 자신의 db 정보 입력
        - HOST, PORT, USERNAME, Password
    3. src/database.sql 에서 하나씩 ▷RUN 실행

- map api 실제 작동 방식으로 수정
    - DB에 가상의 매장 15개 생성
    1) 엔드포인트로 받아온 (query형식의) 좌표값을 활용하여 화면 안에 있는 매장들 추린 후
    2) 현재 위치에서 가장 가까운 5개의 매장 뽑아올 수 있게 하였습니다

### 12월 26일 map api 및 기타 파일 수정
- 시원 님과 db 호출 방식 통일
- test용으로 만들었던 api 삭제
- map -> boong으로 이름 변경
  > {{base}}boong?lat=37.501&lng=127.035&lat_lu=37.5015&lng_lu=127.0355&lat_rd=37.500000&lng_rd=127.0345 
  이로 인해 URL 변경

-------------------

### .env 작성요령 (12월 26일 업데이트)
src 밖에 .env 파일 생성
- 각자의 정보에 맞게 바꿔야 합니다! 또한 공백은 없게 해야 해요
- 소스코드는 /config.js  부분 살펴보세요

-------------------

### 12월 28일
- 메인_맵 api 완성
    - URL: boong?

### 12월 30일
- 메인_매장 상세 정보 api 완성
    - URL: boong/store?

### 12월 31일
- 마이페이지 간단 수정 및 회원 정보 수정 api 추가

### 1월 1일
authUtil 및 다른 model에 errorcode 통합 적용

### 1월 2일
AWS 클라우드 DB로 연동
메인, 맵 API 대폭 수정

### 1월 4일
커뮤니티의 매장 및 굿즈 리뷰 작성 API 제작

### 1월 6일
커뮤니티의 매장 제보 기능 API 제작

### 1월 7일
커뮤니티-매장 및 굿즈 리뷰 보기 (인기순, 최신순으로 개수 지정해 나열 가능) api 추가

### 1월 8일
리뷰에 대한 좋아요 (하트) 토글 기능 추가 - 머지 후 라우터 조금 더 손봐야 함

### 1월 9일
커뮤니티의 굿즈 및 매장 리뷰 리스트 상세 조회 api 추가

### 1월 10일
붕어빵 구매 내역 저장(메인) 및 조회(마이페이지)

### 1월 13일
- 붕어빵 매장 제보 api 프론트와 연결 시도
- 붕어빵 매장 제보 api 수정 address 중복 제보 시 최신 제보로 갱신되도록 함

### 1월 15일
- 회원가입 및 인증 api 추가
- jwt 검증 방식으로 마이페이지 회원정보 조회 및 수정 api 변경

### 1월 20일
- Map api response에 붕탐오더 가능 여부 추가 및, 위경도 request _ post 방식으로 변경

### 1월 21일
- mypage api 전체 jwt 검증 방식 추가
- API 보충
    1) request body에 추가 파라미터 넣기
    - 회원가입: zipcode 추가(nullable)
    2) response body에 추가 파라미터 넣기
    - 매장 리뷰 리스트: 썸네일, 리뷰 이미지 3개, 주소
    - 굿즈 리뷰 리스트: 굿즈 사진, 리뷰 이미지 3개
    - 맵 (boong): 매장의 리뷰 개수 및 매장 썸네일 추가
- DB: review 이미지에 여러개를 넣을 수 있도록 varchar에서 text로 타입 변경

### 1월 22일
- 커뮤니티 jwt 검증 방식 추가
- 붕어빵 구매 및 주문 내역 조회 / 붕템샵 jwt 검증 방식 추가

### 1월 23일 
- 프로젝트 마무리 
    - 최종 발표
    - 시연
    
--------------------------
--- SQL Change Log ---
--------------------------

1. CREATE TABLE `photos` (
    `photo_id` int NOT NULL AUTO_INCREMENT,
    `store_id` int NOT NULL,
    `photo_url` varchar(255) NOT NULL,
    `photo_category` enum('inner', 'outer', 'menu') NOT NULL, #여기 수정 영어로
    PRIMARY KEY (`photo_id`),
    KEY `store_id` (`store_id`),
    CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`)
)

2. CREATE TABLE `store_reviews` (
    `store_review_id` int(11) NOT NULL AUTO_INCREMENT,
    `store_id` int(11) NOT NULL,
    `user_id` bigint(20) NOT NULL,
    `review_text` text DEFAULT NULL,
    `review_rating` int(11) DEFAULT NULL,
    `review_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), #TIMESTAMP로 변경
    `review_heart` int(11) DEFAULT 0,
    `store_review_photo_url` varchar(255) NOT NULL,
    PRIMARY KEY (`store_review_id`),
    KEY `store_id` (`store_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `store_reviews_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`),
    CONSTRAINT `store_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 


3. goods_orders 테이블 DROP

4. store_reviews, goods_reviews 에 modified_date 추가
ALTER TABLE `goods_reviews`
ADD COLUMN `modified_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `store_reviews`
ADD COLUMN `modified_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

5. 리뷰에 누르는 하트 테이블 추가
CREATE TABLE `review_likes` (
    `like_id` INT NOT NULL AUTO_INCREMENT,
    `review_type` ENUM('goods', 'store') NOT NULL, -- 리뷰 유형을 구분
    `review_id` INT NOT NULL, -- 리뷰 ID (goods_review_id 또는 store_review_id)
    `user_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`like_id`),
    UNIQUE KEY `unique_user_review` (`review_type`, `review_id`, `user_id`), -- 중복 방지
    KEY `review_id` (`review_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `review_likes_ibfk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

6. store_details 테이블 alter
- appearance_time열은 사용 x, nullable로 바꿈
- 가게 여는 시간과 닫는 시간을 각각 저장하는 TIME 타입 컬럼 추가

ALTER TABLE `store_details`
ADD COLUMN `open_hour` TIME NOT NULL AFTER `appearance_time`,
ADD COLUMN `close_hour` TIME NOT NULL AFTER `open_hour`;

7. 리뷰 좋아요 테이블 분리
- 데이터 무결성을 위해 매장 리뷰 좋아요 테이블과 굿즈 리뷰 좋아요 테이블로 분리

CREATE TABLE `store_review_likes` (
    `like_id` INT(11) NOT NULL AUTO_INCREMENT,
    `store_review_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`like_id`),
    UNIQUE KEY `unique_user_review` (`store_review_id`, `user_id`),
    FOREIGN KEY (`store_review_id`) REFERENCES `store_reviews` (`store_review_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `goods_review_likes` (
    `like_id` INT(11) NOT NULL AUTO_INCREMENT,
    `goods_review_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`like_id`),
    UNIQUE KEY `unique_user_review` (`goods_review_id`, `user_id`),
    FOREIGN KEY (`goods_review_id`) REFERENCES `goods_reviews` (`goods_review_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

8. goods_reviews_comments 테이블과 goods_reviews_comments_likes 테이블 추가

CREATE TABLE `goods_reviews_comments` (
    `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
    `goods_review_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `comment_text` TEXT NOT NULL,
    `comment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modified_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`comment_id`),
    KEY `goods_review_id` (`goods_review_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `goods_reviews_comments_fk_1` FOREIGN KEY (`goods_review_id`) REFERENCES `goods_reviews` (`goods_review_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `goods_reviews_comments_fk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `goods_reviews_comments_likes` (
    `like_id` INT(11) NOT NULL AUTO_INCREMENT,
    `comment_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `like_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`like_id`),
    UNIQUE KEY `unique_like` (`comment_id`, `user_id`),
    KEY `comment_id` (`comment_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `goods_reviews_comments_likes_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `goods_reviews_comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `goods_reviews_comments_likes_fk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

9. 
CREATE TABLE `store_review_comments` (
    `comment_id` INT(11) NOT NULL AUTO_INCREMENT,
    `store_review_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `comment_text` TEXT NOT NULL,
    `comment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modified_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`comment_id`),
    KEY `store_review_id` (`store_review_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `store_review_comments_fk_1` FOREIGN KEY (`store_review_id`) REFERENCES `store_reviews` (`store_review_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `store_review_comments_fk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `store_reviews_comments_likes` (
    `like_id` INT(11) NOT NULL AUTO_INCREMENT,
    `comment_id` INT(11) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `like_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`like_id`),
    UNIQUE KEY `unique_like` (`comment_id`, `user_id`),
    KEY `comment_id` (`comment_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `store_reviews_comments_likes_fk_1` FOREIGN KEY (`comment_id`) REFERENCES `store_review_comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `store_reviews_comments_likes_fk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

10. 붕어빵 주문내역 테이블 추가
- boong_purchases: 낱개 품목 구매내역 저장
- boong_orders: boong_purchases의 정보로 총 가격 및 구매 날짜 저장

CREATE TABLE `boong_orders` (
    `order_id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT(20) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `order_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`order_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `boong_purchases` (
    `purchase_id` INT(11) NOT NULL AUTO_INCREMENT,
    `order_id` INT(11) NOT NULL,
    `menu_id` INT(11) NOT NULL,
    `quantity` INT(11) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`purchase_id`),
    KEY `order_id` (`order_id`),
    KEY `menu_id` (`menu_id`),
    CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `boong_orders` (`order_id`),
    CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

11. Store_reviews, goods_reviews의 store_review_photo_url, goods_review_photo_url
Varchar(255) > TEXT 로 타입 변경