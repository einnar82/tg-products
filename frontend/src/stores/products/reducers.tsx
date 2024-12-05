import {State} from "@/types/State.ts";
import {Action} from "@/types/Action.ts";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "SET_SEARCH_RESULTS":
            return { ...state, searchResults: action.payload };
        case "SET_PRODUCT_DETAIL":
            return { ...state, product: action.payload };
        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload };
        case "SET_TOTAL":
            return { ...state, total: action.payload };
        case "SET_SKIP":
            return { ...state, skip: action.payload };
        case "SET_LIMIT":
            return { ...state, limit: action.payload };
        case "SET_SUGGESTIONS":
            return { ...state, suggestions: action.payload }
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};
