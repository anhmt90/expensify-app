const selectExpensesTotal = (expenses) => {
    return expenses.map((exp) => exp.amount).reduce((total, cur) => total + cur, 0);
};

export default selectExpensesTotal;

