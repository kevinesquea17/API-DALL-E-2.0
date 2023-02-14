import express from 'express';
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import Post from '../models/Post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const {name, prompt, photo} = req.body;

    try {
        const photoUrl = await cloudinary.uploader.upload(photo);
        const post = new Post({
            name,
            prompt,
            photo: photoUrl.url
        })
        const postSaved = await post.save();
        return res.status(200).json(postSaved);
    } catch (error) {
        console.log(error);
    }
})

export default router;