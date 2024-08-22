import { useParams } from 'react-router-dom';

import useCompleteSelectionMutation from './SelectButton.hook';
import Button from '../Button/Button';
import { bottomButtonLayout } from '../Button/Button.styled';

import useBalanceContentQuery from '@/hooks/useBalanceContentQuery';

interface SelectButtonProps {
  selectedId: number;
  completeSelection: () => void;
  showModal: () => void;
}

const SelectButton = ({ selectedId, completeSelection, showModal }: SelectButtonProps) => {
  const { roomId } = useParams();
  const { balanceContent } = useBalanceContentQuery(Number(roomId));
  const {
    data,
    isPending,
    mutate: completeSelectionMutate,
  } = useCompleteSelectionMutation({
    selectedId,
    contentId: balanceContent?.contentId,
    completeSelection,
    showModal,
  });

  return (
    <div css={bottomButtonLayout}>
      <Button
        bottom={true}
        disabled={data || !selectedId || isPending}
        text={data || isPending ? '선택 완료' : '선택'}
        onClick={completeSelectionMutate}
      />
    </div>
  );
};

export default SelectButton;
