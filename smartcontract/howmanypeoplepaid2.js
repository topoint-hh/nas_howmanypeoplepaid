// Test
//
//

const Item = function (text) {
  if (text) {
    const obj = JSON.parse(text);
    this.key = obj.key;
    // this.value = obj.value;
    // this.author = obj.author;
    this.count = obj.count;
    this.list = obj.list;
  } else {
    this.key = '';
    // this.author = "";
    // this.value = "";
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
