

const router = require('express').Router();
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')
const bankAccDetail = require('../models/userModel')


let accNo = 19982022000;

router.post('/register', async (req, res)=>{

    const lastUser = await User.find().sort({ _id:-1 }).limit(1);
    // console.log(lastUser[0]);
    if(lastUser[0]) {
        accNo = Number(lastUser[0].accountId);
    }

    const newUser = new User({
        fullName: req.body.fullName,
        // gender: req.body.gender,
        // email:req.body.email,
        // profession: req.body.profession,

        // accountId: accNo+1,
        accountId: req.body.accountId,
        secretkey: CryptoJS.AES.encrypt(req.body.secretkey, process.env.PASS_SEC_KEY), 
        amount: req.body.amount
    })

    try {
        const createdUser = await newUser.save();
        // console.log(savedUser);
        res.send(createdUser);
    } catch (err) {
        res.send(err);
    }
});

router.post("/userInfos", async (req, res) => {
  try {
    // console.log("asiii");
    // const accountId = req.body.accountId;
    // console.log(accountId, "ashce");
    const infos = await bankAccDetail.find({accountId: req.body.accountId})

    res.json(infos)
    // await allTransactions.find({}, (err, docs) => {
    //   if (err) res.send(err);

    //   res.send(docs);
    //   console.log("--->", docs);
    // });
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
