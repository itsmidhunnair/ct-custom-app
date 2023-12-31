import React from 'react';
import { useLocation } from 'react-router';

const useURLQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default useURLQuery;
