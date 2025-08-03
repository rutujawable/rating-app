import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Store from '../models/Store.js';

export const signup = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, address, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully  to application' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const signupAndCreateStore = async (req, res) => {
  try {
    const { name, email, address, password, storeName, storeAddress } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with role: 'owner'
    const newUser = new User({
      name,
      email,
      address,
      password: hashedPassword,
      role: 'owner'
    });

    const savedUser = await newUser.save();

    // Check if store already exists for this owner
    const existingStore = await Store.findOne({ ownerId: savedUser._id });
    if (existingStore) return res.status(400).json({ error: 'Store already exists for this owner' });

    // Create the store
    const newStore = new Store({
      name: storeName,
      email,
      address: storeAddress,
      ownerId: savedUser._id
    });

    await newStore.save();

    res.status(201).json({
      message: 'Owner and store created successfully',
      user: savedUser,
      store: newStore
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};