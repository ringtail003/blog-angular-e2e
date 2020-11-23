import { Page } from "puppeteer-core";
import { browser } from "./helper/browser";
import { screenshot } from "./helper/capture";
import { emulate } from "./helper/device";

describe("login-valid", () => {
  it("有効なユーザーでログインしログアウトできる事", (done: DoneFn) => {
    (async () => {
      // ブラウザの起動
      const sandbox = await browser.launch();

      // ログインページを開く
      const page: Page = await sandbox.newPage();
      emulate(page);
      await page.goto(`${browser.baseUrl}login`);

      // ログイン情報の入力
      await page.type("[name='username']", "ringtail003");
      await page.type("[name='password']", "***");

      // ログイン
      await page.click("form [type='submit']");

      // プロフィールのページに遷移した事を確認
      await page.waitForNavigation();
      expect(page.url()).toBe(`${browser.baseUrl}profile`);

      // プロフィールのページにレンダリングされた内容をテスト
      const fieldset = await page.$$("fieldset");
      const span = fieldset.map(async (v) =>
        v.$eval("span", (node) => node.innerHTML)
      );

      expect(await Promise.all(span)).toEqual([
        "user@example.com",
        "ringtail003",
        "2020-12-02 10:15",
      ]);

      // キャプチャを撮る
      await screenshot(page, "ログイン完了");

      // ログアウト
      const submit = await page.$("form [type='submit']");
      submit?.click();

      // ログインページに遷移した事を確認
      await page.waitForNavigation();
      expect(page.url()).toBe(`${browser.baseUrl}login`);

      // キャプチャを撮る
      await screenshot(page, "ログアウト完了");

      await sandbox.close();
    })().then(done);
  });
});
