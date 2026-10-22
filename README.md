# Yozora Finance コーポレートサイト

https://yozorafinance.com のソースです。フレームワークやビルド工程はなく、`index.html`・`style.css`・`main.js` と画像をそのまま配信しています。

## 公開の仕組み

- `main` ブランチが本番です。`main` にマージすると Cloudflare が自動でデプロイします。
- `wrangler.jsonc` の `assets.directory` が `.` なので、リポジトリ直下のファイルがそのまま公開されます。

## 変更の手順

1. 最新の `main` から作業ブランチを切る。

   ```bash
   git switch main
   git pull --ff-only
   git switch -c <作業ブランチ名>
   ```

2. 手元で表示を確認する。リポジトリ直下で次を実行し、http://localhost:8791 を開く。

   ```bash
   python3 -m http.server 8791
   ```

3. push して `main` 宛ての PR を出す。Cloudflare が PR のチェック欄にプレビュー URL を付けるので、そこでも表示を確認してからマージする。
4. マージ後は作業ブランチを削除する。
