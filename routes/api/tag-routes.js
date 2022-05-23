const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include:[{
      model:Product
    }]
  })
  .then(dbTags => {
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id,{
    include:[{model:Product}]
  })
  .then(dbTag => {
    if(!dbTag){
      res.status(404).json({ message: 'No driver found with that id!' });
        return;
    } else{
    res.json(dbTag);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTag => {
    res.json(newTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then(updateTag => {
    if(!updateTag){
      res.status(404).json({ message: 'No driver found with that id!' });
        return;
    } else{
    res.json(updateTag);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(delTag => {
    if(!delTag){
      res.status(404).json({ message: 'No driver found with that id!' });
        return;
    } else{
    res.json(delTag);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  })
});

module.exports = router;