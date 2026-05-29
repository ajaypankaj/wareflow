
import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

export default function
Warehouses() {

  const [warehouses,
    setWarehouses] =
    useState([]);
    const [transferData,
setTransferData] =
useState({
productId: "",
fromWarehouse: "",
toWarehouse: "",
quantity: ""
});

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    fetchWarehouses();

  }, []);

  const fetchWarehouses =
    async () => {

      try {

        const res =
          await axios.get(
            "https://name-wareflow-backend.onrender.com/api/products",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const products =
          res.data;

        const map =
          {};

        products.forEach(
          (product) => {

            const warehouse =
              product.warehouse;

            if (
              !map[
                warehouse
              ]
            ) {

              map[
                warehouse
              ] = {
                name:
                  warehouse,
                totalProducts:
                  0,
                totalQuantity:
                  0,
                totalValue:
                  0,
                products:
                  []
              };
            }

            map[
              warehouse
            ].totalProducts +=
              1;

            map[
              warehouse
            ].totalQuantity +=
              product.quantity;

            map[
              warehouse
            ].totalValue +=
              (
                product.price *
                product.quantity
              );

            map[
              warehouse
            ].products.push(
              product.name
            );
          }
        );

        setWarehouses(
          Object.values(
            map
          )
        );

      } catch (error) {

        console.log(error);
      }
    };
    const handleTransferChange =
(e) => {

setTransferData({
...transferData,
[e.target.name]:
e.target.value
});
};
const transferStock =
async () => {

try {

await axios.put(
"https://name-wareflow-backend.onrender.com/api/products/transfer",
transferData,
{
headers: {
Authorization:
`Bearer ${token}`
}
}
);

alert(
"Stock transferred"
);

fetchWarehouses();

setTransferData({
productId: "",
fromWarehouse: "",
toWarehouse: "",
quantity: ""
});

} catch (error) {

console.log(error);

alert(
error.response?.data?.message
);

}
};

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">

        🏬 Warehouses

      </h1>
      <div className="bg-slate-900 p-5 rounded-3xl mb-6 grid grid-cols-4 gap-4">

<select
name="productId"
value={transferData.productId}
onChange={
handleTransferChange
}
className="bg-slate-800 p-3 rounded"
>

<option value="">
Select Product
</option>

{warehouses.flatMap(
(warehouse) =>
warehouse.products.map(
(product) => (
<option
key={product}
value={product}
>
{product}
</option>
)
)
)}

</select>

<input
type="text"
name="fromWarehouse"
placeholder="From Warehouse"
value={
transferData.fromWarehouse
}
onChange={
handleTransferChange
}
className="bg-slate-800 p-3 rounded"
/>

<input
type="text"
name="toWarehouse"
placeholder="To Warehouse"
value={
transferData.toWarehouse
}
onChange={
handleTransferChange
}
className="bg-slate-800 p-3 rounded"
/>

<input
type="number"
name="quantity"
placeholder="Quantity"
value={
transferData.quantity
}
onChange={
handleTransferChange
}
className="bg-slate-800 p-3 rounded"
/>

<button
onClick={
transferStock
}
className="bg-green-600 hover:bg-green-700 rounded p-3"
>

Transfer Stock

</button>

</div>

      <div className="grid grid-cols-2 gap-6">

        {warehouses.map(
          (warehouse) => (

            <div
              key={
                warehouse.name
              }
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 hover:scale-105 transition"
            >

              <h2 className="text-2xl font-bold mb-4">

                🏬 {
                  warehouse.name
                }

              </h2>

              <div className="space-y-2 text-slate-300">

                <p>

                  📦 Products:
                  {" "}
                  {
                    warehouse.totalProducts
                  }

                </p>

                <p>

                  📊 Quantity:
                  {" "}
                  {
                    warehouse.totalQuantity
                  }

                </p>

                <p>

                  💰 Value:
                  {" "}
                  ₹{
                    warehouse.totalValue
                  }

                </p>

              </div>

              <div className="mt-5">

                <h3 className="font-bold mb-2">

                  Products

                </h3>

                <div className="flex flex-wrap gap-2">

                  {warehouse.products.map(
                    (
                      product,
                      index
                    ) => (

                      <span
                        key={
                          index
                        }
                        className="bg-slate-800 px-3 py-1 rounded-full text-sm"
                      >

                        {
                          product
                        }

                      </span>
                    )
                  )}

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

