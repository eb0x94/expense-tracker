import { StyleSheet, View, Text, Pressable } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ description, amount, date, id }) => {
    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate("ManageExpense", { expenseID: id });
    };

    return (
        <Pressable
            onPress={expensePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.descriptionText]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>£{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 4,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowRadius: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    descriptionText: {
        fontSize: 18,
        marginBottom: 4,
        fontWeight: "bold",
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.75,
    },
});

export default ExpenseItem;
