
const GROUP_ID = '-120508713';
const VK = require('vksdk');

var ServiceVkParse = function () {
    this.group_id = GROUP_ID;
    this.proxy = null;
};
ServiceVkParse.fn = ServiceVkParse.prototype;
ServiceVkParse.fn.initVkProxy = function () {
    let vk = new VK({
        'appId'     : 3721359,
        'appSecret' : 'tTuSEbwX9a2KZQw4RTjT',
        'language'  : 'ru'
    });
    // Setup server access token for server API methods
    vk.on('serverTokenReady', function(_o) {
        // Here will be server access token
        vk.setToken(_o.access_token);
    });
    this.proxy = vk;
};
ServiceVkParse.fn.getVkProxy = function () {
    if (this.proxy) {
        return this.proxy;
    }
    this.initVkProxy();
    return this.proxy;
};
ServiceVkParse.fn.getPosts = function (count, offset, callback) {
    count = count || 100;
    offset = offset || 0;
    let vk = this.getVkProxy();
    vk.request('wall.get', {'owner_id' : this.group_id, count : count, offset: offset},(vk_res) => {
        callback(vk_res);
    });
};
ServiceVkParse.fn.getLastPosts = function (count, callback) {
    count = count || 10;
    let offset = 0;
    this.getPosts(count, offset, callback);
};

ServiceVkParse.fn.parsePost = function (vk_post) {
  if (!vk_post.signer_id || vk_post.marked_as_ads || this.isSearchPost(vk_post.text)) {
    return false;
  }
  let post = {};
  post.vk_id = parseInt(vk_post.id, 10);
  post.vk_date = parseInt(vk_post.date, 10);
  post.vk_text = vk_post.text;
  post.vk_author = parseInt(vk_post.signer_id, 10);
  post.vk_likes = parseInt(vk_post.likes.count, 10);
  post.vk_comments = parseInt(vk_post.comments.count, 10);
  post.delivery = this.parseDelivery(vk_post.text);
  post.cost = this.parseCost(vk_post.text);
  post.name = this.parseName(vk_post.text);
  return post;
};
ServiceVkParse.fn.parseCost = function (text) {
  let regular = /[0-9]+(\s|,|\.)?[0-9]*\s?(k|K|к|К|р|Р|r|R|₽){0,10}/gi;
  let result = text.match(regular);
  let cost = false;
  if (result) {
    cost = this.removeSpace(result[result.length -1]);
    result.forEach((item) => {
      item = this.removeSpace(item);
      if (['к','К','k','K'].indexOf(item[item.length - 1 ]) !== -1) {
        cost = parseInt(item, 10);
        cost = cost * 1000;
      }
      if (['р','Р', 'r', 'R'].indexOf(item[item.length - 1 ]) !== -1) {
        cost = item;
      }
    });
    cost = parseInt(cost, 10);
    return cost;
  }
  return false;
};

ServiceVkParse.fn.parseName = function (text) {
  let regular = /[a-zA-Z \-\\\/\*\d]+/i;
  let result = text.match(regular);
  if (result) {
    return this.trim(result[0]);
  }
  return false;
};

ServiceVkParse.fn.parseDelivery = function (text) {
  let regular = /(шип|доставка|доставлю|почта)/i;
  let result = text.match(regular);
  if (result) {
    return true;
  }
  return false;
};

ServiceVkParse.fn.removeSpace = function (text) {
  var VRegExp = new RegExp(/\s|,|\.+/g);
  var VResult = text.replace(VRegExp, '');
  return VResult
};

ServiceVkParse.fn.trim = function (text) {
  var VRegExp =new RegExp(/^(\s|\u00A0)+/g);
  var VResult = text.replace(VRegExp, '');
  return VResult
};

ServiceVkParse.fn.isSearchPost = function (text) {
  let regular = /(ищу|куплю)/i;
  let result = text.match(regular);
  if (result) {
    return true;
  }
  return false;
};
ServiceVkParse.fn.parseTown = function (text) {

};
module.exports = new ServiceVkParse();
