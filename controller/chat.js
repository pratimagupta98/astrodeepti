const Chat = require("../models/chat");
const Chatroom = require("../models/chatroom");
const resp = require("../helpers/apiResponse");
const { v4: uuidv4 } = require("uuid");
var cron = require('node-cron');

cron.schedule('*/10 * * * * *', () => {
  console.log('running a task every minute');
});


exports.addchat = async (req, res) => {
  const uniqueroom = uuidv4();
  const { userid,astroid, msg } = req.body;

  const newChat = new Chat({
    userid: req.params.id,
    astroid:astroid,
    msg: msg,
    roomid: uniqueroom,
    type:"user"
    
  });

  const newChatroom = new Chatroom({
    userid: req.params.id,
    astroid:astroid,
    last_msg: msg,
    new_unread_msg: 1,
  });
  const findchatroom = await Chatroom.findOne( { $and: [{ userid: req.params.id }, { astroid:astroid }]} );
  
  console.log("FINDDATA",findchatroom)
  if (findchatroom) {
    newChat.roomid = findchatroom._id;
    let data = {
      new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    };
    // if (!msgbysupport) {
    //   data.last_msg = msg;
    // }
    console.log("DATA",data);
    const updatechat = await Chatroom.findOneAndUpdate(
        {
            $or: [
              { $and: [{ userid: req.params.id }, { astroid: req.body.id }] },
              { $and: [{ astroid: req.body.id }, { userid: req.params.id }] },
            ],
          },
      {
        $set: data,
      },
      { new: true }
    );
    newChat
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    const savechat = await newChatroom.save();
    if (savechat) {
      newChat.roomid = savechat._id;
      newChat
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};




exports.add_chatroom = async (req, res) => {
    const uniqueroom = uuidv4();
    const { reciver,sender,astroid, msg, msg_reply } = req.body;
  
    const newChat = new Chat({
      reciver: reciver,
      sender:req.params.id,
      msg: msg,
      type:"astrologer"
   //   roomid: uniqueroom,
       
    });
  
    // const newChatroom = new Chatroom({
    //   userid: req.params.id,
    //   astroid:astroid,
    //   last_msg: msg,
    //   new_unread_msg: 1,
    // });
    // const findchatroom = await Chatroom.findOne( { $and: [{ userid: req.params.id }, { astroid:astroid }]} );
    // console.log("FINDDATA",findchatroom)
    // if (findchatroom) {
    //   newChat.roomid = findchatroom._id;
    //   let data = {
    //     new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    //   };
    //   if (!msgbysupport) {
    //     data.last_msg = msg;
    //   }
    //   console.log("DATA",data);
      // const updatechat = await Chatroom.findOneAndUpdate(
      //     {
      //         $or: [
      //           { $and: [{ userid: req.params.id }, { astroid: req.body.id }] },
      //           { $and: [{ astroid: req.body.id }, { userid: req.params.id }] },
      //         ],
      //       },
      //   {
      //     $set: req.body,
      //   },
      //   { new: true }
      // );
      // newChat
      //   .save()
      //   .then((data) => resp.successr(res, data))
      //   .catch((error) => resp.errorr(res, error));
    // } else {
    //   const savechat = await newChatroom.save();
    //   if (savechat) {
    //     newChat.roomid = savechat._id;
    //     newChat
    //       .save()
    //       .then((data) => resp.successr(res, data))
    //       .catch((error) => resp.errorr(res, error));
    //   }

    const findchatroom = await Chatroom.findOne( { $and: [{ userid: reciver }, { astroid:req.params.id }]} );
    console.log("FINDDATA",findchatroom)
    if (findchatroom) {
      newChat.roomid = findchatroom._id;
      let data = {
        new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
      };
      // if (!msgbysupport) {
      //   data.last_msg = msg;
      // }
      console.log("DATA",data);
      const updatechat = await Chatroom.findOneAndUpdate(
          {
              $or: [
                { $and: [{ userid: req.params.id }, { astroid: req.body.id }] },
                { $and: [{ sender: req.params.id }, { userid: req.body.id }] },
              ],
            },
        {
          $set: data,
        },
        { new: true }
      );
      newChat
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
  
  

exports.allchatwithuser = async (req, res) => {
  //const{roomid} = req.body
    await Chat.find({roomid:req.params.id}).populate("userid").populate("astroid").populate("reciver").populate("sender")
     // .populate("userid").populate("astroid")
      .sort({ createdAt: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_chat = async (req, res) => {
    //const{roomid} = req.body
      const getone =await Chat.findOne({$and:[{userid:req.params.id},{astroid:req.params.id}]}).populate("userid").populate("astroid")
      
       // .populate("userid").populate("astroid")
        .sort({ createdAt: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };

  exports.userChatList = async (req, res) => {
    //const{roomid} = req.body
     const getdetails=  await Chat.find({userid:req.params.id }).populate("userid").populate("astroid")
    //  console.log("getdetails",getdetails)

    //  getroomid =getdetails.indexOf('roomid')
    //  console.log("getroomid",getroomid)
 
    let record = [];
   
    
    for (const element of getdetails) {
       if (element.astroid) {
        
         record.push(element.astroid);
       }
     }
let uniqueCharss = [...new Set(record)]
console.log("hfjdbf",uniqueCharss)
console.log("uniqueCharss",uniqueCharss)
        //S  uniquele.log("uniqueCharss",uniqueCharss)
       // .populate("userid").populate("astroid")
      //  .sort({ createdAt: 1 })
        // .then((data) => resp.successr(res, data))
        // .catch((error) => resp.errorr(res, error));
       

  //  const unique = [...new Map(getdetails.map((m) => [m.id, m])).values()];
  //  console.log("UNIQUE",unique);
  //  let uniqueCharss = [...new Set(unique)]
  //    console.log("hfjdbf",uniqueCharss)
 

  const newArray = getdetails.map((m) => [m.id, m]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const unique = [...iterator];
  //console.log("UNIQUE",unique)

  function removeDuplicates(getdetails) {
    return getdetails.filter((item,
        index) => getdetails.indexOf(item) === index);
}
//console.log("string",removeDuplicates(getdetails));
  
 // console.log(unique);

  let addresses = [...new Set([...getdetails.map(address => getdetails[address.roomid])])]

console.log("ADDRESS",addresses)

        res.status(200).json({
          status: true,
          message: "success", 
          count: getdetails.length,
          //data : getdetails,
          //student :record,
          //count :
          // astroid:uniqueCharss,
          // roomid:uniqueid,
        //  data:getdetails,
        astroid:getdetails

        })
    };

  exports.allchatwithAstro = async (req, res) => {
    await Chat.find({  $or: [{ astroid: req.params.id }, { sender: req.params.id }] })
      .populate("userid").populate("astroid").populate("reciver").populate("sender")
      .sort({ createdAt: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.unreadmessages = async (req, res) => {
    await Chatroom.findOne({ userid: req.params.id })
      .populate("userid")
      .sort({ createdAt: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getallchatrooms = async (req, res) => {
    await Chatroom.find()
      .populate("userid")
      .sort({ updatedAt: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.clearchat = async (req, res) => {
    await Chat.deleteMany({ userid: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.markasread = async (req, res) => {
    await Chatroom.findOneAndUpdate(
      { userid: req.params.id },
      {
        $set: { new_unread_msg: 0 },
      },
      { new: true }
    )
      .populate("userid")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };