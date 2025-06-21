import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@HealthShopApp:cart';

export const CartContext = createContext({ shoppingCart: [] });

export const CART_ACTIONS = Object.freeze({
  INITIALIZE_CART: 'INITIALIZE_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
  EMPTY_CART: 'EMPTY_CART',
});

const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.INITIALIZE_CART:
            return action.payload || [];
        case CART_ACTIONS.ADD_TO_CART: {
            const itemToAdd = action.payload;
            const existingItem = state.find(item => item.id === itemToAdd.id);
      
            if (existingItem) {
              return state.map(item =>
                item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              return [...state, { ...itemToAdd, quantity: 1 }];
            }
          }
        case CART_ACTIONS.INCREMENT_QUANTITY: {
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        case CART_ACTIONS.DECREMENT_QUANTITY: {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem?.quantity === 1) {
                return state.filter(item => item.id !== action.payload.id);
            }
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        }
        case CART_ACTIONS.REMOVE_FROM_CART: {
          return state.filter(item => item.id !== action.payload.id);
        }
        case CART_ACTIONS.EMPTY_CART:
          return [];
        default:
          return state;
    }
};

const CartProvider = ({ children }) => {
  const [shoppingCart, dispatch] = useReducer(shoppingCartReducer, []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    const loadCart = async () => {
        try {
            const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
            if (savedCart !== null) {
                dispatch({ type: CART_ACTIONS.INITIALIZE_CART, payload: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error("Failed to load cart from storage", error);
        } finally {
            setIsInitialLoad(false);
        }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;
    const saveCart = async () => {
        try {
            await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingCart));
        } catch (error) {
            console.error("Failed to save cart to storage", error);
        }
    };
    saveCart();
  }, [shoppingCart, isInitialLoad]);

  return (
    <CartContext.Provider value={{ shoppingCart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;