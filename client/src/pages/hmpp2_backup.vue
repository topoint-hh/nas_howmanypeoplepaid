<style src="@/assets/css/bulma.min.css"></style>
<template>
<div>
  <section id="app" class="hero is-fullheight is-gradient">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-10 is-offset-1">
          <h1 class="title">
            有多少人会花 <span id="web3-price-1" class="has-text-danger">0.01 NAS</span>,<br/> 来知道有多少人会花 <span id="web3-price-2"
                                                                                                                                           class="has-text-danger">0.01 NAS?</span>
          </h1>

          </a>
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
        <div class="column">
          <a id="web3-buy" class="button is-danger" @click="onGet">
            查询
          </a>
        </div>
        <div>
          <p>在你之前已经有{{count-1}}人花了0.01Nas, 恭喜你是第{{count}}名！</p>
          <ul class="list-group">
            <li  v-for="item in list" class="list-group-item">{{item}}</li>
          </ul>
        </div>
        <div id="web3-error" class="column notification is-danger">
          This website requires <a href="https://www.metamask.io" class="has-text-white-bis">MetaMask</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content has-text-centered footer-text">
        <p >
          This ÐApp is nothing more than a fancy way to donate. You could always manually check the transactions on the contract.
        </p>
        <p>
          &copy; 2018 <a href="https://sillysmartcontracts.xyz" class="ssc has-text-white" target="_blank">Silly Smart Contracts</a>
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
        list: ['a', 'b'],
        count: 100,
        timer: null,
        timerFlag: 0,
      };
    },
    created() {
      console.log('created -----', process.env.DAPP_ADDR);
      //从配置中读取智能合约DAPP地址
      this.dappAddress = process.env.DAPP_ADDR;
//      this.timer = setTimeout(this.onprint, 1000)
      this.timer = setInterval(this.onprint, 1000)
      console.log('begin', this.timer);
    },
    methods: {
      onprint() {
        console.log('print ', new Date());
      },
      onGet() {

        console.log('get');

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
//          this.cbSearch(resp)
          let result = resp.result;  // string
          console.log('result ', result);
          result = JSON.parse(result) // obj
          if (!result) {
            console.log( ' no reulst');
            return
          }
          this.list = result.list;
          this.count = result.count;
          console.log('new list', this.list);
        }).catch((err) => {
          // cbSearch(err)
          console.log(`error:${err.message}`);
          alert(err.message)
        });
      },

      onAdd() {
        console.log('add');
        const nebPay = new NebPay();

        const to = this.dappAddress;
        const value = '0';
        const callFunction = 'add';
//        const callArgs = ['abc', 'def'];
//        var callArgs = "[\"" + "defsss"  + "\"]"
        var callArgs = "[]"
        const serialNumber = nebPay.call(to, value, callFunction, callArgs, {    // 使用nebpay的call接口去调用合约,
          listener: this.cbAdd,        // 设置listener, 处理交易返回信息
        });

        console.log('serialnum', serialNumber);

        setTimeout(function () {
          console.log(' after 20s hahhahah');

          nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
            .then(function (resp) {
              console.log("tx result: " + resp)   //resp is a JSON string
              var respObject = JSON.parse(resp)
              if(respObject.code === 0){
//                alert(`set ${$("#search_value").val()} succeed!`)
                let data = respObject.data
                if (data.status == 0){ // 失败
                  alert(data.executeError)
                } else  if (data.status == 1){
                  // 成功
                  alert('成功！')
                } else if (data.status == 2){
//                  alert('待定！')

                  setTimeout(function () {
                    console.log(' after 20s hahhahah');

                    nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
                      .then(function (resp) {
                        console.log("tx result: " + resp)   //resp is a JSON string
                        var respObject = JSON.parse(resp)
                        if(respObject.code === 0){
                          let data = respObject.data
                          if (data.status == 0){ // 失败
                            alert(data.executeError)
                          } else  if (data.status == 1){
                            // 成功
                            alert('成功！')
                          } else if (data.status == 2){
                            alert('待定！')
                          }
                        }
                      })
                      .catch(function (err) {
                        console.log(err);
                      });

                  },10000);

                }
              }
            })
            .catch(function (err) {
              console.log(err);
            });

        },20000);
      },
      queryPayInfo(serialNumber) {
        nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
          .then(function (resp) {
            console.log("tx result: " + resp)   //resp is a JSON string
            var respObject = JSON.parse(resp)
            if(respObject.code === 0){
              let data = respObject.data
              if (data.status == 0){ // 失败
                alert(data.executeError)
              } else  if (data.status == 1){
                // 成功
                alert('成功！')
              } else if (data.status == 2){
                alert('待定！')
              }
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      cbAdd(resp) {
        console.log(`response of add: ${JSON.stringify(resp)}`);
      },

//      cbCheck(resp) {
//        let result = resp.result;  // string
//        console.log('cb Check result ', result);
//        result = JSON.parse(result)
//        if (!result) {
//          console.log( ' no reulst');
//          return
//        }
//        this.list = result.list;
//        console.log('new list', this.list);
//      }
    },

  };

</script>
<!--<style>-->
  <!--@import url('https://fonts.googleapis.com/css?family=Concert+One');@import url('https://fonts.googleapis.com/css?family=Pacifico');body,html{font-family:'Concert One',cursive;color:#fff;overflow:hidden}.enumerate{margin-top:20px;font-size:2em}.title{color:#fff;font-size:3em}.ssc{font-family:'Pacifico',cursive}.is-gradient{background:linear-gradient(-45deg,rgba(0,0,0,0.8),rgba(58,58,58,0.8))}.footer-text{margin-bottom:10px;font-size:1em}#web3-error{display:none}#web3-buy,#web3-counter{font-size:2em}#web3-counter{display:none}-->
<!--</style>-->
