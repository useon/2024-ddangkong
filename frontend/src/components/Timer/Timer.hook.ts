import { useEffect, useRef, useState } from 'react';

import useBalanceContentQuery from '@/hooks/useBalanceContentQuery';

const INITIAL_WIDTH = 100;
const DELAY = 1000;

const useRoundTimer = () => {
  const { balanceContent } = useBalanceContentQuery();
  const timeLimit = balanceContent?.timeLimit || 30000;

  const [leftRoundTime, setLeftRoundTime] = useState(timeLimit / 1000);
  const [barWidthPercent, setBarWidthPercent] = useState(INITIAL_WIDTH);
  const isAlmostFinished = leftRoundTime <= 5;

  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (leftRoundTime <= 0) {
      clearInterval(timeout.current);
    }
  }, [leftRoundTime]);

  useEffect(() => {
    if (!balanceContent) return;

    const DECREASE_RATE = INITIAL_WIDTH / (timeLimit / 1000);
    setLeftRoundTime(timeLimit / 1000);

    timeout.current = setInterval(() => {
      setLeftRoundTime((prev) => prev - 1);
      setBarWidthPercent((prevWidth) => (prevWidth > 0 ? prevWidth - DECREASE_RATE : 0));
    }, DELAY);

    return () => {
      clearInterval(timeout.current);
    };
  }, [balanceContent, timeLimit]);

  return { leftRoundTime, barWidthPercent, isAlmostFinished };
};

export default useRoundTimer;
