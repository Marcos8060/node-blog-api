const router = require("express").Router();
const { getAllBlogs,addBlog,deleteBlog,getSingleBlog, updateBlog } = require("../controllers/blog-controller")
const { addComment } = require("../controllers/comment-controller")


router.get('/blogs', getAllBlogs)
router.post('/blogs', addBlog)
router.get('/blogs/:id', getSingleBlog)
router.delete('/blogs/:id', deleteBlog)
router.put('/blogs/:id', updateBlog)


// comment routes 
router.post('/add-comment/:blogId', addComment)


module.exports = router;