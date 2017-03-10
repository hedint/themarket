
const GROUP_ID = '-120508713';
var VK = require('vksdk');

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

module.exports = new ServiceVkParse();