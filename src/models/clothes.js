'use strict';

const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  name:{type:String,required:true},
  price:{type:String}
})

const clothesModel = mongoose.model('clothes',clothesSchema);

module.exports=clothesModel;