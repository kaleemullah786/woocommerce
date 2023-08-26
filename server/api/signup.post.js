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
    let user = await User.findOne({$or:[{email:body.email},{key:body.key},{secret:body.secret}]})

    if (!user) {
        user = await new User(body).save()
        return user
    }
    else
        return false
})