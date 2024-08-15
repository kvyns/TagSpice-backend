import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

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

export {registerUser}