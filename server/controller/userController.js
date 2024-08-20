const { User,UserOtp } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sendEmail,generateOTP} =require("./SendAuthenticationOtp")
const {handleOtp} =require("./OtpController")

const signUpUser = async (req, res) => {
    const { email, password } = req.body;

    if (email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ error: "No valid email or password provided" });
  }
  
    try {
        const existingUser = await User.findOne({ where: { Email: email } });
  
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
  
       
  
        // const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create user with email, hashed password, and activation token
        const newUser = await User.create({
            Email: email.trim(),
            Password:password,
           // Adjust the field name according to your User model
        });
  
        const userId=newUser.id
      
  
        res.json(" SignUp success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
    
        const user = await User.findOne({ where: { Email: email.trim()} });
    
        if (!user) {
          return res.status(404).json({ error: "Email does not exist" });
        }
    
        bcrypt.compare(password.trim(), user.Password).then((match) => {
          if (!match) {
            return res.status(401).json({ error: "Wrong password and email combination" });
          }
    
          
          const JWT_SECRET= "Quajib"
          // Generate a JWT token
          const token = jwt.sign({ userId: user.id}, JWT_SECRET, {
            expiresIn: '1h', // Token expiration time (e.g., 1 hour)
          });
    
          // Send the token and a success message as a JSON response
          res.json({ message: "Signin successful", token });
        });
      } catch (error) {
        // Log the error to the console or your logging system
        console.error("SignIn error:", error);
    
        // Send a generic error message to the frontend
        res.status(500).json({ error: "An error occurred during login" });
      }
};

const sendPasswordResetAuthenticationOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { Email: email.trim() } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User email does not exist" });
    }

    // Generate the OTP
    const { success: otpSuccess, otp } = generateOTP();

    if (!otpSuccess) {
      return res.status(500).json({ success: false, message: "Failed to generate OTP" });
    }

    // Handle the OTP (store it in the UserOTP table)
    const { success: handleOtpSuccess, status: handleOtpStatus, message: handleOtpMessage } = await handleOtp(user.id, otp);

    if (!handleOtpSuccess) {
      return res.status(handleOtpStatus).json({ success: false, message: handleOtpMessage });
    }

    // Send the OTP via email
    const subject = "Your OTP Code";
    const message = "Please use the following OTP code to authenticate your password reset";
    const { success: emailSuccess, message: emailMessage } = await sendEmail(email, otp, subject, message);

    if (!emailSuccess) {
      return res.status(500).json({ success: false, message: emailMessage });
    }

    res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully. Check your email.",
      nextStep: {
        service: 'passwordReset',
        redirectTo: '/emailauthentication'
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred during authentication" });
  }
};


 const authenticate = async(req,res)=>{
  const { otp } = req.body;
  //test the otp if it is reaching back-end
  // console.log(`the sent otp from front end is ${otp}`);

  if (otp === undefined || otp === null) {
    return res.status(400).json({ error: " Invalid or null" });
  }

  try {
    // Extract user ID from request object
    const userId = req.userId;

    // Find the OTP record for the user
    const userOTP = await UserOTP.findOne({ where: { User_Id: userId } });

    if (!userOTP) {
      return res.status(404).json({ error: "Invalid OTP" });
    }

    // Check if provided OTP matches the OTP stored in the database
    if (otp !== userOTP.otp) {
      // Increment attempts count
      userOTP.attempts += 1;
      await userOTP.save();

      // Check if attempts count reached three
      if (userOTP.attempts >= 3) {
        // Destroy OTP record
        await UserOTP.destroy({ where: { User_Id: userId } });
      }

      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Activate user's account
    await User.update({ Is_Active: true }, { where: { id: userId } });

    // Delete OTP record
    await UserOTP.destroy({ where: { User_Id: userId } });

    return res.json("Activation and profile creation successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }

 }





module.exports = {
  signUpUser,
  signInUser,
  sendPasswordResetAuthenticationOtp,
    
};