import { profile, nickname, nicknameInputWrapper, nicknameInput } from './NicknamePage.styled';

import Button from '@/components/common/Button/Button';
import Content from '@/components/layout/Content/Content';
import { createRandomNickname } from '@/utils/nickname';

const NicknamePage = () => {
  const randomNickname = createRandomNickname();

  const handleClick = () => {};

  return (
    <Content>
      <div css={profile}></div>
      <div css={nickname}>닉네임</div>
      <div css={nicknameInputWrapper}>
        <input css={nicknameInput} type="text" placeholder={randomNickname} />
      </div>
      <Button text="확인" onClick={handleClick}></Button>
    </Content>
  );
};

export default NicknamePage;
