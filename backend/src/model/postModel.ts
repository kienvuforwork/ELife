import mongoose from "mongoose";


const PostSchema =new mongoose.Schema({
    type: {
        type: String,
        enum: ['tvShow', 'track'],
    },
    isCeleb: {
        type: Boolean,
      },
    username: {
        type: String,
        required: true,
      },
    avatar:{type:String},
    customDate: {
        type: Date,
        default: Date.now,
      },
      track:{
        name:{type:String},
        artists: { type: [{type:String}] },
        image: String,
        releaseDate: String,
        vibes: {type:[String]},
        like: Boolean,
      },
       tvShow: {
        name:{type:String},
        poster_path: String,
        backdrop_path:String,
        genre: [{type:String}],
        origin_country: String,
        recommend: Boolean,
        vibes: [{type:String}]
       },
})


const Post = mongoose.model("Post", PostSchema)
module.exports = Post
