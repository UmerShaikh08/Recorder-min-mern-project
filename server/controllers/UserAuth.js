import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import { config } from "dotenv";

const UserAuth = async (req, res) => {
  try {
    config({ path: ".env" });
    const { name, email } = req.body;

    // validate data
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    // get user data
    const checkUser = await User.findOne({ email });

    // add date in payload
    const payload = {
      name: name,
      email: email,
    };

    // create token of payload data
    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    // expire data
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // check user already regsiter or not
    let newUser;
    let updateUser;
    if (!checkUser) {
      // new user
      newUser = await User.create({ name, email, token });
    } else {
      // old user
      updateUser = await User.findOneAndUpdate(
        { email },
        { token },
        { new: true }
      );
    }

    console.log("newUse ---> ", newUser);
    console.log("updateUser ---> ", updateUser);

    // check data
    if (!newUser && !updateUser) {
      return res.status(401).json({
        success: false,
        massage: "error occured while creating or updating user",
      });
    }

    // add user details
    const user = updateUser ? updateUser : newUser;

    // set token in cookie and send response
    return res.cookie("token", token, options).status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "somthing went wrong please try again later ",
    });
  }
};

export const UserDetails = async (req, res) => {
  try {
    config({ path: ".env" });
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    // validate token
    if (!token) {
      return res.status(400).json({
        success: false,
        massage: "token not found",
      });
    }

    // get user data
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        massage: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      massage: "user data",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "somthing went wrong please try again later ",
    });
  }
};

export default UserAuth;
