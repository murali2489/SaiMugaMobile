import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
const Stack = createStackNavigator();

const AuthNavigator = () => {
  <Stack.Navigator>
    <Stack.Screen
      name="LandingPage"
      component={LandingPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginPage} />
  </Stack.Navigator>;
};

export default AuthNavigator;
