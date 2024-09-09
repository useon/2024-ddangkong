import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getRoomInfo } from '@/apis/room';
import { POLLING_DELAY } from '@/constants/config';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTES } from '@/constants/routes';

export const useGetRoomInfo = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.roomMembers, Number(roomId)],
    queryFn: ({ queryKey: [, roomId] }) => getRoomInfo(Number(roomId)),
    refetchInterval: POLLING_DELAY,
    gcTime: 0,
  });

  useEffect(() => {
    if (data?.isGameStart) {
      navigate(ROUTES.game(Number(roomId)));
    }
  }, [data?.isGameStart, roomId, navigate]);

  return {
    members: data?.members,
    roomSetting: data?.roomSetting,
    master: data?.master,
    isLoading,
    isError,
  };
};
