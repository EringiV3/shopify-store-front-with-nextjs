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
