import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

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

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:24,
        paddingVertical:24,
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex:1
    },

});

export default ExpensesOutput;
