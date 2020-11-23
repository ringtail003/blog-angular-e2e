import { Page } from "puppeteer-core";
import { browser } from "./helper/browser";
import { screenshot } from "./helper/capture";
import { emulate } from "./helper/device";

describe("login-invalid", () => {
  it("無効なユーザーはログインできない事", (done: DoneFn) => {
    (async () => {
      // ブラウザの起動
      const sandbox = await browser.launch();

      // ログインページを開く
      const page: Page = await sandbox.newPage();
      emulate(page);
      await page.goto(`${browser.baseUrl}login`);

      // ログイン
      await page.type("[name='username']", "Dr.Blowhole");
      await page.type("[name='password']", "***");
      await page.click("form [type='submit']");

      // プロフィールのページに遷移しない事を確認
      expect(page.url()).toBe(`${browser.baseUrl}login`);

      // エラーメッセージが表示された事を確認
      const alert = {
        selector: "[role='alert']",
        messsage: "ユーザー名またはパスワードが違います",
      };
      await page.waitForSelector(alert.selector);
      const $element = await page.$(alert.selector);
      const message = await page.evaluate(($element) => $element.textContent, $element);
      expect(message.trim()).toBe(alert.messsage);

      // キャプチャを撮る
      await screenshot(page, "ログイン拒否");

      await sandbox.close();
    })().then(done);
  });
});
