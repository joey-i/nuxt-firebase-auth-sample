# test-firebase-auth

> Firebase Auth と NUXT を使用したユーザー登録&認証のチュートリアル用です。

## 環境セットアップ

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

NUXTについての詳細は、公式ドキュメントをご覧ください。 [Nuxt.js docs](https://nuxtjs.org).

## Firebaseセットアップ

プロジェクト直下に `.env` ファイルを作成し、以下のフォーマットで各種認証情報などを記載してください。
xは、実際の情報に置き換えてください。

```
BASE_URL=http://localhost:3000
FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxx
FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxx
FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxx
FIREBASE_MESSSAGE_SENDER_ID=xxxxxxxxxxxxx
FIREBASE_APP_ID=x:xxxxxxxxxxxxxxxxx:x:xxxxxxxxxxxxxxxxx
FIREBASE_MEASUREMENT_ID=x-xxxxxxxxxxx
```
