import { http, HttpResponse } from 'msw';

import BALANCE_CONTENT from '../data/balanceContent.json';
import ROUND_VOTE_IS_FINISHED from '../data/roundVoteIsFinished.json';

import { MOCK_API_URL } from '@/constants/url';
import { BalanceContent } from '@/types/balanceContent';

const fetchBalanceContentHandler = () => {
  return HttpResponse.json<BalanceContent>(BALANCE_CONTENT);
};

const fetchIsFinishedHandler = () => {
  setTimeout(() => {
    ROUND_VOTE_IS_FINISHED.finished = true;
  }, 17 * 1000);

  return HttpResponse.json(ROUND_VOTE_IS_FINISHED);
};

export const contentHandler = [
  http.get(MOCK_API_URL.balanceContent, fetchBalanceContentHandler),
  http.get(MOCK_API_URL.roundVoteIsFinished, fetchIsFinishedHandler),
];
