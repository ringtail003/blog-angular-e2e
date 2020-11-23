import { $, $$, browser, by, logging } from "protractor";

describe("login-valid", () => {
  const baseUrl = "http://localhost:4201/";

  it("有効なユーザーでログインしログアウトできる事", async () => {
    // ログインページを開く
    browser.get(`${baseUrl}login`);

    // ログイン
    $("form input[name='username']").sendKeys("ringtail003");
    $("form input[name='password']").sendKeys("***");
    $("form").submit();

    // プロフィールのページに遷移した事を確認
    browser.getCurrentUrl().then((url) => {
      expect(url).toBe(`${baseUrl}profile`);
    });

    // プロフィールのページにレンダリングされた内容をテスト
    expect(await $$("fieldset").all(by.css("span")).getText()).toEqual([
      "user@example.com",
      "ringtail003",
      "2020-12-02 10:15",
    ]);

    // ログアウト
    $("form").submit();

    // ログインページに遷移した事を確認
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
