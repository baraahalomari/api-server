'use strict';

const express = require('express');
const router = express.Router();
const clothesModel = require('../models/clothes');
const Collection = require('../models/data-collection-class');
const clothes = new Collection(clothesModel);

router.get('/', getClothes);
router.get('/:id', getClothes);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

async function getClothes(req,res,next){
  try{
    const id = req.params.id;
    const clothess = await clothes.read(id);
    res.json({clothess});
  }catch(e){
    next(e)
  }
}

async function createClothes (req,res,next){
  try{
    const data = req.body;
    const newClothes = await clothes.create(data);
    res.json(newClothes);
  }catch(e){
    next(e);
  }
}

async function updateClothes(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newClothes = await clothes.update(id, data);
    res.json(newClothes);
  } catch (e) {
    next(e);
  }
}
async function deleteClothes(req, res, next) {
    try {
      const id = req.params.id;
      const deleteClothes = await clothes.delete(id);
      res.json(deleteClothes);
    } catch (e) {
      next(e);
    }
}
module.exports = router;