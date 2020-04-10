var bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});
var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
// 	title: 'Test Blog',
// 	image: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
// 	body: 'HELLO THIS IS A BLOG POST!'
// });

// RESTFUL ROUTES

app.get('/', function(req, res) {
	res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log('Error!');
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

app.listen(3000, function() {
	console.log('SERVER IS RUNNING');
});
