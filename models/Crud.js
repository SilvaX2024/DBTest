const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CrudSchema = new Schema({
  filesName: {
    type: String,
    required: true,
  },
  folderName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Crud = mongoose.model("Crud", CrudSchema);
module.exports = Crud;
