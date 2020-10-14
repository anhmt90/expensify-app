import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/config';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css'; // reset all browsers to the same base configuration
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'

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

ReactDOM.render(jsx, document.getElementById('app'));