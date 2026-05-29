
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import jsPDF
from "jspdf";

import autoTable
from "jspdf-autotable";

export default function Inventory() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");
    const [suggestions,
  setSuggestions] =
  useState([]);

  const [categoryFilter,
    setCategoryFilter] =
    useState("");

  const [warehouseFilter,
    setWarehouseFilter] =
    useState("");

  const [lowStockOnly,
    setLowStockOnly] =
    useState(false);
    const [sortBy,
  setSortBy] =
  useState("");

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const productsPerPage =
    5;

  const [formData,
    setFormData] =
    useState({
      name: "",
      category: "",
      quantity: "",
      price: "",
      supplier: "",
      warehouse: "",
      image: ""
    });

  const [editingId,
    setEditingId] =
    useState(null);
    const [selectedProduct,
setSelectedProduct]
=
useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const token =
    localStorage.getItem(
      "token"
    );

  
const filteredProducts =
  products
    .filter(
      (product) => {

        const searchText =
          search.toLowerCase();

        const matchesSearch =
          product.name
            ?.toLowerCase()
            .includes(
              searchText
            ) ||
          product.category
            ?.toLowerCase()
            .includes(
              searchText
            );

        const matchesCategory =
          categoryFilter === "" ||
          product.category ===
            categoryFilter;

        const matchesWarehouse =
          warehouseFilter === "" ||
          product.warehouse ===
            warehouseFilter;

        const matchesLowStock =
          !lowStockOnly ||
          product.quantity <
            product.lowStockThreshold;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesWarehouse &&
          matchesLowStock
        );
      }
    )
    .sort((a, b) => {

      if (
        sortBy ===
        "priceHigh"
      ) {
        return (
          b.price -
          a.price
        );
      }

      if (
        sortBy ===
        "priceLow"
      ) {
        return (
          a.price -
          b.price
        );
      }

      if (
        sortBy ===
        "qtyHigh"
      ) {
        return (
          b.quantity -
          a.quantity
        );
      }

      if (
        sortBy ===
        "qtyLow"
      ) {
        return (
          a.quantity -
          b.quantity
        );
      }

      if (
        sortBy ===
        "name"
      ) {
        return a.name.localeCompare(
          b.name
        );
      }

      return 0;
    });



  const indexOfLastProduct =
    currentPage *
    productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  const totalPages =
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    );
    const totalProducts =
  products.length;

const lowStockProducts =
  products.filter(
    (product) =>
      product.quantity <
      product.lowStockThreshold
  ).length;

const totalWarehouses =
  new Set(
    products.map(
      (p) =>
        p.warehouse
    )
  ).size;

const totalValue =
  products.reduce(
    (sum, product) =>
      sum +
      (
        product.price *
        product.quantity
      ),
    0
  );
  const categoryMap =
  {};

products.forEach(
  (product) => {

    categoryMap[
      product.category
    ] =
      (
        categoryMap[
          product.category
        ] || 0
      ) + 1;
  }
);

const categoryChart =
  Object.keys(
    categoryMap
  ).map((key) => ({
    category: key,
    count:
      categoryMap[key]
  }));

const warehouseMap =
  {};

products.forEach(
  (product) => {

    warehouseMap[
      product.warehouse
    ] =
      (
        warehouseMap[
          product.warehouse
        ] || 0
      ) + 1;
  }
);

