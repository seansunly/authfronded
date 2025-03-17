import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, selectAllCategory, selectError, selectStatus, deleteCategory,softDeleteCategory } from "../../../redux/feature/categoryCafe/categoryCafeSlice";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiDeleteBackLine } from "react-icons/ri";

export default function CategoryDashBord() {
  const dispatch = useDispatch();
  const category = useSelector(selectAllCategory);
  const categoryStatus = useSelector(selectStatus);
  const error = useSelector(selectError);

  console.log("Categories:", category);

  const handleDeleteCategory = async (codeCategory) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      try {
        await dispatch(deleteCategory(codeCategory)).unwrap();
        alert("Category deleted successfully!");
      } catch (err) {
        alert(`Failed to delete category: ${err}`);
      }
    }
  };

  const handleSoftDeleteCategory = async (codeCategory) => {
    const confirmed = window.confirm("Are you sure you want to mark this category as deleted?");
    if (confirmed) {
      try {
        // Dispatch soft delete action
        await dispatch(softDeleteCategory(codeCategory)).unwrap();
        alert("Category marked as deleted successfully!");
      } catch (err) {
        alert(`Failed to mark category as deleted: ${err}`);
      }
    }
  };
  

  const columns = [
    {
      name: "Category Code",
      selector: (row) => row.codeCategory,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Meta Title",
      selector: (row) => row.metaTile,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Description",
      selector: (row) => row.text,
    },
    {
      name: "Is Deleted",
      selector: (row) => (row.isDeleted ? "Yes" : "No"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">

            <button onClick={() => handleSoftDeleteCategory(row.codeCategory)} className="bg-blue-500 hover:bg-blue-400 text-white rounded-sm px-2 py-1">
            <RiDeleteBackLine />
            </button> 


          <Link to={`/dashboard/categoryDashBord/updateCategorydashbord/${row.codeCategory}`}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-sm px-2 py-1">
            <FaRegEdit />
            </button>
          </Link>
          <button
            onClick={() => handleDeleteCategory(row.codeCategory)}
            className="bg-red-500 hover:bg-red-400 text-white rounded-sm px-2 py-1"
          >
            <MdDelete />
          </button>
          <Link to={`/dashboard/productDashBordCafe/viewCategoryPage/${row.codeCategory}`}>
            <button className="bg-green-500 hover:bg-green-400 text-white rounded-sm px-2 py-1">
            <IoEye />
            </button>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategory());
    }
  }, [dispatch, categoryStatus]);

  if (categoryStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (categoryStatus === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Category Dashboard</h2>
        <Link to="createCategorydashbord">
          <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800">
            New Category
          </button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={category}
        pagination
        highlightOnHover
        pointerOnHover
        striped
        fixedHeader
      />
    </div>
  );
}
