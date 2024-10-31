const { Blog,Comment } = require('../models/index');


const getAllBlogs = async(req,res) => {
    try {
        const blogs = await Blog.findAll({
            include: [{ model: Comment, as: "comments"}]
        });
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const addBlog = async(req,res) => {
    try {
        await Blog.create(req.body);
        res.status(201).json({message: 'Blog added successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const updateBlog = async(req,res) => {
    const { id } = req.params
    try {
        const updatedBlog = await Blog.update(req.body, {
            where:{ id: id}
        })
        if(!updatedBlog){
        return res.status(404).json({message: 'Blog not found'})
        }
        res.status(200).json({ message: 'Blog updated successfully.'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getSingleBlog = async(req,res) => {
    const { id } = req.params
    try {
        const blog = await Blog.findByPk(id, {
            include: [{ model: Comment, as: "comments" }] // Include comments here
        });
        if(!blog){
        return res.status(404).json({message: 'Blog not found'})
        }
        res.json(blog)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const deleteBlog = async(req,res) => {
    const { id } = req.params
    try {
        const deletedBlog = await Blog.destroy({ where:{ id: id}});
        if(!deletedBlog){
        res.status(404).json({message: 'Blog not found'})
        }
        res.status(200).json({message: 'Blog deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}


module.exports = {
    getAllBlogs,
    addBlog,
    deleteBlog,
    getSingleBlog,
    updateBlog
}