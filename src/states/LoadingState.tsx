import * as Recoil from 'recoil';

export const loadingState = Recoil.atom({
  key: 'loading',
  default: false,
});
