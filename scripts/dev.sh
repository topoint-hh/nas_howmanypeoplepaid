#!/usr/bin/env bash


cd server
npm run supervisor &

cd ../client
npm run dev &