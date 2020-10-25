import { hello } from '../utils/sample-data';

test('basic', () => {
  expect(hello()).toBe('hello');
});

// test('failed test', () => {
//   expect(hello()).toBe(1);
// });
