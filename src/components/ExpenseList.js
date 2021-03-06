import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

/**
 * Note that ExpenseList is included in ExpenseDashboardPage, but it doesn't get any props passed down 
 * from there. Its props are taken and converted from state of Redux store.
 * */
export const ExpenseList = (props) => (  // this named export is for testing purpose since we won't get data from store
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item--message">
                        <span>No expenses</span>
                    </div>
                ) : (
                        props.expenses.map((e) => (<ExpenseListItem key={e.id} {...e} />))
                    )
            }
        </div>
    </div>
);

const mapStatetoProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
});

/**
 * The first parameter of connect() is a function mapping state from the store to props of a HOC.
 * connect() will return a function which can be used to wrapped a component making it a HOC 
 * the new wrapper component will subscribe to Redux store updates.
 *  */
export default connect(mapStatetoProps)(ExpenseList);