import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme';

export const inviteModal = css`
  background-color: ${Theme.color.peanut300};
`;

export const inviteModalHeader = css`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

export const inviteModalTitle = css`
  position: absolute;
  left: 50%;

  font-size: 1.6rem;
  text-align: center;
  transform: translateX(-50%);
`;

export const inviteModalIconButton = css`
  margin-left: auto;
`;

export const inviteModalUl = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const inviteModalLi = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: ${Theme.borderRadius.radius10};

  background-color: #fff;
`;

export const inviteModalLinkButton = css`
  width: 100%;
  padding: 1.6rem 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export const inviteModalLinkButtonInfoWrapper = css`
  display: flex;
  justify-content: space-between;
`;

export const inviteModalUrlText = css`
  overflow: hidden;
  width: 95%;

  font-size: 1.2rem;
  text-overflow: ellipsis;
`;

export const inviteModalCopyIcon = css`
  width: 10%;
`;