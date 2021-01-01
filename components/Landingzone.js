import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Landingzone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("this.props");
    console.log(this.props.navigation);
    return (
      <View>
        <Text> Landingzone </Text>
      </View>
    );
  }
}
