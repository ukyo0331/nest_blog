## 自作の個人ブログサイトです。
[こちら](https://my-blog-olive-ten.vercel.app/)
※現在はAPIサーバーをrender.comフリープランでデプロイしているため、初回レンダリングに時間がかかることがあります
※制作途中の為、スタイリングが未完成です。

### 機能面の特徴
1. react-simplemde-editorを使用したマークダウンエディターでブログ記事を投稿できる。下書き保存機能あり。
2. カテゴリアイコンの画像はAWS S3を利用して保存し、表示させている。ダッシュボードから画像保存できる。（開発環境のみ、本番環境でも動くように修正する）
3. 投稿記事内にリンクを貼ると、記事の初回レンダリング時にOpen Graph APIを叩いてOGPを取得し、リンク先の概要を表示する。
4. マークダウン中のh2, h3をピックアップし、table of contentsを自動作成する。
5. JWT token, csurfを使った認証を実装。

### 実装予定
- 全体的なスタイリング
- ハンバーガーメニュー
- コメント機能
- いいね機能


------------------------------------

### AWS EC2へデプロイする際の手順ざっくりメモ
1. EC2インスタンスとSSH接続
2. 必要なパッケージ等のインストール(node, npm, pm2, nginx)、リポジトリをclone
3. 環境変数を設定AWS システムマネージャー　パラメーターストア等を使って設定
4. nginxでサーバを立ち上げ
5. buildして, pm2を使ってnest.jsで作成したサーバをスタート
6. 独自ドメイン取得して割り当て後、SSL化