const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const SECRET = 'secret_key';
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, // Allow credentials
  };
  app.options('/api/register', cors(corsOptions)); // Handle preflight requests for /api/register

app.use(cors(corsOptions));

//Connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/cocktailDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});



//MONGOOSE SCHEMA
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      // unique: true
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
    password: {
      type: String,
    },
    rePassword: {
      type: String,
    },
    createdCocktails: [{
      type: mongoose.Types.ObjectId,
      ref: 'Cocktail',
    }],
    likedCocktails: [{
      type: mongoose.Types.ObjectId,
      ref: 'Cocktail',
    }]
  
  });
  const User = mongoose.model('User', userSchema);

  const cocktailSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    imageURL: {
      type: String,
      required: true,
    },
    likedByUser: [{
      type: Boolean
    }],
    likes: {
      type: Number,
      default: 0,
    },

});
const Cocktail = mongoose.model('Cocktail', cocktailSchema);



// //AUTHENTICATION MIDDLEWARE
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

// Profile
app.get('/api/profile', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//EDIT PROFILE
// app.put('/api/profile', (req, res, next) => {
//   const { _id: userId } = req.userId;
//   const { tel, username, email } = req.body;

//   User.findOneAndUpdate({ _id: userId }, { tel, username, email }, { runValidators: true, new: true })
//       .then(x => { res.status(200).json(x) })
//       .catch(next);
//     })
// Update Profile endpoint
app.put("/api/profile", async (req, res) => {
  try {
    const { newUsername } = req.body;
    const userId = req.userId; // Change to req.userId to use the correct user ID
    console.log(userId);
    const user = await User.findById(userId); // Find user by ID instead of username
    if (!user) {
      console.log(user);
      return res.status(404).json({ message: "User not found" });
    }
    if (newUsername) user.username = newUsername;
    await user.save();
    res.json({
      username: user.username,

      // Include any other relevant fields from the user schema
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Routes for Cocktails
app.get('/api/cocktails', async (req, res) => {
  try {
      const cocktails = await Cocktail.find();
      res.json(cocktails);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
//Post
app.post('/api/cocktails', async (req, res) => {
  try {
      const cocktail = await Cocktail.create(req.body);
      res.json(cocktail);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
// get by id
app.get('/api/cocktails/:id', async (req, res) => {
  try {
      const cocktail = await Cocktail.findById(req.params.id);
      res.json(cocktail);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}
);
//update
app.put('/api/cocktails/:id', async (req, res) => {
  try {
      const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(cocktail);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
//delete
app.delete('/api/cocktails/:id', async (req, res) => {
  try {
      const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
      res.json(cocktail);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
// Update Cocktail Route
app.put('/api/cocktails/:id/like', async (req, res) => {
  const { id } = req.params;
  const { likedByUser } = req.body;
  // console.log(req.params);

  try {
    // Find the cocktail by ID
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }

    // Update the likedByUser property
    cocktail.likes.push(likedByUser);
    
    // Save the updated cocktail
    await cocktail.save();
console.log('ok');
    res.status(200).json({ message: 'Cocktail updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
