"use strict";

var Item = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.key = obj.key;
    // this.value = obj.value;
    // this.author = obj.author;
    this.count = obj.count;
    this.list = obj.list;
  } else {
    this.key = "";
    // this.author = "";
    // this.value = "";
    this.count = 0;
    this.list = [];
  }
};

Item.prototype = {
  toString: function() {
    return JSON.stringify(this);
  }
};

var HowManyPeoplePaid = function() {
  LocalContractStorage.defineMapProperty(this, "repo", {
    parse: function(text) {
      return new Item(text);
    },
    stringify: function(o) {
      return o.toString();
    }
  });
};

HowManyPeoplePaid.prototype = {
  init: function() {
    // todo
  },

  save: function(key) {

    key = key.trim();
    // value = value.trim();
    if (key === "") {
      throw new Error("empty key ");
    }

    var from = Blockchain.transaction.from;
    var dictItem = this.repo.get(key);
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

  get: function(key) {
    key = key.trim();
    if (key === "") {
      throw new Error("empty key")
    }
    return this.repo.get(key);
  }
};
module.exports = HowManyPeoplePaid;