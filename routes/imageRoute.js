const express = require('express');
const Image = require('../schemas/imageSchema')
const Category = require('../schemas/categorySchema')

const router = express.Router();

router.get('/allImages', async (req, res) => {
    try {
        const allImage = await Image.find();
        res.status(200).json(allImage)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/create-cat', async (req, res) => {
    const { categoryName, categoryId } = req.body;
    const previousCat = await Category.findOne({ catName: categoryName });
    if (previousCat) {
      return res.status(400).send('Category Already Exists');
    }
  
    const newCat = new Category({
      catName: categoryName,
      catId: categoryId,
    });
  
    await newCat.save();
    res.status(200).send('Category Created Successfully');
  });


  router.get('/getallcat', async (req, res) => {
    const Cat = await Category.find();
    res.send(Cat)
  });

  router.get('/getallimg/:catid', async (req, res) => {
    try {
      const categoryId = req.params.catid;
      const category = await Category.findOne({catId: categoryId})
      // Find all images that belong to the specified category
      const images = await Image.find({ fileCat: category._id });
  
      if (!images || images.length === 0) {
        return res.status(404).json({ message: 'No images found for the specified category.' });
      }
  
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.get('/getallimg/', async (req, res) => {
    try {
      const images = await Image.find();
  
      if (!images || images.length === 0) {
        return res.status(404).json({ message: 'No images found for the specified category.' });
      }
  
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = router