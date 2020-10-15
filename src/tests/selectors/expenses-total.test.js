import selecExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () =>{
    const totalExpenses = selecal([]);
    expect(totalExpenses).toBe(0);
});

test('should correctly add up a single expense', () => {
    const totalExpenses = selecExpensesTotal([expenses[1]]);
    expect(totalExpenses).toBe(109500);
});

test('should correctly add up a multiple expenses', () => {
    const totalExpenses = selecExpensesTotal(expenses);
    expect(totalExpenses).toEqual(114195);
});
