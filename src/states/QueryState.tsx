import * as Recoil from 'recoil';

export const queryState = Recoil.atom({
  key: 'query',
  default: '',
});
