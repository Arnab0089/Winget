import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
  name: String,
  id: String,
  version: String,
});

const appListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  apps: [appSchema],
  filename: String,
  rawFile: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const AppList = mongoose.model('AppList', appListSchema);
export default AppList;
