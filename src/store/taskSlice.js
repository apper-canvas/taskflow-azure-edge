import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  filter: 'all',
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map(task => 
        task.Id === action.payload.Id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.Id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  setFilter,
  setLoading,
  setError
} = taskSlice.actions;

export default taskSlice.reducer;