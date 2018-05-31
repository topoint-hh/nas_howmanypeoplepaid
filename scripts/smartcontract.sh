#!/usr/bin/env bash

echo '查询账户余额'

curl -i -H Accept:application/json -X POST https://testnet.nebulas.io/v1/user/accountstate -d '{"address":"n1ZaB9NocJUe8FH1Va13UPvxXoUsXCtXz3A"}'

echo '查询账户余额完成'

echo "调用智能合约"