context("login-invalid", () => {
  it("無効なユーザーはログインできない事", () => {
    cy.fixture("invalid.json").then((fixture) => {
      cy.visit("/login");
      cy.get("[name='username']").type(fixture.username);
      cy.get("[name='password']").type(fixture.password);
      cy.get("form").get("footer").contains("ログイン").click();

      cy.wait(500);

      cy.location().should((location) => {
        expect(location.pathname).to.eq("/login");
      });

      cy.get("[role='alert']").should(($element) => {
        expect($element).to.contain("ユーザー名またはパスワードが違います");
      });

      cy.screenshot("ログイン拒否");
    });
  });
});
