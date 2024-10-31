const router = require("express").Router();
const { getAllBlogs,addBlog,deleteBlog,getSingleBlog } = require("../controllers/blog-controller")


router.get('/blogs', getAllBlogs)
router.post('/blogs', addBlog)
router.get('/blogs/:id', getSingleBlog)
router.delete('/blogs/:id', deleteBlog)



module.exports = router;