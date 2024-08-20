const { UserOTP } = require("../models");

const handleOtp = async (userId, otp) => {
  try {
    const existingOTP = await UserOTP.findOne({ where: { User_Id: userId } });
    if (existingOTP) {
      return { success: false, status: 400, message: "An OTP already exists for this user" };
    }

    await UserOTP.create({
      User_Id: userId,
      otp: otp,
    });

    return { success: true, message: "OTP successfully added" };
  } catch (error) {
    console.error("Error handling OTP:", error);
    return { success: false, status: 500, message: "Failed to handle OTP" };
  }
};

module.exports = { handleOtp };
