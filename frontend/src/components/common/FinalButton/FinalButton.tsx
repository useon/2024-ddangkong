import { useParams } from 'react-router-dom';

import Button from '../Button/Button';
import { bottomButtonLayout } from '../Button/Button.styled';

import { useResetRoomMutation } from '@/components/GameResult/GameResult.hook';

interface FinalButtonProps {
  showModal: () => void;
}

const FinalButton = ({ showModal }: FinalButtonProps) => {
  const { roomId } = useParams();
  const { mutate: resetRoom } = useResetRoomMutation(Number(roomId), showModal);

  return (
    <div css={bottomButtonLayout}>
      <Button style={{ width: '100%' }} text="확인" onClick={resetRoom} />
    </div>
  );
};

export default FinalButton;
