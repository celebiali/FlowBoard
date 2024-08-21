
const PostSchema = require('../models/post.js');

const createPosts = async (req, res) => {
    try {
        const newPost = await PostSchema.create(req.body);
        res.status(201).json({ status: "OK", message: 'Post created successfully!', newPost });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const getPosts = await PostSchema.find();
        res.status(200).json({ 
            getPosts
        });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const getDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const detailPost = await PostSchema.findById(id);
        res.status(200).json({ detailPost });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const getUpdate = async (req, res) => {
    try {
        const {id} = req.params;
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body)
        res.status(200).json({ updatePost });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        await PostSchema.findByIdAndDelete(id);
        res.status(200).json({
            message: "Silme işleminiz başarılı"
         });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { createPosts, getPosts, getDetail, getUpdate, deletePost };   