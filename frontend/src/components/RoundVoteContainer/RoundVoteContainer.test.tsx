import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { customRender } from 'test-utils';

import RoundVoteContainer from './RoundVoteContainer';

describe('RoundVoteContainer 컴포넌트 테스트', () => {
  it('라운드 결과 그룹원들이 선택한 퍼센트를 카운팅 애니메이션으로 보여준다.', async () => {
    customRender(<RoundVoteContainer />);

    await waitFor(
      () => {
        expect(screen.getByText('73%')).toBeInTheDocument();
        expect(screen.getByText('27%')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
  it('기본 탭인 그룹 탭에서, 전체 탭을 클릭하면 전체 사용자 통계를 퍼센트로 보여준다.', async () => {
    const user = userEvent.setup();
    customRender(<RoundVoteContainer />);

    const button = await screen.findByRole('button', { name: '전체' });

    await user.click(button);

    await waitFor(
      () => {
        expect(screen.getByText('16%')).toBeInTheDocument();
        expect(screen.getByText('84%')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
