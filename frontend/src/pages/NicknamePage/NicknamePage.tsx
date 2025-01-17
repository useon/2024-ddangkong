import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NicknameInput from './components/NicknameInput/NicknameInput';
import useMakeOrEnterRoom from './hooks/useMakeOrEnterRoom';
import {
  profileWrapper,
  profileImg,
  noVoteTextContainer,
  noVoteText,
  angryImage,
  nicknameContainer,
} from './NicknamePage.styled';

import { isJoinableRoom } from '@/apis/room';
import AngryDdangkong from '@/assets/images/angryDdangkong.webp';
import SillyDdangkong from '@/assets/images/sillyDdangkong.webp';
import Button from '@/components/common/Button/Button';
import Content from '@/components/layout/Content/Content';
import useButtonHeightOnKeyboard from '@/hooks/useButtonHeightOnKeyboard';

const NicknamePage = () => {
  const { nicknameInputRef, handleMakeOrEnterRoom, isLoading } = useMakeOrEnterRoom();
  const { roomUuid } = useParams();
  const { bottomButtonHeight } = useButtonHeightOnKeyboard();

  const { data, isLoading: isJoinableLoading } = useQuery({
    queryKey: ['isJoinable', roomUuid],
    queryFn: async () => isJoinableRoom(roomUuid || ''),
    enabled: !!roomUuid,
  });

  const goToHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  }, [roomUuid, nicknameInputRef]);

  if (!isJoinableLoading && roomUuid && !data?.isJoinable)
    return (
      <div css={noVoteTextContainer}>
        <img src={AngryDdangkong} alt="화난 땅콩" css={angryImage} />
        <span css={noVoteText}>잘못된 링크에 접속했어요 :{`)`}</span>
        <Button onClick={goToHome} text="홈으로" size="medium" radius="medium" />
      </div>
    );

  return (
    <Content>
      <div css={profileWrapper}>
        <img src={SillyDdangkong} alt="사용자 프로필" css={profileImg} />
      </div>
      <div css={nicknameContainer}>
        <NicknameInput
          nicknameInputRef={nicknameInputRef}
          handleMakeOrEnterRoom={handleMakeOrEnterRoom}
        />
        <Button
          onClick={handleMakeOrEnterRoom}
          disabled={isLoading}
          text={isLoading ? '접속 중...' : '확인'}
          style={{ width: '100%', bottom: bottomButtonHeight }}
          bottom
        />
      </div>
    </Content>
  );
};

export default NicknamePage;
