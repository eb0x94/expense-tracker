import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import Expenses from "./screens/Expenses";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

let ExpensesOverview = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="RecentExpenses"
                component={RecentExpenses}
            />
            <BottomTab.Screen name="AllExpenses" component={Expenses} />
        </BottomTab.Navigator>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({});
