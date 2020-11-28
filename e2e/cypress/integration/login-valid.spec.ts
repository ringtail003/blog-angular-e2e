context("login-valid", () => {
  it("有効なユーザーでログインしログアウトできる事", () => {
    cy.fixture("valid.json").then((fixture) => {
      cy.visit("/login");
      cy.get("[name='username']").type(fixture.username);
      cy.get("[name='password']").type(fixture.password);
      cy.get("form").get("footer").contains("ログイン").click();

      cy.wait(500);
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/profile");
      });

      cy.contains("user@example.com");
      cy.contains("ringtail003");
      cy.contains("2020-12-02 10:15");

      cy.screenshot("ログイン完了");

      cy.get("form").get("footer").contains("ログアウト").click();

      cy.wait(500);
      cy.location().should((location) => {
        expect(location.pathname).to.eq("/login");
      });

      cy.screenshot("ログアウト完了");
    });
  });
});
