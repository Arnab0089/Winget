import express from 'express';
import multer from 'multer';
import AppListModel from '../models/appList.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let fileContent = req.file.buffer.toString('utf-8');

    // 🔧 Strip BOM if it exists
    if (fileContent.charCodeAt(0) === 0xfeff) {
      fileContent = fileContent.slice(1);
    }

    let parsed;
    try {
      parsed = JSON.parse(fileContent);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON format' });
    }

    const packages = parsed?.Sources?.[0]?.Packages;
    if (!Array.isArray(packages)) {
      return res.status(400).json({
        message: 'Invalid file structure: missing Sources[0].Packages array',
      });
    }

    const apps = packages.map((pkg) => ({
      name: pkg.Name || 'Unknown',
      id: pkg.PackageIdentifier || 'Unknown',
      version: pkg.Version || '',
      available: '', // no available version field in this format
    }));

    // ✅ Optionally save to MongoDB
    const saved = new AppListModel({
      user: req.user.id,
      apps,
      filename: req.file.originalname,
      rawFile: fileContent, // Store the entire JSON content as a string
    });

    await saved.save();

    return res.status(200).json({
      message: 'File uploaded and parsed successfully',
      apps,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
});

// routes/appLists.js
router.get('/myapps', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id; // Support both
    console.log('Fetching apps for user ID:', userId);

    const appLists = await AppListModel.find({ user: userId }).sort({
      uploadDate: -1,
    });

    res.json(appLists);
  } catch (err) {
    console.error('Error fetching apps:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/rawFile/:id', verifyToken, async (req, res) => {
  try {
    const appList = await AppListModel.findById(req.params.id);
    if (!appList) {
      return res.status(404).json({ message: 'App list not found' });
    }
    res.json({
      rawFile: appList.rawFile,
      filename: appList.filename,
    });
  } catch (err) {
    console.error('Error fetching raw file:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const appList = await AppListModel.findById(req.params.id);
    if (!appList) {
      return res.status(404).json({ message: 'App list not found' });
    }
    res.json(appList);
  } catch (err) {
    console.error('Error fetching app list:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
