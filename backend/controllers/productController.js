import Product from "../models/Product.js";
import ActivityLog
from "../models/ActivityLog.js";

export const createProduct = async (
  req,
  res
) => {
    console.log(req.body);
  try {

    const {
      name,
      category,
      quantity,
      price,
      supplier,
      warehouse,
      image
    } = req.body;

    const sku =
      "SKU-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const product =
      await Product.create({
        name,
        category,
        quantity,
        price,
        supplier,
        warehouse,
        image,
        sku
      });
      await ActivityLog.create({
  action:
    `Added ${name}`,
  performedBy:
    req.user.role
});

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};
export const updateProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );
      await ActivityLog.create({
  action:
    `Updated ${updatedProduct.name}`,
  performedBy:
    req.user.role
});

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.deleteOne();
    await ActivityLog.create({
  action:
    `Deleted ${product.name}`,
  performedBy:
    req.user.role
});

    res.json({
      message:
        "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getLowStockProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find();

      const lowStock =
        products.filter(
          (product) =>
            product.quantity <
            product.lowStockThreshold
        );

      res.json(lowStock);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};

export const searchProducts =
  async (req, res) => {

    try {

      const {
        keyword = "",
        page = 1,
        limit = 5
      } = req.query;

      const query = {
        $or: [
          {
            name: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            category: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            sku: {
              $regex: keyword,
              $options: "i"
            }
          }
        ]
      };
      

      const products =
        await Product.find(query)
          .skip((page - 1) * limit)
          .limit(Number(limit));

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};
export const transferStock = async (req, res) => { try { const { productId, fromWarehouse, toWarehouse, quantity } = req.body; const qty = Number(quantity); const sourceProduct = await Product.findOne({ _id: productId, warehouse: fromWarehouse }); if ( !sourceProduct ) { return res.status(404).json({ message: "Product not found in source warehouse" }); } if ( sourceProduct.quantity < qty ) { return res.status(400).json({ message: "Insufficient stock" }); } sourceProduct.quantity -= qty; await sourceProduct.save(); let targetProduct = await Product.findOne({ name: sourceProduct.name, warehouse: toWarehouse }); if ( targetProduct ) { targetProduct.quantity += qty; await targetProduct.save(); } else { targetProduct = await Product.create({ name: sourceProduct.name, category: sourceProduct.category, quantity: qty, price: sourceProduct.price, supplier: sourceProduct.supplier, warehouse: toWarehouse, sku: sourceProduct.sku }); } await ActivityLog.create({ action: `Transferred ${sourceProduct.name} (${qty}) from ${fromWarehouse} to ${toWarehouse}`, performedBy: req.user.role }); res.json({ message: "Stock transferred successfully" }); } catch (error) { res.status(500).json({ message: error.message }); } };