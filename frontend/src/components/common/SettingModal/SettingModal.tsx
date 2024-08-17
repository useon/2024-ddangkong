import {
  useApplyRoomSetting,
  useCategoryListQuery,
  useDropdown,
  useTimerPerRound,
  useTotalRound,
} from './SettingModal.hook';
import {
  settingModalTitle,
  settingModalLayout,
  settingButton,
  settingTitle,
  settingTitleWrapper,
  settingButtonContainer,
  settingContentContainer,
  settingTitleContainer,
} from './SettingModal.styled';
import Dropdown from '../Dropdown/Dropdown';
import Modal from '../Modal/Modal';

import { useGetRoomInfo } from '@/pages/ReadyPage/useGetRoomInfo';

const TOTAL_ROUND_LIST = [5, 7, 10];
const TIMER_PER_ROUND_LIST = [5000, 10000, 15000];

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingModal = ({ isOpen, onClose }: SettingModalProps) => {
  const { roomSetting } = useGetRoomInfo();
  const { categoryList, isLoading } = useCategoryListQuery();
  const { mutate: applyRoomSetting } = useApplyRoomSetting();

  const { totalRound, handleClickRound } = useTotalRound(roomSetting?.totalRound);
  const { timerPerRound, handleClickTimer } = useTimerPerRound(roomSetting?.timeLimit);
  const { category, handleClickOption } = useDropdown(roomSetting?.category);

  const handleClickApply = () => {
    if (!category || !totalRound || !timerPerRound) return;

    applyRoomSetting({ category, totalRound, timeLimit: timerPerRound });
    onClose();
  };

  if (isLoading) return <div>로딩중...</div>;

  if (!categoryList || !category) return <div>카테고리가 없습니다</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} css={settingModalLayout}>
      <Modal.Header position="center">
        <Modal.Title css={settingModalTitle}>방 설정</Modal.Title>
        <Modal.IconButton onClick={onClose} />
      </Modal.Header>
      <Modal.Content>
        <div css={settingContentContainer}>
          <div css={settingTitleContainer}>
            <div css={settingTitleWrapper}>
              <span css={settingTitle}>카테고리</span>
            </div>
            <Dropdown text={category} optionList={categoryList} handleClick={handleClickOption} />
          </div>
          <div css={settingTitleContainer}>
            <div css={settingTitleWrapper}>
              <span css={settingTitle}>총 라운드</span>
            </div>
            <div css={settingButtonContainer}>
              {TOTAL_ROUND_LIST.map((round) => (
                <button
                  key={round}
                  css={settingButton(totalRound === round)}
                  onClick={handleClickRound}
                >
                  {round}
                </button>
              ))}
            </div>
          </div>
          <div css={settingTitleContainer}>
            <div css={settingTitleWrapper}>
              <span css={settingTitle}>라운드 당 타이머</span>
            </div>
            <div css={settingButtonContainer}>
              {TIMER_PER_ROUND_LIST.map((timer) => (
                <button
                  key={timer}
                  css={settingButton(timerPerRound === timer)}
                  onClick={handleClickTimer}
                  value={timer}
                >
                  {timer / 1000}초
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer buttonPosition="center">
        <Modal.TextButton onClick={handleClickApply}>적용</Modal.TextButton>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
