import React from "react";
import { View, Text } from "react-native";
import MyHeader from "./MyHeader";

const Settings = (props) => {
  return (
    <View>
      <MyHeader navigation={props.navigation} title="Home" />
      <Text>This is Settings Screen</Text>
    </View>
  );
};

export default Settings;
