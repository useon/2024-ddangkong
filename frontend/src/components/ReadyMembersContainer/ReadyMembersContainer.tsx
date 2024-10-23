import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  readyMembersContainerLayout,
  totalNumber,
  memberItem,
  memberList,
  profileBox,
  memberStatus,
  membersContainer,
  inviteButton,
  profileImage,
} from './ReadyMembersContainer.styled';
import A11yOnly from '../common/a11yOnly/A11yOnly';

import crownIcon from '@/assets/images/crownIcon.webp';
import SillyDdangkongMedium from '@/assets/images/sillyDdangkongMedium.webp';
import InviteModal from '@/components/common/InviteModal/InviteModal';
import { useGetRoomInfo } from '@/hooks/useGetRoomInfo';
import useModal from '@/hooks/useModal';

const ReadyMembersContainer = () => {
  const { members, master } = useGetRoomInfo();
  const { show } = useModal();
  const queryClient = useQueryClient();

  const handleClickInvite = () => {
    show(InviteModal);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getMember'] });
  }, [master.memberId]);

  return (
    <section css={readyMembersContainerLayout}>
      <A11yOnly aria-live="polite">총 인원 {members.length}명</A11yOnly>
      <div css={totalNumber}>
        <div aria-hidden>총 인원 {members.length}명</div>
        <button css={inviteButton} onClick={handleClickInvite}>
          초대하기
        </button>
      </div>
      <section css={membersContainer}>
        <ul css={memberList}>
          {members.map((member) => (
            <li css={memberItem} key={member.memberId}>
              <A11yOnly>{`${member.isMaster ? '방장' : ''} ${member.nickname}`}</A11yOnly>
              <div css={profileBox}>
                <img src={SillyDdangkongMedium} alt="" css={profileImage} />
              </div>
              <div css={memberStatus}>
                <span aria-hidden>{member.nickname}</span>
                {member.isMaster && <img src={crownIcon} alt="" />}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ReadyMembersContainer;
