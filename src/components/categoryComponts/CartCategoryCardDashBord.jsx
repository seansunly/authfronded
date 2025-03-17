import React from "react";

export default function CartCategoryCardDashBord({
  title,
  codeCategory,
  metaTile,
  slug,
  text,
  isDeleted,
}) {
  return (
    <div className="border rounded-lg shadow-lg p-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-2xl font-bold text-gray-700">{title}</h3>
        <span
          className={`text-xs font-medium py-1 px-2 rounded ${
            isDeleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isDeleted ? "Deleted" : "Active"}
        </span>
      </div>

      {/* Details Section */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Code:</span> {codeCategory}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Meta Title:</span> {metaTile}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Slug:</span> {slug}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Description:</span> {text}
        </p>
      </div>

      
    </div>
  );
}
