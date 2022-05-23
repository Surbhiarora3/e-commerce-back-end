const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:[Product]
  })
  .then(dbCategory => {
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id,{
    include:[Product]
  })
  .then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No driver found with that id!' });
      return;
    } else {
    res.json(dbCategory);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body,{
    include:[Product]
  })
  .then(newCategory => {
 
    res.json(newCategory);

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{ 
      id:req.params.id
    }
  })
  .then(updateCategory => {
    if (!updateCategory) {
      res.status(404).json({ message: 'No driver found with that id!' });
      return;
    } else {
    res.json(updateCategory);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id,
    }
    })
  .then(delCategory => {
    if (!delCategory) {
      res.status(404).json({ message: 'No driver found with that id!' });
      return;
    } else {
    res.json(delCategory);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;