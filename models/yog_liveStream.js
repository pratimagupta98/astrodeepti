const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {

        astroId: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        status: {
            type: Boolean
        },

        name: {
            type: String
        },
        channelName: {
            type: String
        },
        token: {
            type: String
        },



    },

    { timestamps: true }
);


module.exports = mongoose.model("asLiveStream", thisSchema);
