const Review = require("../models/review");
const Astrologer = require("../models/astrologer");
var _ = require('lodash');
exports.addChatReview = async(req,res)=>{
    const {userid,astroid,rating,comment,reply}  = req.body
    const newReview  = new Review({
        userid: userid ,
        astroid:astroid,
        rating : rating,
        comment :comment,
        type:"Chat"
        
    })
    //const getastro = await Astrologer.findOneAndUpdate({_id:req.body.astroid})
        newReview
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newReview,
          })
      
        )
        const getreview =  await Review.find({astroid:req.body.astroid})
        console.log("getreview",getreview)
        if(getreview){
          var newarr1 = getreview.map(function (value) {
          // return value+= value;
    return value.rating
         });
        }
        console.log("New Array",newarr1)
        var ttlr = newarr1.length
        let ratingttl = _.sumBy([...newarr1]);
        console.log("rTotal",ratingttl);
        let average = (ratingttl/ttlr).toFixed(1)
        console.log("Avrage",average)
        await Astrologer.findOneAndUpdate(
          {
            _id: req.body.astroid,
          },
          { $set: {avg_rating:average} },
          { new: true }
        )
  
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }


    exports.addCallReview = async(req,res)=>{
      const {userid,astroid,rating,comment,reply}  = req.body
      const newReview  = new Review({
          userid: userid ,
          astroid:astroid,
          rating : rating,
          comment :comment,
          type:"VoiceCall",
          reply:reply
          
      })
      //const getastro = await Astrologer.findOneAndUpdate({_id:req.body.astroid})
          newReview
          .save()
          .then(
            res.status(200).json({
              status: true,
              msg: "success",
              data: newReview,
            })
        
          )
          const getreview =  await Review.find({astroid:req.body.astroid})
          console.log("getreview",getreview)
          if(getreview){
            var newarr1 = getreview.map(function (value) {
            // return value+= value;
      return value.rating
           });
          }
          console.log("New Array",newarr1)
          var ttlr = newarr1.length
          let ratingttl = _.sumBy([...newarr1]);
          console.log("rTotal",ratingttl);
          let average = (ratingttl/ttlr).toFixed(1)
          console.log("Avrage",average)
          await Astrologer.findOneAndUpdate(
            {
              _id: req.body.astroid,
            },
            { $set: {avg_rating:average} },
            { new: true }
          )
    
          .catch((error) => {
            res.status(400).json({
              status: false,
              msg: "error",
              error: error,
            });
          });
      }
      exports.addVideoreview = async(req,res)=>{
        const {userid,astroid,rating,comment,reply}  = req.body
        const newReview  = new Review({
            userid: userid ,
            astroid:astroid,
            rating : rating,
            comment :comment,
            type:"Video",
            reply:reply
            
        })
        //const getastro = await Astrologer.findOneAndUpdate({_id:req.body.astroid})
            newReview
            .save()
            .then(
              res.status(200).json({
                status: true,
                msg: "success",
                data: newReview,
              })
          
            )
            const getreview =  await Review.find({astroid:req.body.astroid})
            console.log("getreview",getreview)
            if(getreview){
              var newarr1 = getreview.map(function (value) {
              // return value+= value;
        return value.rating
             });
            }
            console.log("New Array",newarr1)
            var ttlr = newarr1.length
            let ratingttl = _.sumBy([...newarr1]);
            console.log("rTotal",ratingttl);
            let average = (ratingttl/ttlr).toFixed(1)
            console.log("Avrage",average)
            await Astrologer.findOneAndUpdate(
              {
                _id: req.body.astroid,
              },
              { $set: {avg_rating:average} },
              { new: true }
            )
      
            .catch((error) => {
              res.status(400).json({
                status: false,
                msg: "error",
                error: error,
              });
            });
        }
 // };
  
  exports.totalcomment = async(req,res) =>{
    await Review.countDocuments().then((data)=>{
      res.status(200).json({
        status: true,
        totalcomment: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    })
  }

exports.allRevieAstro =async(req,res)=>{
    const findall =await Review.find({astroid:req.params.id}).sort({sortorder:1}).populate("userid").populate("astroid")
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

}

  exports.getonereviewproduct = async(req,res) => {
    const findall =await Review.find({product:req.params.id})
    .populate("customer").populate("product")
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

  }

