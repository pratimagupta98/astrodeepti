const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
 
  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment:{
      type : String
},

},
{ timestamps: true }
);
 module.exports = mongoose.model("review", ReviewSchema);


 