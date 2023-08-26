import User from "../../utils/models/users";
import mongoose from 'mongoose';
const URI = process.env.MONGODB_URI
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    mongoose.connect(URI).then(() => {
        console.log('connected to db')
    }).catch((err) => {
        console.log(err)
    })
    const user = await User.findOne(body)

    if (user)
        return user 
    else
        return false
})
