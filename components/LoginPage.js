import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import AnimatedLottieView from "lottie-react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class Login extends Component {
  state = {
    dimensions: {
      window,
      screen,
    },
  };

  onChange = ({ window, screen }) => {
    console.log("onChange");
    this.setState({ dimensions: { window, screen } });
  };

  componentDidMount() {
    console.log("componentDidMount");
    Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  }

  render() {
    const { dimensions } = this.state;

    const width = dimensions.window.width / 4;
    const height = dimensions.window.height / 3;

    console.log("Height : " + height);
    console.log("Width : " + width);

    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            flex: 1,
          }}
        >
          <TextInput
            placeholder="UserName"
            placeholderTextColor="grey"
            place
            style={{
              width: "80%",
              height: "8%",
              color: "grey",
              textAlign: "center",
              borderRadius: 20,
              borderColor: "grey",
              borderWidth: 2,
              shadowRadius: 10,
              shadowOpacity: 10,
              shadowColor: "grey",
            }}
          ></TextInput>
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            place
            style={{
              width: "80%",
              height: "8%",
              color: "grey",
              textAlign: "center",
              borderRadius: 20,
              marginTop: 10,
              borderColor: "grey",
              borderWidth: 2,
              shadowRadius: 10,
              shadowOpacity: 10,
              shadowColor: "grey",
            }}
          ></TextInput>
          <TouchableOpacity
            style={{
              width: "50%",
              height: "8%",
              color: "white",
              textAlign: "center",
              borderRadius: 20,
              marginTop: 15,
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                width: "100%",
                height: "100%",
                color: "white",
                textAlign: "center",
                borderRadius: 20,
                marginTop: 15,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
