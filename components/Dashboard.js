import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Header } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Tweets" component={Tweets} />
    <Drawer.Screen name="Summary" component={LandingPage} />
  </Drawer.Navigator>
);

export default class Dashboard extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/home.png")}
      >
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <SafeAreaView>
          <Text style={styles.dashboard}>DashBoard</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  dashboard: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 27,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 130,
    height: 36,
    left: 10,
    top: 25,
  },
});
