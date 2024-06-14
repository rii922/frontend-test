import * as Recoil from 'recoil';

export const perPageState = Recoil.atom({
  key: 'perPage',
  default: 20,
});
