const ChatWallet = require("../models/chatWallet");
const resp = require("../helpers/apiResponse");
const Astrologer = require("../models/astrologer");
const Minutecharge = require("../models/min_charges");
const User = require("../models/users");

 const WalletT =  require("../models/walletTransaction");

exports.addChatWallet = async (req, res) => {
    const {userid,astroid,recharge_planId,finalAmt,beforeAmt,deductedAmt} = req.body;




const getoneastro = await Astrologer.findOne({_id:req.body.astroid})
//console.log("ASTRO",getoneastro)
if(getoneastro){
const getcharge = getoneastro.callCharge
console.log("CALLCHARGE",getcharge)

 const getplanchrge = await Minutecharge.findOne({_id:req.body.recharge_planId})
 console.log("MIN PLAN",getplanchrge)
 if(getplanchrge){
 const getplan = getplanchrge.minute
 console.log("getplan",getplan)

 const getuserdetail = await User.findOne({_id:req.body.userid})
 //console.log("GETUSER",getuserdetail)
 if(getuserdetail){
    let totalamt = getcharge*getplan
    console.log("TOTAL AMT WAS DEDUCTED",totalamt)
 const getwalletamt = getuserdetail.amount
 console.log("WALLET AMT",getwalletamt)
 let  newamt=0
 if (getwalletamt>totalamt){
console.log("success")

newamt =getwalletamt - totalamt
console.log("Before",getwalletamt)
console.log("new",newamt)
const newChatWallet = new ChatWallet({
  userid:userid,
  astroid:astroid,
  recharge_planId:recharge_planId,
  type :"Chat",
  tran_Type:"Debited",
  conversationId:"#"+ Date.now(),
  beforeAmt:getwalletamt,
  deductedAmt:totalamt,
  finalAmt:newamt
})
const newWalletT = new WalletT({
userid:userid,
astroid:astroid,
recharge_planId:recharge_planId,
type :"Chat",
tran_Type:"Debited",
conversationId:"#"+ Date.now(),
beforeAmt:getwalletamt,
deductedAmt:totalamt,
finalAmt:newamt
})
newChatWallet.save()
        .then(async (data) => {
           const createnewtable = await WalletT.create(newWalletT);
          console.log("MMMMMM",createnewtable)
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            beforeAmt:getwalletamt,
            deductedAmt:totalamt,
            finalAmt:newamt

            // callCharge:getoneastro.callCharge,
            // minute:
          });
        }) 
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
        const finduserAndupdate = await User.findOneAndUpdate(
  
            { _id: req.body.userid },
            
            { $set: {amount:newamt,deductedAmt:totalamt } },
          { new: true },
          )
          if(finduserAndupdate){
console.log("UPDATE USER AMOUNT",finduserAndupdate)

          }

       
 }else{
    console.log("INSUFFICIENT BALANCE")
    res.status(201).json({
        status:false,
        msg:"Insufficient belence"
    })
 }

 }else{
    console.log("ERROR")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
 }
 }else{
console.log("error")
res.status(400).json({
    status:false,
    msg :"Something Went Wrong"
})
 }

}else{
    console.log("error")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
}
    

  }  
