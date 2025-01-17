import Button from '../../Button/Button';
import { errorFallbackLayout, errorImage, errorText } from '../ErrorFallback.styled';

import ErrorDdangkong from '@/assets/images/errorDdangkong.webp';

const RouterErrorFallback = () => {
  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <section css={errorFallbackLayout}>
      <img src={ErrorDdangkong} alt="에러나서 슬픈 땅콩" css={errorImage} />
      <h2 css={errorText}>
        페이지 전환 시 에러가 발생하였습니다.
        <br /> 다시 접속해주세요!
      </h2>
      <Button onClick={goToHome} text="메인으로 가기" size="medium" radius="medium" />
    </section>
  );
};

export default RouterErrorFallback;
