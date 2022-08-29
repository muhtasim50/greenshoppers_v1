const router = require("express").Router();
const Users = require("../models/userModel");
const allTransactions = require("../models/userTransactionModel");
const CryptoJS = require("crypto-js");
const axios = require('axios');
const mongoose = require('mongoose')
const transactionInfo = require('../models/userTransactionModel')
const Products = require('../../../mern-ecommerce-master/models/productModel')

router.post("/verifyAccAndTransaction", async (req, res) => {
  const accountId = req.body.accountId;
  const secretkey = req.body.secretkey;
  const amount = parseInt( req.body.amount );
  const orderID = req.body.orderID;
  const adminAccId = req.body.adminAccId;
  const suppAccId = req.body.supAccId;
  const cart = req.body;


  console.log(accountId, secretkey, amount, "--", orderID, adminAccId);

  const existingUser = await Users.findOne({ accountId });
  const existingAdmin = await Users.findOne({ accountId: adminAccId });
  // const userAccBalance = existingUser.amount;
  if (!existingUser) {
    res.send("No such User exists !");
  } else {
    const decryptedHashPassword = CryptoJS.AES.decrypt(
      existingUser.secretkey,
      process.env.PASS_SEC_KEY
    ).toString(CryptoJS.enc.Utf8);
    // console.log(existingUser.accountId, decryptedHashPassword, existingUser.amount);
    const userAccBalance = existingUser.amount;
    const adminAccBalance = existingAdmin.amount;
    console.log(existingAdmin)

    if (
      existingUser.accountId != accountId ||
      decryptedHashPassword != secretkey
    ) {
      res.send("Your Account Number or Secret key is invalid...!");
    } else if (amount > userAccBalance) {
      res.send("Insufficient balance for this transaction...!");
    } else {
      const updatedBalance = userAccBalance - amount;
      const updatedAdminBalance = adminAccBalance + amount;
      const srchedUserAcc = await Users.findOne({ accountId });
      const srchedAdminAcc = await Users.findOne({ accountId: adminAccId });
      const updatedAccount = await Users.updateOne(
      
        srchedUserAcc,
        {
          $set: { amount: updatedBalance },
          
        },
        { new: true }
      );

      const updatedAdminAccount = await Users.updateOne(
      
        srchedAdminAcc,
        {
          $set: { amount: updatedAdminBalance },
          
        },
        { new: true }
      );
      res.send("Transaction successfull...!");

      const transactionId = new Date().getTime()
      const userTransactionDetails = new allTransactions({
        accountId: srchedUserAcc.accountId,
        transferId: srchedAdminAcc.accountId,
        amount: amount,
        transactionId: transactionId,
        orderID,
        cart
      });
      console.log(userTransactionDetails);

      try {
        const newTransaction = await userTransactionDetails.save();
        // console.log("-------->" , newTransaction);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

router.get("/allTransactions", async (req, res) => {
    // await allTransactions.find({}, (err, docs) => {
    //   if (err) res.send(err);

    //   res.send(docs);
    //   // console.log("--->", docs);
    // });
  console.log("a");
});

router.get("/allofTransactions", async (req, res) => {
  try {
  
    await allTransactions.find({}, (err, docs) => {
      if (err) res.send(err);

      res.send(docs);
      // console.log("--->", docs);
    });
  } catch (err) {
    console.log(err);
  }
});

// router.get("/userTransactions", async (req, res) => {
//   try {
//     // console.log("asiii");
//     // const accountId = req.body.accountId;
//     // console.log(accountId, "ashce");
//     // const history = await transactionInfo.find({accountId: req.body.accountId})

//     res.json(history)
//     // await allTransactions.find({}, (err, docs) => {
//     //   if (err) res.send(err);

//     //   res.send(docs);
//     //   console.log("--->", docs);
//     // });
//   } catch (err) {
    // console.log(err);
//   }
// });

module.exports = router;
