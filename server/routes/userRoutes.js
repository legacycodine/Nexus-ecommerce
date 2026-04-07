// This checks the DB for the email and compares the hashed password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // This is your JWT
    });
  } else {
    // If the password is wrong, we send this error!
    res.status(401).json({ message: 'Invalid email or password' });
  }
});