import mongoose from 'mongoose';


const urlSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    }, 
    oriUrl: {
        type: String,
        required: true,
        unique: true
    }
}, {timeStamp: true})

const Url = mongoose.models.urls || mongoose.model("urls", urlSchema)


export default Url;