import { app } from "./app.js";
import 'dotenv/config'

// dotenv.config({
//     path: './env'
// })

app.listen(process.env.PORT||5000, ()=>{
    console.log(`server running at ${process.env.PORT||5000}`)
})
