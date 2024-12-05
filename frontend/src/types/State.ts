import {Product} from "@/types/Product.ts";

export interface State {
    loading: boolean;
    products: Product[];
    searchResults: Product[];
    product: Product | null;
    total: number;
    skip: number;
    limit: number;
    searchTerm: string;
    suggestions: string[];
    currentPage: number;
}
