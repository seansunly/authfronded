import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Base_UrlCafe } from "../../api/indexapi";

const initialState = {
  category: [],
  categoryById: {},
  status: "idle", // idle / pending / fulfilled / rejected
  error: null,
};

export const fetchCategory = createAsyncThunk("categorys/fetchCategory", async () => {
  const response = await fetch(`${Base_UrlCafe}/category`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  console.log("Fetched Categories:", data);
  return data;
});

export const deleteCategory = createAsyncThunk(
  "categorys/deleteCategory",
  async (codeCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Base_UrlCafe}/category/${codeCategory}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.statusText}`);
      }
      return codeCategory; // Return the deleted codeCategory to remove from state
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCategoryCafeById = createAsyncThunk("categoryById/fetchCategoryCafeById",async (codeCategory) => {
  const response = await fetch(`http://localhost:8080/api/v1/category/${codeCategory}`);
  if (!response.ok) {
    throw new Error(`Error fetching category: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log("dataById", data);
  return data;
  }
);


export const softDeleteCategory = createAsyncThunk(
  "categorys/softDeleteCategory",
  async (codeCategory, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const category = state.categorys.category.find(
        (cat) => cat.codeCategory === codeCategory
      );
      
      if (!category) {
        throw new Error("Category not found");
      }

      const updatedCategory = { ...category, isDeleted: true }; // Mark as deleted

      const response = await fetch(`${Base_UrlCafe}/category/${codeCategory}/isDeletedByCode`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }

      return updatedCategory; // Return the updated category
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ codeCategory, updatedCategoryData }, { rejectWithValue }) => {
    try {
      if (!codeCategory) {
        throw new Error('category code is missing');
      }
      const response = await fetch(
        `http://localhost:8080/api/v1/category/${codeCategory}`, // Ensure codeCategory is passed correctly
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategoryData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return the updated category
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const categorySlice = createSlice({
  name: "categorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (cat) => cat.codeCategory !== action.payload
        );
        state.status = "fulfilled";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })


      // Fetch Category by Id
      .addCase(fetchCategoryCafeById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategoryCafeById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categoryById = action.payload;
      })
      .addCase(fetchCategoryCafeById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      // Soft Delete Category
      .addCase(softDeleteCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(softDeleteCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        state.category = state.category.map((cat) =>
          cat.codeCategory === updatedCategory.codeCategory
            ? updatedCategory
            : cat
        );
        state.status = "fulfilled";
      })
      .addCase(softDeleteCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        state.category = state.category.map((categorye) =>
          categorye.codeCategory === updatedCategory.codeCategory
            ? updatedCategory
            : categorye
        );
        state.status = "fulfilled";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export default categorySlice.reducer;

export const selectAllCategory = (state) => state.categorys.category;
export const selectCategoryById = (state) => state.categorys.categoryById;


export const selectStatus = (state) => state.categorys.status;
export const selectError = (state) => state.categorys.error;
