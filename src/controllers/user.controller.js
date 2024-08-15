import { asyncHandler } from "../utils/AsyncHandler";

const registerUser = asyncHandler(async (req, res)=>{
    const {fullName, email, username, password } = req.body
    // ------ TEST -----------
    // console.log("Full name, email, username, password", fullName, email, username, password )
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    

})

export {registerUser}