const warehouseChart =
  Object.keys(
    warehouseMap
  ).map((key) => ({
    name: key,
    value:
      warehouseMap[key]
  }));

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(
            "http://localhost:5000/api/products",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setProducts(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

useEffect(() => {

  if (
    search.trim() === ""
  ) {

    setSuggestions(
      []
    );

    return;
  }

  const filtered =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  setSuggestions(
    filtered.slice(
      0,
      5
    )
  );

}, [
  search,
  products
]);


  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const addProduct =
    async (e) => {

      e.preventDefault();

      if (
        !formData.name ||
        !formData.category ||
        !formData.quantity ||
        !formData.price ||
        !formData.supplier ||
        !formData.warehouse
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      try {

        if (editingId) {

          await axios.put(
            `http://localhost:5000/api/products/${editingId}`,
            {
              ...formData,
              quantity:
                Number(
                  formData.quantity
                ),
              price:
                Number(
                  formData.price
                )
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

          toast.success(
            "Product Updated"
          );

        } else {

          await axios.post(
            "http://localhost:5000/api/products",
            {
              ...formData,
              quantity:
                Number(
                  formData.quantity
                ),
              price:
                Number(
                  formData.price
                )
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

          toast.success(
            "Product Added"
          );
        }

        fetchProducts();

        setFormData({
          name: "",
          category: "",
          quantity: "",
          price: "",
          supplier: "",
          warehouse: "",
          image: ""
        });

        setEditingId(
          null
        );

      } catch (error) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Failed"
        );

        console.log(error);
      }
    };

  const deleteProduct =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Product Deleted"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);
      }
    };

const restockProduct =
  async (product) => {

    const amount =
      prompt(
        "Enter stock quantity"
      );

    if (
      !amount ||
      isNaN(amount)
    ) {
      return;
    }

    try {

      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        {
          quantity:
            Number(
              product.quantity
            ) +
            Number(
              amount
            )
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Stock Updated"
      );

      fetchProducts();

    } catch (error) {

      toast.error(
        "Restock Failed"
      );

      console.log(error);
    }
};

const exportPDF =
() => {

const doc =
new jsPDF();

doc.setFontSize(
20
);

doc.text(
"WAREFLOW INVENTORY REPORT",
20,
20
);

doc.setFontSize(
12
);

doc.text(
`Generated: ${
new Date()
.toLocaleString()
}`,
20,
30
);

doc.text(
`Total Products: ${
products.length
}`,
20,
40
);

doc.text(
`Low Stock: ${
products.filter(
(product) =>
product.quantity <
product.lowStockThreshold
).length
}`,
20,
50
);

doc.text(
`Inventory Value: ₹${products.reduce(
(sum, product) =>
sum +
(
product.price *
product.quantity
),
0
)}`,
20,
60
);

autoTable(
doc,
{
startY: 75,

head: [[
"Name",
"Category",
"Qty",
"Price",
"Warehouse",
"Status"
]],

body:
products.map(
(product) => [

product.name,

product.category,

product.quantity,

`₹${product.price}`,

product.warehouse,

product.quantity <
product.lowStockThreshold
? "Low Stock"
: "Healthy"
]
)
}
);

doc.save(
"wareflow-report.pdf"
);

toast.success(
"PDF Exported"
);
};

  const exportCSV =
    () => {

      const csv =
        Papa.unparse(
          products
        );

      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;"
          }
        );

      saveAs(
        blob,
        "inventory.csv"
      );

      toast.success(
        "CSV Exported"
      );
    };



 
  return (
    <div className="p-6 text-white">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <button
          onClick={
            exportCSV
          }
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
        >
          Export CSV
          <button
onClick={
exportPDF
}
className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
>

Export PDF

</button>
        </button>

      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">

  <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-5 rounded-3xl border border-slate-800 hover:scale-105 transition">

    <p className="text-slate-400">
      📦 Total Products
    </p>

    <h1 className="text-4xl font-bold mt-3">

      {totalProducts}

    </h1>

  </div>

  <div className="bg-gradient-to-br from-red-900 to-slate-900 p-5 rounded-3xl border border-slate-800 hover:scale-105 transition">

    <p className="text-slate-400">
      ⚠ Low Stock
    </p>

    <h1 className="text-4xl font-bold mt-3 text-red-400">

      {lowStockProducts}

    </h1>

  </div>

  <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-5 rounded-3xl border border-slate-800 hover:scale-105 transition">

    <p className="text-slate-400">
      🏬 Warehouses
    </p>

    <h1 className="text-4xl font-bold mt-3">

      {totalWarehouses}

    </h1>

  </div>

  <div className="bg-gradient-to-br from-green-900 to-slate-900 p-5 rounded-3xl border border-slate-800 hover:scale-105 transition">

    <p className="text-slate-400">
      💰 Total Value
    </p>

    <h1 className="text-3xl font-bold mt-3">

      ₹{totalValue}

    </h1>

  </div>

</div>
<div className="grid grid-cols-2 gap-6 mb-6">

  <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800">

    <h2 className="text-xl font-bold mb-4">

      📊 Products by Category

    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart
        data={categoryChart}
      >

        <XAxis
          dataKey="category"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800">

    <h2 className="text-xl font-bold mb-4">

      🏬 Warehouse Distribution

    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <PieChart>

        <Pie
          data={warehouseChart}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {warehouseChart.map(
            (
              entry,
              index
            ) => (
              <Cell
                key={index}
              />
            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

      <form
        onSubmit={
          addProduct
        }
        className="grid grid-cols-3 gap-4 bg-slate-900 p-5 rounded-xl mb-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={
            formData.category
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={
            formData.quantity
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={
            formData.price
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={
            formData.supplier
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="text"
          name="warehouse"
          placeholder="Warehouse"
          
          value={
            formData.warehouse
          }
          onChange={
            handleChange
          }
          className="bg-slate-800 p-3 rounded"
        />
        <input
type="text"
name="image"
placeholder="Image URL"
value={
formData.image
}
onChange={
handleChange
}
className="bg-slate-800 p-3 rounded"
/>

        <button
          className="bg-blue-600 hover:bg-blue-700 rounded p-3"
        >

          {editingId
            ? "Update Product"
            : "Add Product"}

        </button>

      </form>

      <div className="grid grid-cols-4 gap-4 mb-5">
        
{suggestions.length >
  0 && (

  <div className="absolute bg-slate-900 border border-slate-700 rounded-xl mt-2 w-full z-50 overflow-hidden">

    {suggestions.map(
      (
        item
      ) => (

        <div
          key={
            item._id
          }
          onClick={() => {

            setSearch(
              item.name
            );

            setSuggestions(
              []
            );
          }}
          className="p-3 hover:bg-slate-800 cursor-pointer"
        >

          {
            item.name
          }

        </div>
      )
    )}

  </div>
)}



        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
        />
        
{suggestions.length >
  0 && (

  <div className="absolute bg-slate-900 border border-slate-700 rounded-xl mt-2 w-full z-50 overflow-hidden">

    {suggestions.map(
      (
        item
      ) => (

        <div
          key={
            item._id
          }
          onClick={() => {

            setSearch(
              item.name
            );

            setSuggestions(
              []
            );
          }}
          className="p-3 hover:bg-slate-800 cursor-pointer"
        >

          {
            item.name
          }

        </div>
      )
    )}

  </div>
)}



        <select
          value={
            categoryFilter
          }
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
        >

          <option value="">
            All Categories
          </option>

          {[...new Set(
            products.map(
              (p) =>
                p.category
            )
          )].map(
            (category) => (

              <option
                key={
                  category
                }
                value={
                  category
                }
              >

                {category}

              </option>
            )
          )}

        </select>

        <select
          value={
            warehouseFilter
          }
          onChange={(e) =>
            setWarehouseFilter(
              e.target.value
            )
          }
          className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
        >

          <option value="">
            All Warehouses
          </option>

          {[...new Set(
            products.map(
              (p) =>
                p.warehouse
            )
          )].map(
            (warehouse) => (

              <option
                key={
                  warehouse
                }
                value={
                  warehouse
                }
              >

                {warehouse}

              </option>
            )
          )}

        </select>

        <label className="flex items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            
<select
  value={sortBy}
  onChange={(e) =>
    setSortBy(
      e.target.value
    )
  }
  className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800"
>

  <option value="">
    Sort By
  </option>

  <option value="name">
    Name A-Z
  </option>

  <option value="priceHigh">
    Price High-Low
  </option>

  <option value="priceLow">
    Price Low-High
  </option>

  <option value="qtyHigh">
    Quantity High-Low
  </option>

  <option value="qtyLow">
    Quantity Low-High
  </option>

</select>



          <input
            type="checkbox"
            checked={
              lowStockOnly
            }
            onChange={() =>
              setLowStockOnly(
                !lowStockOnly
              )
            }
          />

          Low Stock Only

        </label>

      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
                <th>
Image
</th>

              <th className="p-4">
                Name
              </th>

              <th>
                SKU
              </th>

              <th>
                Category
              </th>

              <th>
                Qty
              </th>

              <th>
                Price
              </th>

              <th>
                Status
              </th>
              <th>
  Suggestion
</th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center p-10 text-slate-400"
                >

                  Loading inventory...

                </td>

              </tr>

            ) : currentProducts.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center p-10 text-slate-400"
                >

                  No Products Found

                </td>

              </tr>

            ) : (

              currentProducts.map(
                (
                  product
                ) => (

                  <tr
                    key={
                      product._id
                    }
                    className="border-b border-slate-800 text-center"
                  >
                    <td className="p-4">

<img
src={
product.image ||
"https://via.placeholder.com/60"
}
alt="product"
className="w-14 h-14 rounded-lg object-cover mx-auto"
/>

</td>

                    <td className="p-4">
                      {
                        product.name
                      }
                    </td>

                    <td>
                      {
                        product.sku
                      }
                    </td>

                    <td>
                      {
                        product.category
                      }
                    </td>

                    <td>
                      {
                        product.quantity
                      }
                    </td>

                    <td>
                      ₹{
                        product.price
                      }
                    </td>

                   <td>

  {product.quantity < 5 ? (

    <span className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-sm font-semibold">

      🔴 Critical

    </span>

  ) : product.quantity <
    product.lowStockThreshold ? (

    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">

      🟠 Low Stock

    </span>

  ) : (

    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">

      🟢 Healthy

    </span>

  )}

</td>
<td>

  {product.quantity < 5 ? (

    <span className="text-red-400 font-semibold">

      🔴 Urgent Restock
      (
      +
      {
        product.lowStockThreshold -
        product.quantity +
        10
      }
      )

    </span>

  ) : product.quantity <
    product.lowStockThreshold ? (

    <span className="text-orange-400 font-semibold">

      🟠 Restock Soon
      (
      +
      {
        product.lowStockThreshold -
        product.quantity
      }
      )

    </span>

  ) : (

    <span className="text-green-400 font-semibold">

      🟢 Healthy

    </span>

  )}

</td>
                    <td className="space-x-2">

                      <button
                        onClick={() => {

                          setEditingId(
                            product._id
                          );

                          setFormData({
                            name:
                              product.name,
                            category:
                              product.category,
                            quantity:
                              product.quantity,
                            price:
                              product.price,
                            supplier:
                              product.supplier,
                            warehouse:
                              product.warehouse
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >

                        Delete

                      </button>
                      <button
onClick={() =>
setSelectedProduct(
product
)
}
className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded"
>

View

</button>
                      <button onClick={() => restockProduct( product ) } className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded" > Restock </button>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

        <div className="flex justify-center items-center gap-4 py-5">

          <button
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            disabled={
              currentPage === 1
            }
            className="bg-slate-800 px-4 py-2 rounded disabled:opacity-50"
          >

            Previous

          </button>

          <span>

            Page {
              currentPage
            } of {
              totalPages || 1
            }

          </span>

          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            disabled={
              currentPage ===
              totalPages ||
              totalPages === 0
            }
            className="bg-slate-800 px-4 py-2 rounded disabled:opacity-50"
          >

            Next

          </button>

        </div>

      </div>
      {selectedProduct && (

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

<div className="bg-slate-900 rounded-3xl p-8 w-[500px] relative">

<button
onClick={() =>
setSelectedProduct(
null
)
}
className="absolute top-4 right-4 text-red-400 text-2xl"
>

✖

</button>

<img
src={
selectedProduct.image ||
"https://via.placeholder.com/300"
}
alt="product"
className="w-full h-56 object-cover rounded-2xl mb-5"
/>

<h1 className="text-3xl font-bold mb-4">

{
selectedProduct.name
}

</h1>

<div className="space-y-3 text-slate-300">

<p>

🏷 Category:
{" "}
{
selectedProduct.category
}

</p>

<p>

📦 Quantity:
{" "}
{
selectedProduct.quantity
}

</p>

<p>

💰 Price:
₹
{
selectedProduct.price
}

</p>

<p>

🏬 Warehouse:
{" "}
{
selectedProduct.warehouse
}

</p>

<p>

🚚 Supplier:
{" "}
{
selectedProduct.supplier
}

</p>

<p>

📌 SKU:
{" "}
{
selectedProduct.sku
}

</p>

</div>

</div>

</div>
)}

    </div>
  );
}

