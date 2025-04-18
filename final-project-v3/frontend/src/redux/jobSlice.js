import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 异步获取 Job 列表
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (page) => {
    const response = await axios.get(`http://localhost:5000/job/getjob?page=${page}`);
    return response.data;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    currentPage: 1,
    total:0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        // state.jobs = action.payload;
        state.jobs = action.payload.jobs;     // ✅ 使用分页结果
        state.total = action.payload.total;   // ✅ 保存总条数
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = jobSlice.actions;
export default jobSlice.reducer;