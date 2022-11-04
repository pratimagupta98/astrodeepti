const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
 
  planid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plan'
  },
gstAmt:{
    type:Number
},
ttl_amt :{
    type:Number
},
transaction_id:{ 
    type:String
}

},
{ timestamps: true }
);
 module.exports = mongoose.model("recharWallet", ReviewSchema);


 