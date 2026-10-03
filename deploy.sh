#!/bin/bash

# リポジトリ名
REPO_NAME="mansion-map-app"
USER_NAME=$(git config user.name)

echo "🚀 GitHubにリポジトリ ($REPO_NAME) を作成します..."
gh repo create $REPO_NAME --public --source=. --remote=origin --push

echo "✅ リポジトリの作成とプッシュが完了しました！"

echo "⚙️ GitHub Pages用のビルドとデプロイを実行します..."
npm run build --webpack
npm run deploy

echo "🎉 デプロイ完了！数分後に以下のURLでアクセス可能になります："
echo "👉 https://$USER_NAME.github.io/$REPO_NAME/"
