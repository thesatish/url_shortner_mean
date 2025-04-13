const mongoose = require('mongoose');
const schema = mongoose.Schema;
const shortid = require('shortid');

var urlSchema = new schema({
  originalUrl: {
      type: String,
      required: true
    },
    shortId: {
      type: String,
      required: true,
      default: shortid.generate(),
      unique : true
    },
    clicks: {
      type: Number,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    },
  }, { 
    timestamps: true,
  });
  
  var UrlModel = mongoose.model("Url", urlSchema);
  module.exports = UrlModel;
