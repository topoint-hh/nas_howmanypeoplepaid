<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Welcome 222!
      </span>
      <div slot="body">
        <p>Nas Demo 项目</p>
        <div>
          <button type="button" class="btn btn-success" @click="onSearch">搜索</button>
          <button type="button" class="btn btn-info" @click="onSubmit">上传</button>
        </div>
        <br>
        <div>
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
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
        dappAddress: 'n1exFH19cJbzVDhTnb2DaoRKztZFJn4efvV',
      };
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
        const callArgs = '["' + 'abc' + '"]'; // in the form of ["args"]
        const contract = {
          function: callFunction,
          args: callArgs,
        };

        neb.api.call(from, this.dappAddress, value, nonce, gas_price, gas_limit, contract).then((resp) => {
//        this.cbSearch(resp)
          console.log(`response of search: ${JSON.stringify(resp)}`);
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
        const callArgs = ['abc', 'def'];
//      var callArgs = "[\"" + $("#search_value").val() + "\",\"" + $("#add_value").val() + "\"]"
        const serialNumber = nebPay.call(to, value, callFunction, callArgs, {    // 使用nebpay的call接口去调用合约,
          listener: this.cbPush,        // 设置listener, 处理交易返回信息
        });

        console.log('serialnum', serialNumber);
      },
      cbPush(resp) {
        console.log(`response of push: ${JSON.stringify(resp)}`);
      },
      cbSearch(resp) {
        console.log(`response of search: ${JSON.stringify(resp)}`);
      },


    },
  };

</script>
<style>

</style>
