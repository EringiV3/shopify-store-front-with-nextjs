import { hello } from '../utils/helpers';

test('basic', () => {
  expect(hello()).toBe('hello');
});

// test('failed test', () => {
//   expect(hello()).toBe(1);
// });
