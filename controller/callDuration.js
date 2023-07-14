const callDuration = require("../models/callDuration");
const ChatHistory = require("../models/callDuration");
const resp = require("../helpers/apiResponse");
const { findOne } = require("../models/addEvent");
const Astrologer = require("../models/astrologer");
const User = require("../models/users");
const cron = require("node-cron")
const AdminComision = require("../models/admin");

exports.addCallDuration = async (req, res) => {
  const { userId, astroId, status } = req.body;

  try {
    // Finding the astrologer
    const astro = await Astrologer.findOne({ _id: astroId });

    // Getting the call charge
    console.log("call charge", astro.callCharge);
    const getastrochrge = astro.callCharge;
    const astroCallCharge = astro.callCharge * 5;
    console.log("astroCallCharge", astroCallCharge);
    const user = await User.findOne({ _id: userId });
    const userAmount = user.amount;
    console.log("userAmount", userAmount);
    const onemincharge = astro.callCharge;
    const amountToDeduct = astroCallCharge;
    let waitTym = userAmount / getastrochrge;
    console.log("waitTym", waitTym);

    if (amountToDeduct <= userAmount) {
      const updatedAmount = userAmount - onemincharge;
      user.amount = updatedAmount;

      const newCallDuration = new callDuration({
        duration: 60, // One minute duration
        userId: userId,
        astroId: astroId,
        status: status,
      });

      await Promise.all([user.save(), newCallDuration.save()]);

      res.status(200).json({ message: "Call duration added successfully" });
    } else {
      res.status(400).json({ message: "Insufficient balance for the call" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.intetakeNotification = async (req, res) => {
  await intakeNotification
    .find()
    .populate("userId")
    .populate("chatIntekId")
    .populate("astroId")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

// exports.deductBalance = async (req, res) => {
//   const { userId, astroId } = req.body;

//   const user = await User.findById(userId);
//   const astro = await Astrologer.findById(astroId);

//   if (user.amount <= astro.callCharge * 5) {
//     const deductedBalance = user.amount - astro.callCharge;
//     await User.updateOne({ _id: userId }, { amount: deductedBalance }).then(
//       (res) => {
//         res.status(203).send("Balance is low");
//       }
//     );
//   } else if (user.amount < astro.callCharge) {
//     res.status(404).send("Your balance is not enough to chat");
//   }

//   const deductedBalance = user.amount - astro.callCharge;
//   await User.updateOne({ _id: userId }, { amount: deductedBalance }).then(
//     (res) => {
//       res.status(200).send("Balance Deducted successfully");
//     }
//   );
// };

//let duration;


let isChatHistorySaved = false;
let totalDuration = 0;
let cron_job;
exports.deductBalance = async (req, res) => {
  const { userId, astroId, type } = req.body;
  const user = await User.findById(userId);
  const astro = await Astrologer.findById(astroId);
  console.log("Me call hua hu");
  let duration = 0;

  cron_job = cron.schedule("* * * * *", async () => {
    duration++;
    totalDuration++;
    console.log("duration++", duration++);
    console.log("Total duration:", totalDuration);
    console.log("cron is  ");

    if (user.amount < astro.callCharge) {
      const resp = await Astrologer.updateOne(
        { _id: astroId },
        { callingStatus: "Available" }
      );
      console.log("resp", resp);
      cron_job.stop();
      // res.status(404).send("Your balance is not enough to chat");
    } else if (user.amount <= astro.callCharge * 5) {
      const deductedBalance = user.amount - astro.callCharge;
      console.log("deductedBalance", deductedBalance);
      console.log("user amt", user.amount);
      await User.updateOne({ _id: userId }, { amount: deductedBalance });

      const resp = await Astrologer.updateOne(
        { _id: astroId },
        { callingStatus: "Busy" }
      );

      console.log(resp);
      // res.status(203).send("Balance is low");
    } else {
      const deductedBalance = user.amount - astro.callCharge;
      console.log("astro Charge", astro.callCharge);
      let astrocharge = astro.callCharge;
      console.log("Deducted Balance", deductedBalance);
      let useramt = user.amount;
      console.log("USER", user.amount);

      await User.updateOne({ _id: userId }, { amount: deductedBalance });

      const findexist = await ChatHistory.findOne({
        userId: userId,
        astroId: astroId,
        vc_status: 1
      });
      console.log("findexist", findexist)
      if (findexist) {
        console.log("findexist");
        await ChatHistory.findOneAndUpdate(
          {
            userId: userId,
            astroId: astroId
          },
          { $set: { duration: totalDuration, vc_status: 1 } },
          { new: true }
        );
      } else {
        const newChatHistory = new ChatHistory({
          userId: userId,
          astroId: astroId,
          type: type,
          vc_status: 0
        });

        const savedChatHistory = await newChatHistory.save();
        console.log("savedChatHistory", savedChatHistory);
        const getid = savedChatHistory._id;
        const resp = await ChatHistory.updateOne(
          { _id: getid },
          { vc_status: 1 }
        );
        return res.status(200).send("Balance Deducted successfully");
      }

      const resp = await Astrologer.updateOne(
        { _id: astroId },
        { callingStatus: "Busy" }
      );
      console.log(resp);
    }
  });
};



exports.stop_cron = async (req, res) => {
  // Stop the cron job
  if (cron_job) {
    cron_job.stop();
    cron_job = null; // Reset the cron job variable
    res.status(200).send("Cron job stopped successfully");
  } else {
    res.status(404).send("No active cron job found");
  }
}
exports.changeToAvailable = async (req, res) => {
  try {
    const lastDocument = await ChatHistory.findOne()
      .sort({ createdAt: -1 }) // Assuming `createdAt` is the field by which you want to sort
      .limit(1);
    console.log("lastDocument", lastDocument)
    const updatedChat = await ChatHistory.findOneAndUpdate(
      { _id: lastDocument._id },
      { $set: { vc_status: 0 } },
      { new: true }
    );
    // const lastChatHistory = await ChatHistory.find
    //   ({ $and: [{ userId: req.body.userId }, { astroId: req.body.astroId }] })



    //   .sort({ createdAt: -1 })
    // (
    //   { userId: req.body.userId, astroId: req.body.astroId },
    //   { $set: { vc_status: 0 } },
    //   { new: true }
    // )
    //   .sort({ createdAt: 1 })
    //   .exec();



    // Check if cron_job is defined and stop it
    if (cron_job) {
      cron_job.stop();
      cron_job = null; // Set cron_job to null after stopping to avoid reusing the old job
    }

    console.log("Status updated successfully");
    console.log("Last Chat History:", lastDocument);
    let astroid = lastDocument.astroId
    console.log("astroid", astroid)

    const updatedAstrologer = await Astrologer.findOneAndUpdate(
      { _id: astroid },
      { $set: { callingStatus: "Available", waiting_tym: 0 } },
      { new: true }
    );
    // console.log("Chat History with IDs:", chatHistoryWithIds);
    res.status(200).send("Status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update status" });
  }
};



// exports.changeToAvailable = async (req, res) => {
//   try {
//     const updatechat = await ChatHistory.findOneAndUpdate(
//       { _id: req.body.id },
//       { $set: { vc_status: 0 } },
//       { new: true }
//     );

//     // Check if cron_job is defined and stop it
//     if (cron_job) {
//       cron_job.stop();
//       cron_job = null; // Set cron_job to null after stopping to avoid reusing the old job
//     }

//     console.log("Status updated successfully", updatechat);
//     res.status(200).send("Status updated successfully");
//     let astroid = updatechat.astroId
//     const updatedAstrologer = await Astrologer.findOneAndUpdate(
//       { _id: astroid },
//       { $set: { callingStatus: "Available" } },
//       { new: true }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// };


exports.userChathistory = async (req, res) => {
  await ChatHistory.find({ userId: req.params.id })
    .sort({ createdAt: 1 }).populate("userId").populate("astroId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.astroChathistory = async (req, res) => {
  await ChatHistory.find({ astroid: req.params.id }).populate("userId").populate("astroId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.adminVedioChathistory = async (req, res) => {
  await ChatHistory.find().populate("userId").populate("astroId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltallChat = async (req, res) => {
  await callDuration.deleteMany()
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};