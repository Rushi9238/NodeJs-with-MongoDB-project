import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const resistorUser = asyncHandler(async (req, res) => {
  // Get user deatils from frontend
  const { userName, userEmail, userFullName, password } = req.body;

  // Validation - not empty
  if (
    [userName, userEmail, userFullName, password].some(
      (item) => item?.trim() === ""
    )
  ) {
    // below line is return response
    return res.status(400).json(new ApiError(401, "All fields are required"));

    // We can handel by custome error handel class
    // throw new ApiError(400, "All fields are required");
  }
  //   console.table([userName, userEmail, userFullName, password])

  // Check Email Validation ex. test@jas.com/in
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    //   throw new ApiError(400, "Invalid Email");
    return res.status(400).json(new ApiError(400, "Invalid Email"));
  }

  // check user already exists
  const checkexitedUser = await User.findOne({
    $or: [{ userName }, { userEmail }],
  });

  if (checkexitedUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
    // throw new ApiError(400, "User already exists");
  }

  // check for images, check for avatar image
  // 1st Check the image are coming or not
  let userAvatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.userAvatar) &&
    req.files.userAvatar.length > 0
  ) {
    userAvatarLocalPath = req.files.userAvatar[0].path;
  }
  if (!userAvatarLocalPath) {
    return res.ststus(400).json(new ApiError(400, "Avatar image is required"));
  }

  // 1st Check the image are coming or not
  let userCoverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.userCoverImage) &&
    req.files.userCoverImage.length > 0
  ) {
    userCoverImageLocalPath = req.files.userCoverImage[0].path;
  } else {
    userCoverImageLocalPath = "";
  }

  // upload then to cloudinary, avatar and cover Image
  const userAvatar = await uploadCloudinary(userAvatarLocalPath);
  const userCoverImage = await uploadCloudinary(userCoverImageLocalPath);

  // check once again the avatar image are upload or not on cludinary
  // console.log("userAvatar",userAvatar);
  if (!userAvatar) {
    return res.ststus(400).json(new ApiError(400, "Avatar image is required"));
  }

  //create user object-create entry in db
  const userDeatils = await User.create({
    userName: userName.toLowerCase(),
    userEmail,
    userFullName,
    password,
    userAvatar: userAvatar.url,
    userCoverImage: userCoverImage?.url || "",
  });

  // remove password and refresh token field from response
  const userCraete = await User.findById(userDeatils._id).select(
    "-password -refreshToken"
  );

  // check for user Data creation
  if (!userCraete) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Somethings went wrong while resistering the user")
      );
  }

  //return response
  return res
    .status(201)
    .json(new ApiResponse(200, userCraete, "User Resistered Successfully!"));
});

// Show Users List 
const sendAllUserList = asyncHandler(async (req, res) => {
  const userList = await User.find().select("-password -refreshToken");
  if (Array.isArray(userList)) {
    res.status(201).json(new ApiResponse(200, userList, "User List"));
  } else {
    throw new ApiError(
      500,
      "Somethings went wrong while fetching the user list"
    );
  }
});

export { resistorUser, sendAllUserList };
