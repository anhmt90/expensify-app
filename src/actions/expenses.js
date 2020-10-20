import db from "../firebase/firebase-config";

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense,
});

/**
 * dispatch a function enabled by redux middleware (reduc-thunk). Would not work if no middleware set up
 * start<Action> are middleware functions to do something e.g. interacting with db, before dispatching to
 * Redux store.
 * Note that the thunk asyn actions getting called with dispatch, and also get called woith getState()
 */
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0,
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return db
            .ref(`users/${uid}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(
                    addExpense({
                        id: ref.key,
                        ...expense,
                    })
                );
            });
    };
};

export const removeExpense = (id) => ({
    type: "REMOVE_EXPENSE",
    id,
});

export const startRemoveExpense = (id = undefined) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense(id));
        });
    };
};

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses,
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = [];
        return db.ref(`users/${uid}/expenses`).once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
        }).then(() => {
            dispatch(setExpenses(expenses));
        });
    };
};
