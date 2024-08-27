import { css } from '@emotion/react';

import { Theme } from '@/styles/Theme';

export const profileWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  margin-top: 4rem;
  border-radius: 50%;

  background-color: ${Theme.color.gray300};
`;

export const profileImg = css`
  width: 60%;
`;

export const nicknameBox = css`
  width: 26.8rem;
  margin: 2rem 0;

  font-weight: 600;
  font-size: 1.6rem;
`;

export const nicknameInputWrapper = css`
  display: flex;
  align-items: center;
  width: 26.8rem;
  height: 4.8rem;
  padding: 0 1rem;
  border-radius: 1rem;

  background-color: ${Theme.color.gray200};
`;

export const nicknameInput = css`
  width: 100%;
  border: 0;

  background-color: ${Theme.color.gray200};
  outline: none;
`;

export const nicknameLengthText = css`
  color: ${Theme.color.gray500};
`;

export const noVoteTextContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const noVoteText = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  ${Theme.typography.headline3}
`;

export const angryImage = css`
  width: 16rem;
  height: 14rem;
`;
