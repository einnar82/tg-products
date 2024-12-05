import React, {ReactNode, useReducer} from "react";
import {reducer} from "@/stores/products/reducers.tsx";
import {initialState} from "@/stores/products/state.tsx";
import {actions} from "@/stores/products/actions.tsx";
import {AppContext} from "@/contexts/appContext.tsx";
import {State} from "@/types/State.ts";

// Initializer function
const initializer = (initialState: State): State => {
    // Add any complex logic here if needed (e.g., loading from localStorage)
    return { ...initialState };
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, initializer);

    return (
        <AppContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </AppContext.Provider>
    );
};
