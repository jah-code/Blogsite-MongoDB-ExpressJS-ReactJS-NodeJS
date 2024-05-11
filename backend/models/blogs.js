const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  address: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

module.exports = mongoose.model("Blog", blogSchema);
