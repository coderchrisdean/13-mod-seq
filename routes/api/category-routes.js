const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  router.get("/api/categories", async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/:id", (req, res) => {
    // find one category by its `id` value

    router.get("/api/categories/:id", async (req, res) => {
      try {
        const categoryData = await Category.findByPk(req.params.id, {
          include: [{ model: Product }],
        });

        if (!categoryData) {
          res.status(404).json({ message: "No category found with this id." });
          return;
        }

        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  });

  router.post("/", (req, res) => {
    // create a new category
    Product.create(req.body)
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  router.put("/:id", (req, res) => {
    // update a category by its `id` value
    router.put("/api/categories/:id", async (req, res) => {
      try {
        const categoryData = await Category.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        if (!categoryData) {
          res.status(404).json({ message: "No category found with this id." });
          return;
        }
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  });

  router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
Product.destroy({
  where: {
    id: req.params.id,
  },
})
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
    });
  });
});
module.exports = router;
