import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectError,
  selectStatus,
} from "../../redux/feature/product/productSlice";
import DataTable from "react-data-table-component";

export default function ProductDashBord() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts); // Fetch products from Redux store
  const productStatus = useSelector(selectStatus); // Fetch status to handle loading
  const error = useSelector(selectError); // Fetch error if any
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="truncate w-40" title={row.title}>
          {row.title}
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category,
      cell: (row) => (
        <div className="truncate w-40" title={row.category}>
          {row.category}
        </div>
      ),
    },
    {
      name: "Image",
      cell: (row) => (
        <div className="flex justify-center">
          <img
            src={row.image}
            alt={row.title}
            className="w-12 h-12 object-cover"
          />
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) => (
        <div className="truncate w-64" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Rating",
      selector: (row) => `${row.rating.rate} (${row.rating.count} reviews)`,
      cell: (row) => (
        <div
          className="truncate w-32"
          title={`${row.rating.rate} (${row.rating.count} reviews)`}
        >
          {row.rating.rate} ({row.rating.count} reviews)
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-sm">
            Edit
          </button>
          <button
            onClick={() => handleDeleteProduct(row.id)}
            className="ml-2 bg-red-500 hover:bg-red-400 text-white rounded-sm"
          >
            Delete
          </button>
          <button
            onClick={() => handleProductDetail(row)}
            className="ml-2 bg-green-400 hover:bg-green-400 text-white rounded-sm"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (productStatus === "idle") {
      // Fetch products if not already fetched
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  // Loading and error handling
  if (productStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (productStatus === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Product Dashboard</h2>
      <DataTable
        columns={columns}
        data={products}
        fixedHeader
        subHeader
        pointerOnHover
        highlightOnHover
        striped
        pagination
      />
    </div>
  );
}
