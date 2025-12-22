# ブランチの使い分け

## mainブランチ　
-本番公開用  
-[cloudflareでmainブランチをデプロイ中](https://yozorafinance.com)  
-**動作確認済みの安定版のみ**をマージしてください  

## devブランチ　 
-開発用  
-[github pagesで動作確認可能](https://reiminamoto.github.io/yozora-finance-website/)  
-**main にマージする前に、必ず dev ブランチ上での動作確認を行ってください！！！**  

# PR前に必ず行うこと

他の変更と衝突しないよう、PRを出す前に以下の手順で `dev` ブランチを最新の `main` に同期してください。

```bash
# mainブランチへ移動し、リモートの最新情報を取得
git checkout main
git pull origin main

# devブランチへ戻って、mainの変更を取り込む
git checkout dev
git merge main
