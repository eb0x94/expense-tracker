import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const Expenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput
            expenses={expensesCtx.expenses}
            expensesPeriod="Total"
            fallbackText="You have not spent money."
        />
    );
};

export default Expenses;
