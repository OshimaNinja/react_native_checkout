import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/Checkout";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={ProductList}
            options={{ title: "Products" }}
          />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Checkout" component={CheckoutPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
