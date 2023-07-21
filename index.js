
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const fs = require('fs')
const Image = require('./schemas/imageSchema')
const Category = require('./schemas/categorySchema')
const cors = require('cors')

const imageRoute = require('./routes/imageRoute')

const serviceAccount = require('./dikshant-studio-firebase-adminsdk-46h9u-ec70ef00b6.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dikshant-studio.firebaseio.com',
  storageBucket: 'dikshant-studio.appspot.com',
});

const app = express();
app.use(cors());
app.use(express.json())
const port = 5000;

app.use('/api/image', imageRoute);


// MongoDB setup and connection
mongoose.connect('mongodb+srv://prateekpranveer:root@dikshant-c.hsvetcj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Set up multer storage to store the images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


app.post('/upload/:catid', upload.single('image'), async (req, res) => {
  try {
    const { filename, size } = req.file;
    const {catid} = req.params;
    const imageUrl = await uploadImageToFirebaseStorage(req.file); // Implement this function to upload image to Firebase
    const category = await Category.findOne({catId: catid});
    const image = new Image({ fileName:filename, fileUrl: imageUrl, size, fileCat: category._id});
    await image.save();
    res.json({ success: true, message: 'Image uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload image.' });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

server.keepAliveTimeout = 120*1000;
server.headersTimeout = 12*1000;



async function uploadImageToFirebaseStorage(file) {
  try {
    const bucket = admin.storage().bucket();
    const storageFileName = Date.now() + '-' + file.originalname;
    const options = {
      destination: storageFileName,
    };
    await bucket.upload(file.path, options);

    // Get the public URL of the uploaded image
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      storageFileName
    )}?alt=media`;

    // Remove the temporary image file after uploading to Firebase
    fs.unlinkSync(file.path);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
}


// 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


// pd, ct, st, wd, bd, bw, pt, fn

