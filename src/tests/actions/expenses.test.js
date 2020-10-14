import { addExpense, editExpense, removeExpense } from '../../actions/expenses'


test('should setup remove expense action object', () => {
    const expectedID = 'myId123';
    const action = removeExpense(expectedID);
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: expectedID
    });
});

test('should setup edit expense action object', () => {
    const expectedID = 'myId123'
    const expedtedNote = 'New note value'
    const action = editExpense(expectedID, {note: expedtedNote})
    expect(action).toStrictEqual({
        type: 'EDIT_EXPENSE',
        id: expectedID,
        updates: {
            note: expedtedNote
        }
    })
})

test('should setup add expense action oject with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 36000,
        createdAt: 1000,
        note: 'This was last months rent'
    }
    const action = addExpense(expenseData)
    expect(action).toStrictEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup add expense action oject with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})