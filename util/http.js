import axios from "axios";

const BACKEND_URL =
    "https://react-native-course-421af-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData) => {
    const response = await axios.post(
        BACKEND_URL + "/expenses.json",
        expenseData
    );
    const id = response.data.name;
    return id;
};

export const fetchExpenses = async () => {
    let response = await axios.get(BACKEND_URL + "/expenses.json");
    let fetchedExpenses = [];

    for (let key in response.data) {
        let expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };

        fetchedExpenses.push(expenseObj);
    }

    return fetchedExpenses;
};

export const updateExpense = (id, updateExpenseData) => {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, updateExpenseData);
};

export const deleteExpense = (id) => {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
