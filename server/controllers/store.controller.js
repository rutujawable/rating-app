import Store from '../models/Store.js';

export const addStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rateStore = async (req, res) => {
  try {
    const { storeId, userId, rating } = req.body;
    const store = await Store.findById(storeId);
    const existing = store.ratings.find(r => r.userId.toString() === userId);
    if (existing) existing.rating = rating;
    else store.ratings.push({ userId, rating });
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

