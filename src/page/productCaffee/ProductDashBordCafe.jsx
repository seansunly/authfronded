import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetprodcutCaffee,
  selectAllProductCaffee,
  selectError,
  selectStatus,
  deleteProduct,
} from "../../redux/feature/productCaffee/productCaffeeSlice";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function ProductDashBordCafe() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProductCaffee);
  const productStatus = useSelector(selectStatus);
  const error = useSelector(selectError);

  // Handle delete product
  const handleDeleteProduct = async (codeProduct) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        // Dispatch delete action to handle API and Redux update
        await dispatch(deleteProduct(codeProduct)).unwrap();
        alert("Product deleted successfully!");
      } catch (err) {
        alert(`Failed to delete product: ${err}`);
      }
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.tile,
      cell: (row) => (
        <div className="truncate w-40" title={row.tile}>
          {row.tile}
        </div>
      ),
    },
    {
      name: "CodeProduct",
      selector: (row) => row.codeProduct,
      cell: (row) => (
        <div className="truncate w-40" title={row.codeProduct}>
          {row.codeProduct}
        </div>
      ),
    },
    {
      name: "NameCategory",
      selector: (row) => row.nameCategory,
      cell: (row) => (
        <div className="truncate w-40" title={row.nameCategory}>
          {row.nameCategory}
        </div>
      ),
    },
    {
      name: "Image",
      cell: (row) => (
        <div className="flex justify-center">
          <img src={row.image} alt={row.tile} className="w-12 h-12 object-cover" />
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: "priceDiscount",
      selector: (row) => `$${row.priceDiscount}`,
      sortable: true,
    },
   // priceDiscount
    {
      name: "Description",
      selector: (row) => row.metaTile,
      cell: (row) => (
        <div className="truncate w-64" title={row.metaTile}>
          {row.metaTile}
        </div>
      ),
    },
    {
      name: "Rating",
      selector: (row) => `${row.quantity} (${row.quantity} reviews)`,
      cell: (row) => (
        <div className="truncate w-32" title={`${row.quantity} (${row.quantity} reviews)`}>
          {row.quantity} ({row.quantity} reviews)
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center">

          <Link to={`/dashboard/productDashBordCafe/updateProductOnDashBord/${row.codeProduct}`}>
          <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-sm">
            Edit
          </button>
          </Link>
          
          <button
            onClick={() => handleDeleteProduct(row.codeProduct)}
            className="ml-2 bg-red-500 hover:bg-red-400 text-white rounded-sm"
          >
            Delete
          </button>
          <Link to={`/dashboard/productDashBordCafe/viewProductOnDashBord/${row.codeProduct}`}>
            <button className="ml-2 bg-green-400 hover:bg-green-400 text-white rounded-sm">
              View
            </button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetprodcutCaffee());
    }
  }, [dispatch, productStatus]);

  if (productStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (productStatus === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex-grow">Product Dashboard</h2>
        <Link to="productCafeCreateform">
          <button className="ml-0 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
            New Product
          </button>
        </Link>
      </div>
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
