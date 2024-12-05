import React, {createContext} from "react";
import {State} from "@/types/State.ts";
import {Action} from "@/types/Action.ts";
import {actions} from "@/stores/products/actions.tsx";

export const AppContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
    actions: typeof actions;
} | null>(null);
