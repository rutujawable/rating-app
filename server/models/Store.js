import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 }
});

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, maxlength: 400 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [ratingSchema]
}, { timestamps: true });

export default mongoose.model('Store', storeSchema);