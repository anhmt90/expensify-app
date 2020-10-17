import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase-config';

// create the configuration to allow all test cases to create tge sane mock store
const createMockStore = configureMockStore([thunk]);

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
    const action = editExpense(expectedID, { note: expedtedNote })
    expect(action).toStrictEqual({
        type: 'EDIT_EXPENSE',
        id: expectedID,
        updates: {
            note: expedtedNote
        }
    })
})

test('should setup add expense action oject with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toStrictEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// test('should setup add expense action oject with default values', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     })
// })

test('should add expense to db and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 1000,
        note: 'New mouse for gaming',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // force jest to wait for asyn function
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore();
    const expenseDefaults = {description: '', note: '', amount: 0, createdAt: 0};
    store.dispatch(startAddExpense(expenseDefaults)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); // force jest to wait for asyn function
    });
});