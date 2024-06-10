import * as Recoil from 'recoil';

export const pageState = Recoil.atom({
  key: 'page',
  default: 1,
});
