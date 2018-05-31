<style src="@/assets/css/bulma.min.css"></style>
<template>
<div>
  <section id="app" class="hero is-fullheight is-gradient">

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-10 is-offset-1">
          <h1 class="title">
            想知道有多少人会花 <span id="web3-price-1" class="has-text-danger">0.01 NAS</span>,<br/> 来知道有多少人花了 <span id="web3-price-2"
                                                                                                                                           class="has-text-danger">0.01 NAS</span>吗？
          </h1>
          <div v-if="!isShow">
            <div>
              <p class="enumerate">
                1. 按下查看按钮
              </p>
              <p class="enumerate">
                2. 支付0.01Nas
              </p>
              <p class="enumerate">
                3. 等待交易完成
              </p>
              <p class="enumerate">
                4. 查看结果
              </p>
            </div>
            <div class="column">
              <a id="web3-buy" class="button is-danger" @click="onAdd">
                查看
              </a>
            </div>
            <div class="alert alert-danger">
              支付金额不等于0.01NAS的交易将失败。
            </div>
          </div>
        </div>
        <!--<div class="column">-->
          <!--<a id="web3-buy" class="button is-danger" @click="onGet">-->
            <!--查询-->
          <!--</a>-->
        <!--</div>-->
        <div v-if="isShow">
          <br>
          <h1>你好</h1>
          <span>在你之前已经有<span style="font-size:30pt; color:#ff0561"> {{count-1}}</span>人花了0.01Nas, 恭喜你是第{{count}}名！</span>
          <br>
          <ul class="list-group">
            <li  v-for="item in list" class="list-group-item">{{item}}</li>
          </ul>
          <br>
        </div>
        <div id="web3-error" class="column notification is-danger">
          本ÐApp需要用谷歌浏览器打开，并安装 <a href="https://github.com/ChengOrangeJu/WebExtensionWallet" class="has-text-white-bis">星云钱包插件</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content has-text-centered footer-text">
         POWERED BY <img src="@/assets/imgs/nebulasx60.png"/>
        </p>
      </div>
    </div>
  </section>
</div>
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
        dappAddress: '',
        list: [],
        count: 100,
        isShow: 0,
        timer: null,

      };
    },
    created() {
      console.log('created -----', process.env.DAPP_ADDR);
      //从配置中读取智能合约DAPP地址
      this.dappAddress = process.env.DAPP_ADDR;


    },
    methods: {

      onGet() {

        console.log('get');

        const Account = nebulas.Account;
        this.neb = new nebulas.Neb();
        let neb = this.neb
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
//          this.cbSearch(resp)
          let result = resp.result;  // string
          console.log('result ', result);
          result = JSON.parse(result) // obj
          if (!result) {
            console.log( ' no result');
            return
          }
          this.list = result.list;
          this.count = result.count;
          console.log('new list', this.list);
          this.isShow = true
        }).catch((err) => {
          // cbSearch(err)
          console.log(`error:${err.message}`);
          alert(err.message)
        });
      },

      onAdd() {
        clearInterval(this.timer) // 清除之前的Timer
        console.log('add');
        const nebPay = new NebPay();

        const to = this.dappAddress;
        const value = '0.01';
        const callFunction = 'add3';
//        const callArgs = ['abc', 'def'];
        var callArgs = "[\"" + "defsss"  + "\"]"
        const serialNumber = nebPay.call(to, value, callFunction, callArgs, {    // 使用nebpay的call接口去调用合约,
          listener: this.cbAdd,        // 设置listener, 处理交易返回信息
        });
        let that = this
        let timer = setInterval(function () {
          console.log('=======Begin query Pay Info');
          nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
              console.log("tx result: " + resp)   //resp is a JSON string
              var respObject = JSON.parse(resp)
              if(respObject.code === 0){
                let data = respObject.data
                if (data.status == 0){ // 失败
                  alert(data.executeError)
                  console.log('失败');
                clearInterval(timer)
                } else  if (data.status == 1){// 成功
                  alert('成功！')
                  console.log('成功');
                  // 查询记录
                  that.onGet();

                clearInterval(timer)
                } else if (data.status == 2){
                  console.log('待定');
                }
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        }, 10000)
        this.timer = timer;

      },
      cbAdd(resp) {
        console.log(`response of add: ${JSON.stringify(resp)}`);
      },
    },

  };

</script>
<style>

</style>
