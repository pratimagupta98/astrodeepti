const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    astroid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "astrologer",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"astromall"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"productcategory"
    },
    price:{
type :Number
    },
    
    // bannertype: {
    //   type: String,
    // },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("consultant", thisSchema);
