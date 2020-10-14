const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {  
        case 'ADD_EXPENSE':
            // don't use push() to manipulate the array, since it return a new array -> use concat() or spread operator
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id); //filter returns a new array
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {...expense, ...action.updates}
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

export default expensesReducer;