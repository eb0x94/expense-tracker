import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of glasses",
        amount: 3.0,
        date: new Date("2021-12-09"),
    },
    {
        id: "e2",
        description: "Dinner",
        amount: 55.3,
        date: new Date("2022-01-19"),
    },
    {
        id: "e3",
        description: "A pair of trousers",
        amount: 49.12,
        date: new Date("2020-05-29"),
    },
    {
        id: "e4",
        description: "A book",
        amount: 12.99,
        date: new Date("2020-05-29"),
    },
    {
        id: "e5",
        description: "Another book",
        amount: 49.12,
        date: new Date("2022-04-29"),
    },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const newId = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: newId }, ...state];
        case "UPDATE":
            const indexToUpdate = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const expenseToUpdate = state[indexToUpdate];
            const updatedExpense = {
                ...expenseToUpdate,
                ...action.payload.data,
            };
            const expensesToUpdate = [...state];
            expensesToUpdate[indexToUpdate] = updatedExpense;
            return expensesToUpdate;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
};

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    );

    const addExpense = (expenseData) => {
        dispatch({ type: "ADD", payload: expenseData });
    };
    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };
    const updateExpense = (id, expenseData) => {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;
