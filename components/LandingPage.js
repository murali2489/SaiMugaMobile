import React, { Component } from "react";
import LottieView from "lottie-react-native";
import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Button,
  Linking,
  Platform,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import Svg, { Defs, Pattern, Image, G, Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Octicons";
import { Header } from "react-native-elements";
import { Input } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Icons from "react-native-vector-icons/FontAwesome";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "./Dashboard";
import RightSide from "./RightSide";

import CNACarousel from "./CNACarousel";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Settings" component={Setting} />
  </Drawer.Navigator>
);

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const SCREEN_WIDTH = Dimensions.get("window").width;
console.log("Width is");
const SCREEN_HEIGHT = Dimensions.get("window").height;
console.log("height is " + SCREEN_HEIGHT);
let size = "5%";
let rights = "65%";
let menuDotsBottom = 4;
if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 360) {
  size = "0%";
  rights = "65%";
} else if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 415 && SCREEN_HEIGHT < 737) {
  size = "2%";
  rights = "55%";
  menuDotsBottom = 5;
} else if (SCREEN_HEIGHT < 812) {
  size = "2%";
  menuDotsBottom = 12;
}
console.log(SCREEN_WIDTH);
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const myFont = Platform.OS === "ios" ? "Arial" : "sans-serif";

const MenuIcon = ({ DrawerProp }) => (
  <Icon
    name="three-bars"
    style={{
      top: size,
      right: rights,
      width: "50%",
      height: "5%",
      aspectRatio: 1,
    }}
    color="grey"
    size={40}
    onPress={() => {
      return null;
    }}
  />
);

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView autoPlay loop source={require("../assets/loader.json")} />
    </View>
  );
}

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      errorMessage1: "",
      appLoading: false,
    };
  }

  updateUserName = (value) => {
    console.log("updateUserName " + value);
    console.log(this.state.password);
  };

  handleLogin = () => {
    console.log("handlelogin");
    /* this.props.navigation.navigate("Summary"); */

    this.clearErrors();

    if (this.state.username === "") {
      this.setState({ errorMessage: "please enter emailaddress" });
    }

    if (this.state.password === "") {
      this.setState({ errorMessage1: "please enter password !!!" });
      return null;
    }

    if (
      this.state.username === "Jackson@fishingcorp.com" &&
      this.state.password === "Bond123"
    ) {
      this.setState({ appLoading: true });

      setTimeout(() => {
        this.setState({ appLoading: false });
        this.props.navigation.navigate("Summary");
      }, 2000);
    } else if (this.state.username != "" && this.state.password != "") {
      this.setState({ errorMessage: "Username or Password is incorrect !!!" });
      this.setState({ errorMessage1: "Username or Password is incorrect !!!" });
      return null;
    }
  };

  clearErrors = () => {
    this.setState({ errorMessage: "", errorMessage1: "" });
  };

  render() {
    console.log("inside dashboard");

    return (
      <>
        <ActivityIndicator visible={this.state.appLoading} />
        <View
          style={{
            flex: 2,
            backgroundColor: "white",
            flexDirection: "column",
            minHeight: Dimensions.get("window").height,
          }}
        >
          <MyStatusBar backgroundColor="black" barStyle="light-content" />
          <View
            style={{
              flex: 0.1,
              flexDirection: "row",
              /* backgroundColor: "yellow", */
            }}
          >
            <Svg viewBox="8 0 80 44" style={{ width: "20%" }}>
              <Defs>
                <Pattern
                  id="prefix__a"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  viewBox="0 0 120 57"
                >
                  <Image
                    width={120}
                    height={57}
                    //             xlinkHref="data:image/png;base64,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"
                  />
                </Pattern>
              </Defs>
              <Path
                data-name="Image 1"
                fill="url(#prefix__a)"
                d="M0 0h93v44H0z"
              />
            </Svg>

            <Svg
              style={{
                /* backgroundColor: "green" */
                bottom: menuDotsBottom,
              }}
              width="80%"
              height="100%"
              viewBox="0 0 325.41 62.218"
            >
              <Path
                data-name="Path 12"
                d="M55.524 0H325.41v62.218H0z"
                fill="#343a40"
              />
            </Svg>
            <MenuIcon DrawerProp={this.props.navigation} />
          </View>
          <View
            style={{
              flex: 0.9,
              backgroundColor: "white",
              flexDirection: "column",
            }}
          >
            <CNACarousel />
            <Input
              placeholder="Email Address"
              value={this.state.username}
              errorStyle={{ color: "red" }}
              errorMessage={this.state.errorMessage}
              onChange={(e) => {
                this.setState({ username: e.nativeEvent.text });
              }}
              leftIcon={<Icon name="mail" size={24} color="black" />}
              keyboardType="email-address"
            />
            <Input
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.nativeEvent.text });
              }}
              secureTextEntry={true}
              errorStyle={{ color: "red" }}
              errorMessage={this.state.errorMessage1}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleLogin();
              }}
            >
              <Text style={styles.myText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              <Text style={styles.linkText1}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.register}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              <Text style={styles.myText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link1}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              <Text style={styles.linkText}>Continue As Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  button: {
    alignItems: "center",
    backgroundColor: "linear-gradient(rgb(253, 0, 0), rgb(152, 0, 5))",
    padding: 10,
    width: "75%",
    left: "12%",
    borderRadius: 20,
  },
  register: {
    alignItems: "center",
    backgroundColor: "linear-gradient(rgb(253, 0, 0), rgb(152, 0, 5))",
    padding: 10,
    width: "75%",
    left: "12%",
    top: "2%",
    borderRadius: 20,
  },
  link: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 1,
    width: "30%",
    left: "60%",
    top: "1%",
  },
  link1: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 1,
    width: "30%",
    left: "35%",
    top: "5%",
  },
  myText: { fontFamily: myFont, color: "white", fontSize: 18 },
  linkText: {
    fontFamily: myFont,
    color: "black",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  linkText1: {
    fontFamily: myFont,
    color: "black",
    fontSize: 12,
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
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
});