exports.addCallWallet = async (req, res) => {
    const {userid,astroid,recharge_planId,beforeAmt,deductedAmt,finalAmt} = req.body;


const getoneastro = await Astrologer.findOne({_id:req.body.astroid})
//console.log("ASTRO",getoneastro)
if(getoneastro){
const getcharge = getoneastro.callCharge
console.log("CALLCHARGE",getcharge)

 const getplanchrge = await Minutecharge.findOne({_id:req.body.recharge_planId})
 console.log("MIN PLAN",getplanchrge)
 if(getplanchrge){
 const getplan = getplanchrge.minute
 console.log("getplan",getplan)

 const getuserdetail = await User.findOne({_id:req.body.userid})
 //console.log("GETUSER",getuserdetail)
 if(getuserdetail){
    let totalamt = getcharge*getplan
    console.log("TOTAL AMT WAS DEDUCTED",totalamt)
 const getwalletamt = getuserdetail.amount
 console.log("WALLET AMT",getwalletamt)
 let  newamt=0
 if (getwalletamt>totalamt){
console.log("success")

newamt =getwalletamt - totalamt
console.log("camt",getwalletamt)
console.log("new",newamt)

const newChatWallet = new ChatWallet({
  userid:userid,
  astroid:astroid,
  recharge_planId:recharge_planId,
  type:"Voice Call",
  tran_Type:"Debited",
  conversationId:"#"+ Date.now(),
  beforeAmt:getwalletamt,
            deductedAmt:totalamt,
            finalAmt:newamt

})
const newWalletT = new WalletT({
userid:userid,
  astroid:astroid,
  recharge_planId:recharge_planId,
  type:"Voice Call",
  tran_Type:"Debited",
  conversationId:"#"+ Date.now(),
  beforeAmt:getwalletamt,
            deductedAmt:totalamt,
            finalAmt:newamt
})
newChatWallet.save()
        .then(async(data) => {
          const createnewtable = await WalletT.create(newWalletT);
          console.log("MMMMMM",createnewtable)
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            beforeAmt:getwalletamt,
            deductedAmt:totalamt,
            finalAmt:newamt

            // callCharge:getoneastro.callCharge,
            // minute:
          });
        }) 
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
        const finduserAndupdate = await User.findOneAndUpdate(
  
            { _id: req.body.userid },
            
            { $set: {amount:newamt,deductedAmt:totalamt } },
           
          //     { amount: currntamt },
               
          // { $set: {status:"success"} },
          { new: true },
          )
          if(finduserAndupdate){
console.log("UPDATE USER AMOUNT",finduserAndupdate)

          }
          // const tableUpdate = await ChatWallet.findOneAndUpdate(
  
          //   { userid: req.body.userid },
            
          //   { $set: {beforeAmt:getwalletamt,deductedAmt:totalamt, finalAmt:newamt} },
          // { new: true },
          // )
          // if(tableUpdate){
          //   console.log("UPDATE",tableUpdate)
            
          //             }
         
          //             const updateSuccess = await WalletT.findOneAndUpdate(
  
          //               { userid: req.body.userid },
                        
          //               { $set: {beforeAmt:getwalletamt,deductedAmt:totalamt, finalAmt:newamt} },
          //             { new: true },
          //             )
          //             if(updateSuccess){
          //               console.log("UPDATE",updateSuccess)
                        
          //                         }


 }else{
    console.log("INSUFFICIENT BALANCE")
    res.status(201).json({
        status:false,
        msg:"Insufficient belence"
    })
 }

 }else{
    console.log("ERROR")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
 }
 }else{
console.log("error")
res.status(400).json({
    status:false,
    msg :"Something Went Wrong"
})
 }

}else{
    console.log("error")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
}
  }  

  exports.addVideoCallWallet = async (req, res) => {
    const {userid,astroid,recharge_planId,beforeAmt,deductedAmt,finalAmt} = req.body;


 
const getoneastro = await Astrologer.findOne({_id:req.body.astroid})
//console.log("ASTRO",getoneastro)
if(getoneastro){
const getcharge = getoneastro.callCharge
console.log("CALLCHARGE",getcharge)

 const getplanchrge = await Minutecharge.findOne({_id:req.body.recharge_planId})
 console.log("MIN PLAN",getplanchrge)
 if(getplanchrge){
 const getplan = getplanchrge.minute
 console.log("getplan",getplan)

 const getuserdetail = await User.findOne({_id:req.body.userid})
 //console.log("GETUSER",getuserdetail)
 if(getuserdetail){
    let totalamt = getcharge*getplan
    console.log("TOTAL AMT WAS DEDUCTED",totalamt)
 const getwalletamt = getuserdetail.amount
 console.log("WALLET AMT",getwalletamt)
 let  newamt=0
 if (getwalletamt>totalamt){
console.log("success")

newamt =getwalletamt - totalamt
console.log("camt",getwalletamt)
console.log("new",newamt)

const newChatWallet = new ChatWallet({
  userid:userid,
  astroid:astroid,
  recharge_planId:recharge_planId,
  type:"Video Call",
  tran_Type:"Debited",
  conversationId:"#"+ Date.now(),
  beforeAmt:getwalletamt,
  deductedAmt:totalamt,
  finalAmt:newamt

})
const newWalletT = new WalletT({
userid:userid,
  astroid:astroid,
  recharge_planId:recharge_planId,
  type:"Video Call",
  tran_Type:"Debited",
  conversationId:"#"+ Date.now(),
  beforeAmt:getwalletamt,
  deductedAmt:totalamt,
  finalAmt:newamt
})
newChatWallet.save()

        .then(async(data) => {
          const createnewtable = await WalletT.create(newWalletT);
          console.log("MMMMMM",createnewtable)
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
            // callCharge:getoneastro.callCharge,
            // minute:
          });
        }) 
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
        const finduserAndupdate = await User.findOneAndUpdate(
  
            { _id: req.body.userid },
            
            { $set: {amount:newamt,deductedAmt:totalamt } },
           
          //     { amount: currntamt },
               
          // { $set: {status:"success"} },
          { new: true },
          )
          if(finduserAndupdate){
console.log("UPDATE USER AMOUNT",finduserAndupdate)

          }
        
      

 }else{
    console.log("INSUFFICIENT BALANCE")
    res.status(201).json({
        status:false,
        msg:"Insufficient belence"
    })
 }

 }else{
    console.log("ERROR")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
 }
 }else{
console.log("error")
res.status(400).json({
    status:false,
    msg :"Something Went Wrong"
})
 }

}else{
    console.log("error")
    res.status(400).json({
        status:false,
        msg :"Something Went Wrong"
    })
}
    

  }  

  
  exports.getoneCart = async (req, res) => {
   const getone= await Cart.findOne({ _id: req.params.id }).populate("shipping_address").populate("astroId")
   //.populate("astroid")
   .populate({
    path: "astroId",
    populate: {
      path: "astroid",
    },
  })
  .populate({
    path: "astroId",
    populate: {
      path: "product",
    },
  })
  .populate({
    path: "astroId",
    populate: {
      path: "category",
    },
  }).populate("productid")
//console.log("strng",getone)
  //  if(getone){
  //   const astropro = getone.astro_product
  //   console.log("pp",astropro)
  //   const price  =astropro.price
  //     console.log(price)
  //     let gstotal =0

  //     gstotal = price *18/100
  //     console.log("gstotal",gstotal)
  //     total_amt =price + gstotal


  //     res.status(200).json({
  //       status: true,
  //       msg: "success",
  //       data: getone,
  //     //  gsttotal: gsttotal, 
  //     total_amt :total_amt    
  //     });
     
  //  }else{
  //   res.status(400).json({
  //     status: false,
  //     msg: "error",
  //     error: "error",
  //   });
  

  .then((data) => resp.successr(res, data))
   .catch((error) => resp.errorr(res, error));
   }
    
     
     // gsttotal = (price*product_qty) +(product_price*product_qty)
      // .then((data) => resp.successr(res, data))
      // .catch((error) => resp.errorr(res, error));
  exports.cartbycustomer = async (req, res) => {
    //await Cart.remove()
    const findone = await Cart.find({userid: req.userId })
      // .populate("customer")
     if (findone) {
    const findall = await Product.find({ product: req.params.id })
    console.log(findall)
    const value = findall.value
      console.log(findall)
      if (findall) {
        const getgst = await Gstrate.findOne({ gstrate: findall.gstrate });
       let value = getgst.value
       console.log(getgst)
  console.log(value)
  
      let sum = 0;
      //const value = 0
       for (let i = 0; i < findone.length; i++) {
        let element_price = findone[i].product_price;
        let element_qty = findone[i].product_qty;
         
      //  let element_gst = findone[i].gsttotal;
         sum =(element_price * element_qty);
        // let sum = 0;
        // sum =  (element_price * element_qty);
        //  gsttotal = value +(element_price*element_qty)
        //   console.log(gsttotal)
       }
      res.status(200).json({
        status: true,
        msg: "success",
        data: findone,
      //  gsttotal: gsttotal, 
    //  ttl :gsttotal    
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
   }


   exports.getOne_Conversation_Wallet = async (req, res) => {
    await ChatWallet.find({userid:req.params.id}).populate("userid").populate("astroid").populate("recharge_planId")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.completed_order = async (req, res) => {

    // const findone =  await Cart.find({
    //   $and: [{ userId: req.params.userId}, { status: "Completed" }],
    // })
    await Cart.find({$and: [{ userId: req.params.id}, { status: "Completed" }]}).populate({
      path: "astroId",
      populate: {
        path: "astroid",
      },
    })
    .populate("shipping_address")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };



  exports.dltMany = async (req, res) => {
    await Cart.deleteMany()
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.pending_order = async (req, res, next) => {
    const finddetails = await Ordertable.find({
      $and: [{ seller: req.sellerId }, { status: "Pending" }],
    })
      .populate("customer")
      .populate("product")
      .then((result) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  };
  