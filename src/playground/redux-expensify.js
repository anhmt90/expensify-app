
/*********************** REDUCERS **************************/



/*********************** SELECTOR **************************/
// Get visisble expenses

/*********************** STORE **************************/


store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

/*********************** DISPATCH ACTIONS **************************/
const expense1 = store.dispatch(addExpense({description: 'Rent', note: '',  amount: 36000, createdAt: -2100}))
const expense2 = store.dispatch(addExpense({description: 'Coffee', note: '',  amount: 350, createdAt:-1000}))


// store.dispatch(removeExpense({ id: expense1.expense.id } ))

// store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('f'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

/**
 * const demoState = {
        expenses: [{
            id: 'randomID',
            description: 'January Rent',
            note: 'The rent has been raised, too expensive',
            amount: 36000,
            createAt: 0
        }],
        filters: {
            text: 'rent',
            sortBy: 'amount', //date or amount
            startDate: undefined,
            endDate: undefined
        }
    }
 */


