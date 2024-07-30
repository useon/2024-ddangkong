import { renderHook, waitFor } from '@testing-library/react';

import useBalanceContentQuery from '@/hooks/useBalanceContentQuery';
import wrapper from '@/mocks/wrapper';

test('useBalanceContentQuery가 mock server에서 데이터를 가져온다.', async () => {
  const { result } = renderHook(() => useBalanceContentQuery(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
