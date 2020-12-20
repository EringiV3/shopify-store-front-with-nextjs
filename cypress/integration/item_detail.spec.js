describe('商品詳細のテスト', function () {
  beforeEach(() => {
    cy.visit('/items/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzk4OTUyNzYwOTk=')
      .clearLocalStorage()
      .reload(true)
      .wait(5000);
  });
  it('カートに入れるボタンを押すと、ヘッダーのカート内商品点数が+1される', () => {
    cy.get('[data-test-id=add-to-cart]')
      .first()
      .click()
      .get('[data-test-id=header-cart-item-quantity]')
      .should(($itemQuantity) => {
        expect($itemQuantity.text()).to.equal('1');
      });
  });
});
