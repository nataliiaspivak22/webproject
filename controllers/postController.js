const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.render('posts', { posts });
};

exports.addPost = async (req, res) => {
    const { title, description, author } = req.body;
    await Post.create({ title, description, author });
    res.redirect('/posts');
};

exports.editPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit-post', { post });
};

exports.updatePost = async (req, res) => {
    const { title, description, author } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, description, author });
    res.redirect('/posts');
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
};
