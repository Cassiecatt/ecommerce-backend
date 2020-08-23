const router = require('express').Router();
const { Category, Product } = require('../../models');
// const { regexp } = require('sequelize/types/lib/operators');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  // be sure to include its associated Products
  include: [
    Product
  ],
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [
      Product
    ],
  })
  .then((categories) => {
    if(!categories) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((categories) => res.json(categories))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id
    }
  })
  .then((categories) => {
    if(!categories) {
      res.status(404).json({ message: "No category found with this id"});
      return;
    }
    res.json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((categories) => {
    if(!categories) {
      res.status(404).json({ message: "No category found with this id"});
      return;
    }
    res.json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
