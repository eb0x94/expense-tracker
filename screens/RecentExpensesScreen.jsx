import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const days7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > days7DaysAgo) && (expense.date <= today);
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days."
            fallbackText="No expenses in the last 7 days."
        />
    );
};

export default RecentExpenses;
