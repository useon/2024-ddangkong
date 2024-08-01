import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import { bottomButtonLayout } from '../Button/Button.styled';

import { voteBalanceContent } from '@/apis/balanceContent';
import useBalanceContentQuery from '@/hooks/useBalanceContentQuery';

interface SelectButtonProps {
  isDisabled: boolean;
  selectedId: number;
}

const SelectButton = ({ isDisabled, selectedId }: SelectButtonProps) => {
  const navigate = useNavigate();
  const { balanceContent } = useBalanceContentQuery();

  const handleSelectComplete = async () => {
    if (!balanceContent) return;

    await voteBalanceContent({
      optionId: selectedId,
      contentId: balanceContent.contentId,
      roomId: 1,
    });

    goToRoundResult();
  };

  const goToRoundResult = () => {
    navigate('/round/result');
  };

  return (
    <div css={bottomButtonLayout}>
      <Button
        style={{ width: '100%' }}
        disabled={isDisabled}
        text="선택"
        onClick={handleSelectComplete}
      />
    </div>
  );
};

export default SelectButton;