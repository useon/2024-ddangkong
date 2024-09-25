import { css } from '@emotion/react';

export const nicknameItemLayout = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const nicknameText = (isUser: boolean) => css`
  font-weight: ${isUser ? 'bold' : 400};
  font-size: 1.2rem;
`;

export const profileImage = css`
  width: 1.8rem;
  height: 1.8rem;
`;
