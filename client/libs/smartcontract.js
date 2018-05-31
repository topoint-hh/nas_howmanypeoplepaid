/**
 * Created by zhangyiqing on 2018/5/31.
 */


var axios = require('axios')

function checkKontoStatus() {
  let url = 'https://testnet.nebulas.io/v1/user/accountstate'
  let params = { address: 'n1ZaB9NocJUe8FH1Va13UPvxXoUsXCtXz3A'}

  axios.post(url, params).then(function (res) {
    console.log('res', res.data);
  }).catch(function(err) {
    console.log(err);
  })

}

function unlock() {
  let url = 'https://testnet.nebulas.io/v1/user/accountstate'
  let params = { address: 'n1ZaB9NocJUe8FH1Va13UPvxXoUsXCtXz3A'}
}

function callFcn() {
}


// checkKontoStatus()
