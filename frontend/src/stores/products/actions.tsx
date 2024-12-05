// Define reusable actions
import React from "react";
import axios from "axios";
import {Action} from "@/stores/products/state.tsx";
import {Product} from "@/types/Product.ts";

export const actions = {
    fetchProducts: async (dispatch: React.Dispatch<Action>, searchTerm = "", limit = 10, skip = 0) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const endpoint = searchTerm
                ? `http://127.0.0.1:8000/api/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
                : `http://127.0.0.1:8000/api/products?limit=${limit}&skip=${skip}`;
            const response = await axios.get(endpoint);
            dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
            dispatch({ type: "SET_LIMIT", payload: response.data.limit });
            dispatch({ type: "SET_TOTAL", payload: response.data.total });
            dispatch({ type: "SET_SKIP", payload: response.data.skip });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    },
    searchProducts: async (query: string, dispatch: React.Dispatch<Action>) => {
        dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
        await actions.fetchProducts(dispatch, searchTerm);
    },
    fetchProductDetail: async (id: string, dispatch: React.Dispatch<Action>) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
            if (response.data.message) throw new Error("Product not found");
            dispatch({ type: "SET_PRODUCT_DETAIL", payload: response.data });
        } catch (error) {
            console.error("Failed to fetch product detail:", error);
            throw error; // Pass the error to the caller
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    },
    fetchSuggestions: async (query: string, dispatch: React.Dispatch<Action>) => {
        if (!query.trim()) {
            dispatch({ type: "SET_SUGGESTIONS", payload: [] });
            return;
        }
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/search?q=${query}`);
            const suggestions = response.data.products.map((product: Product) => product.title);
            dispatch({ type: "SET_SUGGESTIONS", payload: suggestions });
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
            dispatch({ type: "SET_SUGGESTIONS", payload: [] });
        }
    },
};
