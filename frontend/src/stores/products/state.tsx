import {State} from "@/types/State.ts";

// State structure

// Initial state
export const initialState: State = {
    loading: false,
    products: [],
    searchResults: [],
    product: null,
    total: 0,
    skip: 0,
    limit: 0,
    searchTerm: "",
    suggestions: [],
    currentPage: 1
};
