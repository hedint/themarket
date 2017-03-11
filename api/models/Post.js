/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    vk_id : {
      type : 'integer',
      unique : true,
      index : true,
      required : true
    },
    name : {
      type : 'string',
      defaultsTo : ''
    },
    text : {
      type : 'text'
    },
    cost : {
      type : 'integer',
      defaultsTo : 0
    },
    town : {
      type : 'string',
      defaultsTo : ''
    },
    vk_date : {
      type : 'integer',
      defaultsTo : 0
    },
    vk_author : {
      type : 'string',
      defaultsTo : ''
    },
    vk_likes : {
      type : 'integer',
      defaultsTo : 0
    },
    vk_comments : {
      type : 'integer',
      defaultsTo : 0
    },
    delivery : {
      type : 'boolean',
      defaultsTo : false
    }
  }
};

