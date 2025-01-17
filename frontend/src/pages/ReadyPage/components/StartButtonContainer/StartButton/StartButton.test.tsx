import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import StartButton from './StartButton';

import { ERROR_MESSAGE } from '@/constants/message';
import { MOCK_API_URL } from '@/constants/url';
import { server } from '@/mocks/server';
import { customRenderWithMaster } from '@/utils/test-utils';

describe('StartButton 테스트', () => {
  it('시작 버튼을 클릭했을 때, 게임 시작 API에서 에러가 발생하면 알림 모달이 뜬다.', async () => {
    const user = userEvent.setup();
    server.use(
      http.patch(MOCK_API_URL.startGame, async () => {
        return HttpResponse.json(
          {
            errorCode: 'NOT_READY_ROOM',
            message: ERROR_MESSAGE.NOT_READY_ROOM,
          },
          { status: 400 },
        );
      }),
    );

    customRenderWithMaster(<StartButton />);

    const startButton = await screen.findByRole('button', { name: '시작' });
    await user.click(startButton);

    await waitFor(() => {
      const closeIcon = screen.getByAltText('닫기 버튼');
      expect(closeIcon).toBeInTheDocument();
    });
  });
});
