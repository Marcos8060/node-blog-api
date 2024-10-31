const { Comment,Blog } = require('../models/index');


const addComment = async(req,res) => {
    const { blogId } = req.params;
    const { text } = req.body;

    try {
        // check if blog exists
        const blog = await Blog.findByPk(blogId);
        if(!blog){
            res.status(404).json({ message: 'Blog not found'})
        }

        // create comment and associate it with the blog
        await Comment.create({
            text,
            blogId: blog.id
        })
        res.status(201).json({ message: "Comment added successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    addComment
}