// Test
// 51e97c63c2228afe57a95a270c22b4878ac9385eefa2d961a1afa53703b8c1b9
// n1y9wBx2Kt4aYSqaosasHtaQVjqzZMktjnj
// Main
// 237956e6d40547b6bb056357cec8958bafb84ce8976d72d564f7365e32d6cd7b
// n1exFH19cJbzVDhTnb2DaoRKztZFJn4efvV

const Item = function (text) {
  if (text) {
    const obj = JSON.parse(text);
    this.key = obj.key;
    this.count = obj.count;
    this.list = obj.list;
  } else {
    this.key = '';
    this.count = 0;
    this.list = [];
  }
};

Item.prototype = {
  toString() {
    return JSON.stringify(this);
  },
};

const HowManyPeoplePaid = function () {
  LocalContractStorage.defineMapProperty(this, 'repo', {
    parse(text) {
      return new Item(text);
    },
    stringify(o) {
      return o.toString();
    },
  });
};

HowManyPeoplePaid.prototype = {
  init() {
    // todo
  },

  get(key) {
    key = key.trim();
    if (key === '') {
      throw new Error('empty key');
    }
    return this.repo.get(key);
  },
  /**
   * 成功后count添加1
   */
  add(key) {
    const from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;

    // var value = new BigNumber(Blockchain.transaction.value);

    if (value != 10000000000000000) {
      throw new Error("对不起，请确认支付0.01NAS!");
    }

    let dictItem = this.repo.get(key);
    if (!dictItem) {
      dictItem = new Item();
    }

    // dictItem.author = from;
    dictItem.key = key;
    dictItem.count += 1;
    dictItem.list.push(from);

    this.repo.put(key, dictItem);
  },

};
module.exports = HowManyPeoplePaid;
