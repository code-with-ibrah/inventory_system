import ReactDOM from 'react-dom/client'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from 'react-redux'
import { persistor, store } from "./state/store";
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from "./utils/api";
import {AppContextProvider} from "./context/app-context";

injectStore(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <AppContextProvider>
                    <App/>
                </AppContextProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
