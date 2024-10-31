const { Comment,Blog } = require('../models/index');


const addComment = async(req,res) => {
    const { blogId } = req.params;
    const { text } = req.body;

    try {
        // check if blog exists
        const blog = await Blog.findByPk(blogId);
        if(!blog){
            return res.status(404).json({ message: 'Blog not found'})
        }

        // create comment and associate it with the blog
        await Comment.create({
            text,
            blogId: blog.id
        })
        res.status(201).json({ message: "Comment added successfully"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const deleteComment = async(req,res) => {
    const { id } = req.params;
    try {
        const deletedComment = Comment.destroy({ where: { id: id}})
        if(!deletedComment){
            return res.status(404).json({ message: 'Comment not found'})
        }
        res.status(200).json({ message: 'Comment deleted successfully'})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    addComment,
    deleteComment
}