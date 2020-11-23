import { $, browser, logging } from "protractor";

describe("login-invalid", () => {
  const baseUrl = "http://localhost:4201/";

  it("無効なユーザーはログインできない事", async () => {
    browser.get(`${baseUrl}login`);

    // ログイン
    $("form input[name='username']").sendKeys("Dr.Blowhole");
    $("form input[name='password']").sendKeys("***");
    $("form").submit();

    // ログインページから移動しない事を確認
    browser.getCurrentUrl().then((url) => {
      expect(url).toBe(`${baseUrl}login`);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
