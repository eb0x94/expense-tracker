import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
let ExpenseForm = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultExpenseValues,
}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultExpenseValues
                ? defaultExpenseValues.amount.toString()
                : "",
            isValid: true,
        },
        date: {
            value: defaultExpenseValues
                ? getFormattedDate(defaultExpenseValues.date)
                : "",
            isValid: true,
        },
        description: {
            value: defaultExpenseValues ? defaultExpenseValues.description : "",
            isValid: true,
        },
    });

    let inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };

    let submitHandler = () => {
        let expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        let isAmountValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        let isDateValid = expenseData.date.toString() !== "Invalid Date";
        let isDescriptionValid = expenseData.description.trim().length > 0;

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            //show some feedback
            setInputs((currentInputs) => {
                return {
                    amount: {
                        value: currentInputs.amount.value,
                        isValid: isAmountValid,
                    },
                    date: {
                        value: currentInputs.date.value,
                        isValid: isDateValid,
                    },
                    description: {
                        value: currentInputs.description.value,
                        isValid: isDescriptionValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    };

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                        invalid: !inputs.amount.isValid
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLenght: 10,
                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputs.date.value,
                        invalid: !inputs.date.isValid
                    }}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    // autoCapitalize: "none", => Default is 'sentences'
                    // autoCorrect: false, => Default is true.
                    onChangeText: inputChangedHandler.bind(this, "description"),
                    value: inputs.description.value,
                    invalid: !inputs.description.isValid
                }}
            />
            {formIsInvalid && (
                <Text style={styles.invalidText}>
                    Form is invalid! Please, check your input
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button
                    mode="flat"
                    onPress={onCancel}
                    style={styles.buttonStyle}
                >
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.buttonStyle}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    form: { marginTop: 40 },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center",
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
    invalidText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});

export default ExpenseForm;
