const Cart = require("../models/Checkout");
const resp = require("../helpers/apiResponse");
const Astroproduct = require("../models/astroproduct");
const { listenerCount } = require("../models/recharge_plan");



exports.addtoCart = async (req, res) => {
    const {astroId,userId,productid,shipping_address,status} = req.body;
     const getastroproduct = await Astroproduct.findOne({ _id: req.body.astroId });
    console.log("getastroproduct",getastroproduct)
    if (getastroproduct ) {
       const price  =getastroproduct.price
     // console.log(price)
      // totalgst =0

     let  totalgst = price *18/100
      console.log("gstotal",totalgst)
     let total_amt =price + totalgst
     // gsttotal = (price*product_qty) +(product_price*product_qty)
     const cus_orderId = "AL"+Date.now();
    console.log("cus_orderId",cus_orderId)
 
    const newaddCart = new Cart({
       astroId:astroId,
       userId:userId,
       productid: productid,
      shipping_address:shipping_address,
      orderId:cus_orderId,
      gst:totalgst,
      total_amt:total_amt,
      status:status
    })
  
    newaddCart.save()
     
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "Order Detail ",
            data: data,
           gstotal: totalgst,
           total_amt:total_amt
          
          });
        }) 
    
        .catch((error) => {
          res.status(200).json({
            status: false,
            msg: "error",
            error: error,
          });
        });

        // await Cart.findOneAndUpdate(
        //   {
        //     astro_product:astro_product,
        //   },
        //   { $set: {total_amt:total_amt}},
        //   { new: true }
        // )
    
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


   exports.all_transaction_list = async (req, res) => {
    await Cart.find()
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