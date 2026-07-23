import { demoProducts } from "../data/demoData";

const KEY = "wareflow-demo-products";

export const initializeDemo = () => {
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(
      KEY,
      JSON.stringify(demoProducts)
    );
  }
};

export const getProducts = () => {
  initializeDemo();

  return JSON.parse(
    localStorage.getItem(KEY)
  );
};

export const saveProducts = (products) => {
  localStorage.setItem(
    KEY,
    JSON.stringify(products)
  );
};
export const addProduct = (product) => {

  const products = getProducts();

  products.unshift({

    ...product,

    _id: Date.now().toString(),

    sku: "SKU-" + Math.floor(Math.random() * 100000),

    lowStockThreshold: 10,

    image:
      product.image ||
      "https://via.placeholder.com/150"

  });

  saveProducts(products);

};

export const updateProduct = (id, data) => {
  const products = getProducts();

  const updated = products.map((p) =>
    p._id === id ? { ...p, ...data } : p
  );

  saveProducts(updated);
};

export const deleteProduct = (id) => {
  const products = getProducts();

  saveProducts(
    products.filter(
      (p) => p._id !== id
    )
  );
};

export const restockProduct = (
  id,
  amount
) => {
  const products = getProducts();

  const updated = products.map((p) => {
    if (p._id !== id) return p;

    return {
      ...p,
      quantity:
        Number(p.quantity) +
        Number(amount)
    };
  });

  saveProducts(updated);
};
export const getOrders = () => {
  return JSON.parse(
    localStorage.getItem("demoOrders")
  ) || [];
};

export const saveOrders = (orders) => {
  localStorage.setItem(
    "demoOrders",
    JSON.stringify(orders)
  );
};
export const getActivities = () => {
  return JSON.parse(
    localStorage.getItem("demoActivities")
  ) || [];
};

export const saveActivities = (activities) => {
  localStorage.setItem(
    "demoActivities",
    JSON.stringify(activities)
  );
};