import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpense from "./screens/ManageExpenseScreen";
import RecentExpenses from "./screens/RecentExpensesScreen";
import Expenses from "./screens/ExpensesScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

let ExpensesOverview = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate("ManageExpense");
                        }}
                    />
                ),
            })}
        >
            <BottomTab.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" color={color} size={size} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="AllExpenses"
                component={Expenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={size} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.colors.primary500,
                        },
                        headerTintColor: "white",
                    }}
                >
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        options={{
                            presentation:'modal',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({});
