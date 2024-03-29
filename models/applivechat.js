const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {



        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: "user"

        },
        astroid: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        msg: {
            type: String
        },
        // status: {
        //     type: String,
        //     default: "true"
        // },
        type:{
            type: String,
        },
        token:{
            type: String,
        }
    },

    { timestamps: true }
);


module.exports = mongoose.model("appliveChat", thisSchema);
