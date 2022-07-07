import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseID = route.params?.expenseID;
    const isEditing = !!editedExpenseID;

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: isEditing ? "Edit expense" : "Add expense",
            },
            [navigation, isEditing]
        );
    });

    const deleteExpenseHandler = () => {
        navigation.goBack();
    };
    const cancelHandler = () => {
        navigation.goBack();
    };
    const confirmHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button
                    mode="flat"
                    onPress={cancelHandler}
                    style={styles.buttonStyle}
                >
                    Cancel
                </Button>
                <Button onPress={confirmHandler} style={styles.buttonStyle}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
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
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});

export default ManageExpense;
