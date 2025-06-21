import React, { createContext, useReducer, useContext } from "react";

export const WishlistContext = createContext({ wishlist: [] });

export const WISHLIST_ACTIONS = Object.freeze({
  TOGGLE_WISHLIST_ITEM: 'TOGGLE_WISHLIST_ITEM',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
});

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.TOGGLE_WISHLIST_ITEM: {
      const itemToToggle = action.payload;
      const existingItem = state.find(item => item.id === itemToToggle.id);

      if (existingItem) {
        return state.filter(item => item.id !== itemToToggle.id);
      } else {
        return [...state, itemToToggle];
      }
    }

    case WISHLIST_ACTIONS.REMOVE_FROM_WISHLIST: {
      return state.filter(item => item.id !== action.payload.id);
    }

    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default WishlistProvider;