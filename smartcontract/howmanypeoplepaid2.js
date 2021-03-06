// Test
//0cc518e63029b8e40b1a30e5e3af1eed7340368810a13f768af131c1c311ff76
//n1kpLEWv25HkqG33cRLGowiCGXkA3iBXBzP
//

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

  save(key) {
    key = key.trim();
    // value = value.trim();
    if (key === '') {
      throw new Error('empty key ');
    }

    const from = Blockchain.transaction.from;
    let dictItem = this.repo.get(key);
    if (!dictItem) {
      dictItem = new Item();
    }

    // dictItem.author = from;
    dictItem.key = key;
    // dictItem.value = value;
    dictItem.count += 1;
    dictItem.list.push(from);

    this.repo.put(key, dictItem);
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
  check(key) {
    const from = Blockchain.transaction.from;
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
