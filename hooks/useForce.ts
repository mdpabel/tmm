import { useReducer } from 'react';

export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer((dummyVar: number) => dummyVar + 1, 0);

  return forceUpdate;
}
