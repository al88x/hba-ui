import React, {ReactNode, useEffect, useReducer} from "react";
import {asyncGetUserDetails} from "../helpers/AsyncJsonFetcher";

interface IAuthContextProviderProps {
    isLoggedIn?:boolean,
    isContextLoaded?:boolean,
    username?:string,
    role?:string
    children: ReactNode
}

export interface IState {
    isContextLoaded: boolean
    isLoggedIn: boolean
    username: string | null,
    role: string | null
}

interface IAction {
    type: string,
    payload?: any
}

const initialState: IState = {
    isContextLoaded: false,
    isLoggedIn: false,
    username: null,
    role: null
};
export const AuthContext = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case 'FETCH_USER':
            return (
                {
                    ...state,
                    isContextLoaded: true,
                    isLoggedIn: action.payload.username != null,
                    role: action.payload.role,
                    username: action.payload.username
                }
            );
        default:
            return state;
    }
}

export function AuthContextProvider(props: IAuthContextProviderProps) {
    const initialState: IState = {
        isContextLoaded: props.isContextLoaded || false,
        isLoggedIn: props.isLoggedIn || false,
        username: props.username || null,
        role: props.role || null
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
            asyncGetUserDetails()
                .then(jsonResponse => {
                    dispatch({type: "FETCH_USER", payload: jsonResponse})})

    }, []);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
};