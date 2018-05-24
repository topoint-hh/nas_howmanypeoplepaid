#!/usr/bin/env bash

echo "start server"
#pm2 start ../client/bin/www --name="nas_demo_client"
npm run supervisor &

cd ../client
npm run dev &