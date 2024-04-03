// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
// app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
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


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cocktailDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

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
  }

});

const User = mongoose.model('User', userSchema);

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  console.log(hash);
  next();
});

const cocktailSchema = new mongoose.Schema({
    id: String,
    name: String,
    ingredients: String,
    instructions: String,
    userId: String,
    imageURL: String,
    likedBy: [String],
    likes: Number,

});


const Cocktail = mongoose.model('Cocktail', cocktailSchema);


// Register Route
// app.post('/api/register', async (req, res) => {
//   try {
//     const { username, email, tel, password } = req.body;
//     // Hash password
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, tel, password: hashedPassword });
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, tel, password, rePassword } = req.body;
    if (password !== rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = new User({ username, email, tel, password, rePassword });
    await user.save();
    // const token = jwt.sign({userId: user.id, token: 'secter_key'});
    // res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login Route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error('User not found');
//     }
//     // Compare hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new Error('Invalid password');
//     }
//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'secret_key');
//     res.cookie('jwt', token, { httpOnly: true });
//     res.json({ message: 'Login successful', user });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.cookie("token", token, { httpOnly: true, sameSite: 'none'});
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Logout Route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
