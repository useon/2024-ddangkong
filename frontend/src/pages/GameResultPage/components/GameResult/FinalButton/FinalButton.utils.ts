const getFinalButtonText = (isMaster: boolean, isPending: boolean) => {
  if (isMaster && isPending) return '로딩중...';
  if (isMaster) return '대기실로 이동';
  return '방장이 진행해 주세요';
};

export default getFinalButtonText;
