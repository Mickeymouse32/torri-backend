const USER = require("../models/user");
const bcrypt = require("bcryptjs");

const handleRegister = async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  try {
    //check if user exists  (email and phoneNumber)
    const existtingUser = await USER.findOne({
      $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    });
    if (existtingUser) {
      return res
        .status(400)
        .json({ message: "Email or Phone number already exsits" });
    }
    //protect users password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //verify process
    //save to db
    const user = await USER.create({
      fullName,
      email,
      password,
      role: role || "tenant",
      phoneNumber,
    });
    return res
      .status(201)
      .json({ sucess: true, message: "User Registerd Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleRegister };
