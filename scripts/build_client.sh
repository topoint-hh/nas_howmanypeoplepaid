#!/usr/bin/env bash

echo 'Begin commit already existed changes'
git pull
git add -A
git commit -a -m "update client"


cd ../client
npm install
npm run build

echo '把client的dist文件夹放到项目根目录下来'

cp -r dist/* ../

git add -A
git commit -a -m "update client"
git push

echo 'End git push'