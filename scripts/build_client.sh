#!/usr/bin/env bash

echo 'Begin commit already existed changes'
git pull
git add -A
git commit -a -m "update client"


cd ../client
npm install
npm run build

cp -r dist/* ../server/public

git add -A
git commit -a -m "update client"
git push

echo 'End git push'