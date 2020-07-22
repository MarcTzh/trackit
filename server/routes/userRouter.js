const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const _ = require("lodash");
const Mailer = require("../Mailer");
const checkPrice = require('../checkPrice');

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//crawl
router.get("/crawl", async (req, res) => {
  const { 
    url
  } = req.body;
  let result = null;
  try {
    result = checkPrice(url)
  } catch (err) {
    console.log("userRouter error: " + err)
  }
  return res.json(result);

});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

router.post("/ForgotPassword", async (req, res) => {

    const { email } = req.body;

    // validate
    if (!email)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
    // res.json({
    //   token,
    //   user: {
    //     id: user._id,
    //     displayName: user.displayName,
    //   },
    // });
    return user.updateOne({resetLink: token}, (err, success) => {
      if(err) {
        return res
        .status(400)
        .json({ error: "reset password link error" });
      } else {
        const link = `http://localhost:3000/ResetPassword/${token}`
        Mailer.sendEmail('Trackit password reset',
          `
            <h2>Please visit this link to reset your password<h2>
            <a> ${link} </a>
          `,
          email
        );
        return res
          .status(400)
          .json({message: 'Email has been sent, kindly follow the instructions to reset your password'});
      }
  });
});

router.post("/ResetPassword", (req, res) => {
  const { 
    newPass,
    confirmNewPass,
    resetLink
  } = req.body;
  if(newPass !== confirmNewPass) {
    return res.status(401).json({ error: "Passwords do not match" });
  }
  if(resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decodedData) => {
      if(error) {
        return res.status(401).json({ error: "Invalid or expired link" });
      }
      User.findOne({resetLink}, async (err, user) => {
        if(err || !user) {
          return res.status(400).json({error: "User with this token does not exist"})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPass, salt);

        const obj = {
          password: passwordHash,
          resetLink: ''
        }

        user = _.extend(user, obj);
        user.save((err, result) => {
          if(err) {
            return res.status(400).json({error: "reset password error"})
          } else {
            return res.status(200).json({message: "Your password has been changed"})
          }
        })
      })  
    })
  } else {
    return res.json(400).json({ msg: "Authentication error" });
  }

});

router.post("/EditUser", async (req, res) => {
    const {
      id,
      newEmail,
      currPassword,
      newPassword,
      newDisplayName,
      notiSettings,
    } = req.body;
    // validate
    if (!currPassword) {
      return res.status(400).json({ msg: "Password is required." });
    }
    if (id) {
      User.findOne({_id: id}, async (err, user) => {
          if(err || !user) {
            return res.status(400).json({error: "User with this id does not exist"})
          }
          const isMatch = await bcrypt.compare(currPassword, user.password);
          if (!isMatch) return res.status(400).json({ msg: "Wrong password" });
          let passwordHash = null;
          if(newPassword) {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(newPassword, salt);
          }
          var obj = {
            email: newEmail,
            password: passwordHash,
            displayName: newDisplayName,
            emailPreference: notiSettings,
            resetLink: ''
          }
          // return res.json(obj);
          //remove fields that have not been modified
          Object.keys(obj).forEach(key => {
            if (obj[key] === null) {
              delete obj[key];
            }
          });

          user = _.extend(user, obj);
          user.save((err, result) => {
            if(err) {
              // return res.json(obj)
              return res.status(400).json({error: "edit user error"})
            } else {
              // return res.json(obj)
              return res.status(200).json({message: "Your details has been changed"})
            }
          })
        });
    } else {
      return res.json(400).json({ msg: "Authentication error: no id" });
    }
});


module.exports = router;