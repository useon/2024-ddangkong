import { useRecoilValue } from 'recoil';

import {
  nicknameBox,
  nicknameInputWrapper,
  nicknameInput,
  profileWrapper,
  profileImg,
} from './NicknamePage.styled';
import { useMakeOrEnterRoom } from './useMakeOrEnterRoom';

import SillyDdangkong from '@/assets/images/sillyDdangkong.png';
import AlertModal from '@/components/common/AlertModal/AlertModal';
import Button from '@/components/common/Button/Button';
import Content from '@/components/layout/Content/Content';
import useModal from '@/hooks/useModal';
import { memberInfoState } from '@/recoil/atom';

const NicknamePage = () => {
  const { isOpen, show, close } = useModal();
  const { randomNickname, nicknameInputRef, handleMakeOrEnterRoom, isLoading } =
    useMakeOrEnterRoom(show);
  const { isMaster } = useRecoilValue(memberInfoState);

  return (
    <Content>
      <div css={profileWrapper}>
        <img src={SillyDdangkong} alt="사용자 프로필" css={profileImg} />
      </div>
      <div css={nicknameBox}>닉네임</div>
      <div css={nicknameInputWrapper}>
        <input
          css={nicknameInput}
          type="text"
          placeholder={randomNickname}
          ref={nicknameInputRef}
        />
      </div>
      <Button
        onClick={handleMakeOrEnterRoom}
        disabled={isLoading}
        text={isLoading ? '로딩 중.....' : '확인'}
        bottom
      />
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        message={isMaster ? '방 생성에 실패했습니다' : '방 참가에 실패했습니다'}
        title={isMaster ? '방 생성 실패' : '방 참가 실패'}
      />
    </Content>
  );
};

export default NicknamePage;
