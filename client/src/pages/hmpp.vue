<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
       How Many People Paid 0.01 Nas, To See How Many People Paid 0.01 Nas?
      </span>
      <div slot="body">

        <div>
          <button type="button" class="btn btn-success" @click="onSearch">搜索</button>
          <button type="button" class="btn btn-info" @click="onSubmit">上传</button>
          <button type="button" class="btn btn-info" @click="onCheck">分享</button>
        </div>
        <br>
        <div>
          <ul class="list-group">
            <li  v-for="item in list" class="list-group-item">{{item}}</li>
          </ul>
        </div>
      </div>
      <div slot="footer"></div>
    </v-card>


  </v-layout>
</template>
<script>

  import NebPay from 'nebpay.js';
  import nebulas from 'nebulas';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';

  export default {
    components: {
      VLayout,
      VCard,
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
      return {

//        dappAddress: 'n1kpLEWv25HkqG33cRLGowiCGXkA3iBXBzP',
        dappAddress: '',
        list: ['abc', 'def'],
      };
    },
    created() {
      console.log('created -----', process.env.DAPP_ADDR);
      this.dappAddress = process.env.DAPP_ADDR;
    },
    methods: {
      onSearch() {
        console.log('search');
        const Account = nebulas.Account;
        const neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest('https://testnet.nebulas.io'));
        const from = Account.NewAccount().getAddressString();

        const value = '0';
        const nonce = '0';
        const gas_price = '1000000';
        const gas_limit = '2000000';
        const callFunction = 'get';
        const callArgs = '["' + 'defsss' + '"]'; // in the form of ["args"]
        const contract = {
          function: callFunction,
          args: callArgs,
        };

        neb.api.call(from, this.dappAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
          console.log(`response of search: ${JSON.stringify(resp)}`);
          this.cbSearch(resp)
        }).catch((err) => {
          // cbSearch(err)
          console.log(`error:${err.message}`);
        });
      },
      onSubmit() {
        console.log('submit');
        const nebPay = new NebPay();

        const to = this.dappAddress;
        const value = '0';
        const callFunction = 'save';
//        const callArgs = ['abc', 'def'];
        var callArgs = "[\"" + "defsss" + "\",\"" + "ddd" + "\"]"
        const serialNumber = nebPay.call(to, value, callFunction, callArgs, {    // 使用nebpay的call接口去调用合约,
          listener: this.cbPush,        // 设置listener, 处理交易返回信息
        });

        console.log('serialnum', serialNumber);
      },
      onCheck() {
        console.log('check');
        const nebPay = new NebPay();

        const to = this.dappAddress;
        const value = '0';
        const callFunction = 'check';
//        const callArgs = ['abc', 'def'];
        var callArgs = "[\"" + "defsss"  + "\"]"
        const serialNumber = nebPay.call(to, value, callFunction, callArgs, {    // 使用nebpay的call接口去调用合约,
          listener: this.cbPush,        // 设置listener, 处理交易返回信息
        });

        console.log('serialnum', serialNumber);

        setTimeout(function () {
          console.log(' after 1s hahhahah');

          nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
              console.log("tx result: " + resp)   //resp is a JSON string
              var respObject = JSON.parse(resp)
//              if(respObject.code === 0){
//                alert(`set ${$("#search_value").val()} succeed!`)
//                clearInterval(intervalQuery)
//              }
            })
            .catch(function (err) {
              console.log(err);
            });

        },10000);
      },


      cbPush(resp) {
        console.log(`response of push: ${JSON.stringify(resp)}`);
      },
      cbSearch(resp) {
//        console.log(`response of search: ${JSON.stringify(resp)}`);
        let result = resp.result;  // string
        console.log('result ', result);
        result = JSON.parse(result)
        if (!result) {
          console.log( ' no reulst');
          return
        }
        this.list = result.list;
        console.log('new list', this.list);
      },
      cbCheck(resp) {
        let result = resp.result;  // string
        console.log('cb Check result ', result);
        result = JSON.parse(result)
        if (!result) {
          console.log( ' no reulst');
          return
        }
        this.list = result.list;
        console.log('new list', this.list);
      }
    },

  };

</script>
<style>

</style>
