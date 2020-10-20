import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppRouter, { history } from "./routers/AppRouter";

import configureStore from "./store/config";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
// import getVisibleExpenses from "./selectors/expenses";
import { firebase } from "./firebase/firebase-config";

import "normalize.css/normalize.css"; // reset all browsers to the same base configuration
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

/**
 * PLAYGROUND
 */
// import './playground/promises'

const store = configureStore();

/**
 * Dummy data for debugging
 */
// store.dispatch(addExpense({description: 'Water bill', note: '',  amount: 2400, createdAt: 3}))
// store.dispatch(addExpense({description: 'Rent', note: '',  amount: 36000, createdAt: 1}))
// store.dispatch(addExpense({description: 'Gas bill', note: '',  amount: 1200, createdAt: 2}))

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

/**
 * render app only a single time
 */
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};


/**
 * Seting up callbacks checking if firebase logs in or logs out
 */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
        console.log('log in ');
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
        console.log('log out');
    }
});


ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));