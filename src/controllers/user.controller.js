import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const generateAccessAndRefereshTokens = async(user) =>{
    try {    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}
        // ------ TEST ----------
        // console.log("1", user.generateAccessToken)
        // console.log("2")
        // console.log("3")
        // console.log("4")
        // console.log("5")

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



const registerUser = asyncHandler(async (req, res)=>{
    console.log("user req body", req.body)
    const {fullName, email, username, password } = req.body
    // ------ TEST --------
    console.log("Full name, email, username, password", fullName, email, username, password )
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        console.log("Reached here in error")
        throw new ApiError(400, "All fields are required")
    }
    console.log("Reached here after error")
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log("Reached here after findone")

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const user = await User.create(
        {
            fullName,
            email,
            password,
            username
        }
    )
    console.log('This is user', user)
    return res.status(200).json(new ApiResponse(200, "User registerd successfully", {}))

})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    if (!password || !email) {
        throw new ApiError(400, "username or email is required")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
        }
    
        const user2 = await User.findById(user._id)
        // console.log(object)  
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user)  
    
    const loggedInUser = await User.findById(user)
    console.log("logged in user", loggedInUser)

})

export {registerUser, loginUser}