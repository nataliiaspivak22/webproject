const Post = require('./models/Post');

require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });


const postRoutes = require('./routes/postRoutes');
app.use('/', postRoutes);

app.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); 
        res.render('index', { title: 'Home', posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching posts');
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('posts', { title: 'My blog' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching posts');
    }
});


  app.get('/add-post', (req, res) => {
    res.render('add-post', { title: 'Add new post' });
  });
  
  app.post('/add-post', async (req, res) => {
    try {
      const newPost = new Post({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
      });
      await newPost.save();
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving post');
    }
  });
  
  app.get('/edit-post/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render('edit-post', { post, title: 'Update post' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching post');
    }
  });
  
  app.put('/edit-post/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
      });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating post');
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send('Post deleted');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting post');
    }
  });
  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
