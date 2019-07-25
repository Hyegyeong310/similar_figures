# Similar Figures

- 이미지를 인식하여 비슷한 동물을 찾는 예시 입니다.

## 설명

![image](https://user-images.githubusercontent.com/25483027/61889126-d00faf00-af3f-11e9-90eb-59f4160616ee.png)

- Loaded -> 파일 업로드
- 이미지를 인식하여 얼굴만 찾고, `./labeled_images`의 사진들 중 가장 높은 수치가 나온 label을 넣어줌.

## 개선

- `./models` 폴더의 데이터가 얼굴을 인식할 수 있는 좌표를 제공해주는 것 같은데 동물과 비교하기 위한 데이터가 필요함.
- 지난 주 동안 찾아봤으나 검색 능력 부족으로 실패. 현재 어떤 사진을 넣어도 'Rabbit'이 나옴.

## 사용 Module

- [face-api](https://github.com/justadudewhohacks/face-api.js?files=1)
