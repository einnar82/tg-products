import {Product} from "@/types/Product.ts";

export type Action =
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_SEARCH_RESULTS"; payload: Product[] }
    | { type: "SET_PRODUCT_DETAIL"; payload: Product | null }
    | { type: "SET_SEARCH_TERM"; payload: string }
    | { type: "SET_SUGGESTIONS"; payload: string[] }
    | { type: "SET_TOTAL"; payload: number }
    | { type: "SET_SKIP"; payload: number }
    | { type: "SET_LIMIT"; payload: number }
    | { type: "SET_CURRENT_PAGE"; payload: number }
