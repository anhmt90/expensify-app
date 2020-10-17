import db from '../firebase/firebase-config';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

/** 
 * dispatch a function enabled by redux middleware (reduc-thunk). Would not work if no middleware set up 
 * start<Action> are middleware functions to do something e.g. interacting with db, before dispatching to 
 * Redux store
 */
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {description= '', note = '', amount = 0, createdAt = 0} = expenseData;
        const expense = {description, note, amount, createdAt};
        
        return db.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});