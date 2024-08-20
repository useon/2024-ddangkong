import { http, HttpResponse } from 'msw';

import MASTER_AND_RESET from '../data/masterAndReset.json';
import ROOM_INFO from '../data/roomInfo.json';

import { MOCK_API_URL } from '@/constants/url';

const getRoomInfo = () => {
  return HttpResponse.json(ROOM_INFO);
};

const startGame = async () => {
  ROOM_INFO.isGameStart = true;
  return HttpResponse.json(undefined, { status: 204 });
};

const resetRoom = () => {
  MASTER_AND_RESET.isReset = true;
  return HttpResponse.json(undefined, { status: 204 });
};

const checkResetRoom = () => {
  return HttpResponse.json(MASTER_AND_RESET);
};

const isRoomActivate = () => {
  return HttpResponse.json({ isActivated: true });
};

export const roomHandler = [
  http.get(MOCK_API_URL.getRoomInfo, getRoomInfo),
  http.patch(MOCK_API_URL.startGame, startGame),
  http.get(MOCK_API_URL.resetRoom, checkResetRoom),
  http.patch(MOCK_API_URL.resetRoom, resetRoom),
  http.patch(MOCK_API_URL.isRoomActivate, isRoomActivate),
];
