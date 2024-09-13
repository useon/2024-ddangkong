import { screen, waitFor } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';

import TopicContainer from './TopicContainer';
import GameSkeleton from '../common/Skeleton/GameSkeleton/GameSkeleton';

import { ERROR_MESSAGE } from '@/constants/message';
import { MOCK_API_URL } from '@/constants/url';
import { server } from '@/mocks/server';
import { customRender } from '@/utils/test-utils';

describe('TopicContainer', () => {
  it('게임 컨텐츠를 불러오지 못할 경우, 에러 폴백 UI를 통해 에러 메세지를 사용자에게 보여준다.', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    server.use(
      http.get(MOCK_API_URL.balanceContent, async () => {
        await delay(500);
        return HttpResponse.json(
          {
            errorCode: 'NOT_FOUND_BALANCE_CONTENT',
            message: ERROR_MESSAGE.NOT_FOUND_BALANCE_CONTENT,
          },
          { status: 400 },
        );
      }),
    );

    customRender(<TopicContainer />, { pendingFallback: <GameSkeleton /> });

    await waitFor(() => {
      expect(screen.getByTestId('skeletonCategory')).toBeInTheDocument();
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(ERROR_MESSAGE.NOT_FOUND_BALANCE_CONTENT);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});