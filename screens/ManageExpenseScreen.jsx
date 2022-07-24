import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseID = route.params?.expenseID;
    const isEditing = !!editedExpenseID;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseID
    );

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: isEditing ? "Edit expense" : "Add expense",
            },
            [navigation, isEditing]
        );
    });

    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseID);
        navigation.goBack();
    };
    const cancelHandler = () => {
        navigation.goBack();
    };
    const confirmHandler = (expenseData) => {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseID, expenseData);
        } else {
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? "Update" : "Add"}
                defaultExpenseValues={selectedExpense}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});

export default ManageExpense;
