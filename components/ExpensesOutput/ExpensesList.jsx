import { StyleSheet, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
    return (
        <ExpenseItem
            description={itemData.item.description}
            amount={itemData.item.amount}
            date={itemData.item.date}
            id={itemData.item.id}
        />
    );
};

const ExpensesList = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({});

export default ExpensesList;
