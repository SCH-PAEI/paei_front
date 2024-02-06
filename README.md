json-server를 사용하여 구현, 서버 실행 명령어
`npx json-server src/mockdata.json --port 3003`

# PAEI 프론트

## 1. 로그인/회원가입

   User 구분을 위해서 임의로 회원가입, 로그인 기능을 구현. 차후 웹메일 인증 로그인, google/kakao API를 활용한 SNS 로그인 구현 예정
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/f37d8e99-62a1-4d72-928b-f388982ebc11)

## 2. 홈화면

   사용자들이 등록한 게시물 조회
   - 검색 및 카테고리 분류
   - 입장 가능 인원 및 입장한 인원을 아이콘으로 가시화
   - 게시물 클릭 시 등장하는 모달창에서 신청 버튼 클릭 시 채팅방으로 이동
  
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/e5219c38-4d41-4c33-86ef-fc639ff3345a)
   

                                                                                                              ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/42d36701-9050-4d7f-be04-7b90a4b32aac)

## 3. 채팅방

   실시간 채팅 기능 추가 예정
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/32326cd0-4ddf-4c05-a987-f78c0d2a3cba)
   

## 4. 파티톡

   채팅방 활동 내역 조회 가능
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/cc12edfc-9de0-45b3-915d-46e6c97d0042)
   

## 5. 마이페이지

   개인 정보 및 활동 내역 관리
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/e411a4c3-76c1-4531-b457-498a13d980ba)
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/4b94d9d5-b4a6-4dd8-a6b7-6f12e11af28e)


## 6. 글쓰기

   게시물 업로드
   
   ![image](https://github.com/SCH-PAEI/paei_front/assets/100592495/9299cb2f-f0be-4234-842e-a6bbf710dac0)


---
로그인 api 및 실시간 채팅 도입 필요. 


