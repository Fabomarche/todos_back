import dotenv from 'dotenv'
dotenv.config()

export default{
    mongo:{
        url: process.env.MONGODB_URL
    }
}
