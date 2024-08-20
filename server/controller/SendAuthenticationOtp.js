

const nodemailer = require("nodemailer");
 // Function to send activation email 
 async function sendEmail(email, otp,subject,message)
  {
    // //test wether otp reaches nodemailer with consolelog
    // console.log(`the ots to be inserted to email is:${otp}`) 

 // Create a nodemailer transporter using your email service credentials 
 const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: "hakishagbvsystem@gmail.com", pass: "itiu damm opwg yahv", }, }); 
 // Define the email message 
 const mailOptions = { 
  from: "hakishagbvsystem@gmail.com",
   to: email, 
   subject: subject,
    html: ` <p>Welcome to HAKISHA we are commited to give assistence to our visitors:</p>
     <p>${message}:${otp}</p> ` }; 

     
      try {
    // Send the email
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send email" };
  }
}


     // Function to generate a random activation token (you can use uuid or any other method) 
     function generateOTP() {
       try { const otpLength = 6; 
      // Length of the OTP
       const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Generates a 6-digit OTP
         console.log("Generated OTP:", otp); 
         return { success: true, otp: otp }; 
        } catch (error) 
        { console.error("Failed to generate OTP:", error); 
        return { success: false, otp: null }; } }
        
        
        module.exports = { sendEmail, generateOTP };