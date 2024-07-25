import { useNavigate } from 'react-router-dom';

import { mainPageLayout, logoWrapper, title, intro } from './MainPage.styled';

import peanut from '@/assets/images/peanut.png';
import Button from '@/components/common/Button/Button';

const MainPage = () => {
  const navigate = useNavigate();

  const goToNicknamePage = () => {
    navigate('/nickname');
  };

  return (
    <div css={mainPageLayout}>
      <div css={logoWrapper}>
        <img css={logoWrapper} alt="로고" src={peanut} />
      </div>
      <h1 css={title}>땅콩</h1>
      <h2 css={intro}>어색한 분위기를 주도해봐요</h2>
      <Button text="방 만들기" onClick={goToNicknamePage}></Button>
    </div>
  );
};

export default MainPage;
