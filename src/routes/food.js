'use strict';

const express = require('express');
const router = express.Router();
// const foodModel = require('../models/food');
const Collection = require('../models/data-collection-class');
const food = new Collection('food');

router.get('/', getFood);
router.get('/:id', getFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

async function getFood(req, res, next) {
  try {
    const id = req.params.id;
    const foods = await food.read(id);
    res.json({ foods:foods.rows});
  } catch (e) {
    next(e)
  }
}

async function createFood(req, res, next) {
  try {
    const data = req.body;
    const newFood = await food.create(data);
    res.json(newFood.rows[0]);
  } catch (e) {
    next(e);
  }
}

async function updateFood(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newFood = await food.update(id, data);
    res.json(newFood.rows[0]);
  } catch (e) {
    next(e);
  }
}
async function deleteFood(req, res, next) {
    try {
      const id = req.params.id;
      const deleteFood = await food.delete(id);
      res.json(deleteFood.rows[0]);
    } catch (e) {
      next(e);
    }
}
module.exports = router;