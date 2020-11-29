import { SelectedOption } from '@/types';

export function hello() {
  return 'hello';
}
/**
 * checkoutIdを取得します
 */
export function getCheckoutId(): string {
  return localStorage.getItem('checkoutId') ?? '';
}

/**
 * checkoutIdを保存します
 * @param checkoutId
 */
export function setCheckoutId(checkoutId: string | number) {
  localStorage.setItem('checkoutId', String(checkoutId));
}

/**
 * optionsからnameの一致するvalueを取得します
 * @param options
 * @param name
 */
export function getValueByMatchedNameSelectedOptions(
  options: SelectedOption[],
  name: string
): string {
  return options.find((option) => option.name === name)?.value ?? '';
}
