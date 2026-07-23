export const demoProducts = [
  {
    _id: "1",
    name: "Dell Latitude 5520",
    category: "Laptops",
    quantity: 25,
    price: 65000,
    warehouse: "Warehouse A",
    supplier: "Dell",
    sku: "DL-001",
    lowStockThreshold: 10,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
  },

  {
    _id: "2",
    name: "HP EliteBook",
    category: "Laptops",
    quantity: 8,
    price: 72000,
    warehouse: "Warehouse A",
    supplier: "HP",
    sku: "HP-002",
    lowStockThreshold: 10,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600"
  },

  {
    _id: "3",
    name: "Logitech Mouse",
    category: "Accessories",
    quantity: 55,
    price: 900,
    warehouse: "Warehouse B",
    supplier: "Logitech",
    sku: "LG-003",
    lowStockThreshold: 10,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600"
  },

  {
    _id: "4",
    name: "Mechanical Keyboard",
    category: "Accessories",
    quantity: 18,
    price: 3200,
    warehouse: "Warehouse B",
    supplier: "Redragon",
    sku: "KB-004",
    lowStockThreshold: 10,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600"
  },

  {
    _id: "5",
    name: "Samsung Monitor",
    category: "Monitors",
    quantity: 14,
    price: 14500,
    warehouse: "Warehouse C",
    supplier: "Samsung",
    sku: "SM-005",
    lowStockThreshold: 8,
    image:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=600"
  }
];

export const demoOrders = [
  {
    _id: "101",
    productName: "Dell Latitude 5520",
    quantity: 2,
    warehouse: "Warehouse A",
    createdAt: "2026-07-20T10:00:00Z"
  },

  {
    _id: "102",
    productName: "Samsung Monitor",
    quantity: 3,
    warehouse: "Warehouse C",
    createdAt: "2026-07-21T12:30:00Z"
  }
];

export const demoActivities = [
  {
    _id: "201",
    action: "Added Product",
    performedBy: "Manager",
    createdAt: "2026-07-20T09:30:00Z"
  },

  {
    _id: "202",
    action: "Placed Order",
    performedBy: "Employee",
    createdAt: "2026-07-21T11:20:00Z"
  },

  {
    _id: "203",
    action: "Transferred Stock",
    performedBy: "Manager",
    createdAt: "2026-07-22T15:45:00Z"
  }
];