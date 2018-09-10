# PAGE

[https://device-rental.firebaseapp.com/](https://device-rental.firebaseapp.com/)

# RUN

## ローカルサーバ起動
css、jsファイルともにsouceMapが有効なった状態で出力されます。  
デフォルトではhtml、css、jsファイルの変更に応じブラウザが auto reload します。
```
$ npm start
```

## 本番用（production）ビルド
css、jsファイルともにsouceMapが無効なった状態で出力されます。
```
$ npm run build
```

## 開発用（development）ビルド
css、jsファイルともにsouceMapが有効なった状態で出力されます。  
また、minimizeが解除されます。
```
$ npm run build:dev
```

# DEPLOY

## FirebaseへのDeploy
build（production）後にFirebaseへデプロイします。
```
$ npm run deploy
```

## FirebaseへのDeploy（development）
build（development）後にFirebaseへデプロイします。
```
$ npm run deploy:dev
```
