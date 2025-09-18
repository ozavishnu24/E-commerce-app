import { createSlice } from '@reduxjs/toolkit';

const getWishlistFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
};

const saveWishlistToLocalStorage = (wishlistItems) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }
};

const initialState = {
  items: getWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push(newItem);
        saveWishlistToLocalStorage(state.items);
      }
    },
    
    removeItemFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      saveWishlistToLocalStorage(state.items);
    },
    
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state.items);
    }
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;