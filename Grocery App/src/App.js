import React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import DrawerNav from "./Navigation/DrawerNav";
import SplashScreen from "./screens/Splash";
import ProductDetail from "./screens/ProductDetail";
import LoginScreen from "./screens/Login";
import PasswordEdit from "./screens/UpdateProfile";
import Register from "./screens/Register";
import Account from "./screens/Account";
import Cart from './screens/Cart';
import Notifications from "./screens/Notifications";
import SoftDrink from "./screens/SoftDrink";
import BabyCare from "./screens/BabyCare";
import SkinCare from "./screens/SkinCare";
import Fruits from "./screens/Fruits";
import Oats from "./screens/Oats";
import Masala from "./screens/Masala";
import Snacks from "./screens/Snacks";
import Vegetables from "./screens/vegetables";
import Payment from "./screens/Payment";
import OrderFailed from "./screens/OrderFailed";
import OrderSuccessful from "./screens/OrderSuccessful";
import OrderDetail from "./screens/OrderDetail";


export default function App() {
    const Stack = createStackNavigator();
    const [splash, setSplash] = useState(true);
    const [login, setLogin] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
        }, 3000);
    }, []);
    return (

        <NavigationContainer>
            <Stack.Navigator >
                {splash ? (<Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />) : null}
                <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PasswordEdit" component={PasswordEdit} options={{ headerShown: false }} />
                <Stack.Screen name="notification" component={Notifications} options={{ headerShown: false }} />
                <Stack.Screen name="Drink" component={SoftDrink} options={{ headerShown: false }} />
                <Stack.Screen name="BabyCare" component={BabyCare} options={{ headerShown: false }} />
                <Stack.Screen name="SkinCare" component={SkinCare} options={{ headerShown: false }} />
                <Stack.Screen name="Fruits" component={Fruits} options={{ headerShown: false }} />
                <Stack.Screen name="Oats" component={Oats} options={{ headerShown: false }} />
                <Stack.Screen name="Masala" component={Masala} options={{ headerShown: false }} />
                <Stack.Screen name="Snacks" component={Snacks} options={{ headerShown: false }} />
                <Stack.Screen name="Vegetables" component={Vegetables} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
                <Stack.Screen name="Successful" component={OrderSuccessful} options={{ headerShown: false }} />
                <Stack.Screen name="Failed" component={OrderFailed} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}