import React from "react";
import ProductList from "../component/ProductList";
import { createStackNavigator } from "@react-navigation/stack";
import AddProduct from "../component/AddProduct";


const Stack = createStackNavigator();

const StackNavigation = () =>  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="NewProduct" component={AddProduct} />
    </Stack.Navigator>
  );
}

export default StackNavigation