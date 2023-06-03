import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import UseStore from "./store/UseStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null)

const root = document.getElementById('root');

const app = (
    <Context.Provider value={{
        user: new UseStore(),
        device: new DeviceStore(),
    }}>
        <App />
    </Context.Provider>
);

createRoot(root).render(app);






