import React, { Component, useState } from "react";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import CheckboxField from "react-native-checkbox-field"; // Field with label
import DatePicker from "react-native-datepicker";
import { NavigationEvents } from "@react-navigation/native";
import { LogBox } from "react-native";

import {
  Alert,
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Button,
  Linking,
  Platform,
  Picker,
  KeyboardAvoidingView,
} from "react-native";

import Hyperlink from "react-native-hyperlink";
import { Input, Text } from "react-native-elements";
import { Checkbox } from "react-native-checkbox-field"; // Checkbox only
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./Dashboard";
import ClientHeader from "./ClientHeader";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CardExpiryMonth from "./data/CardExpiryMonth";
import CardExpiryYear from "./data/CardExpiryYear";
import RNPickerSelect from "react-native-picker-select";
const myFont = Platform.OS === "ios" ? "Arial" : "sans-serif";
import { vw, vh } from "react-native-viewport-units";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { acc, color } from "react-native-reanimated";
////console.log("vw " + vw);
////console.log("vh " + vh);

console.disableYellowBox = true;
console.ignoredYellowBox = true;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const Drawer = createDrawerNavigator();

let month = "Jan";

////console.log("Width is");
let size = "5%";
let rights = "65%";
let myTop = 25;
let paynowLeft = 100;
let paynowView = 50;
let errormessageCCView = 55;
let agreeView = 55;
let expMonthLabelTop = 15;
let expYearLabelTop = 12;
let cvvViewTop = 50;
let expYearLabelView = 55;
let datePickerTop = 20;
let myFontSizean = 17;
let datePickerTextTop = 16;
let expMonthLabelView = 35;
let datePickerFontSize = 16;
let myTop2 = 50;
let containerTop = 44;
let aggreementText = 12;
if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 360) {
  paynowLeft = 60;
  paynowView = 70;
  agreeView = 65;
  size = 4;
  rights = 40;
  myTop = 35;
  myTop2 = 60;
  cvvViewTop = 60;
  errormessageCCView = 75;
  containerTop = 44;
  expMonthLabelTop = 20;
  datePickerTextTop = 14;
  datePickerTop = 8;
  expMonthLabelTop = Platform.OS === "ios" ? 20 : 13;
  expYearLabelTop = Platform.OS === "ios" ? 20 : 13;
  expMonthLabelView = 45;
  expYearLabelView = 65;
  myFontSizean = Platform.OS === "ios" ? 15 : 14;
  aggreementText = 10;
} else if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 415) {
  size = 10;
  rights = 40;
  ////console.log(SCREEN_WIDTH);
  datePickerFontSize = 18;
}
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

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

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    inactiveColor="black"
    style={{ backgroundColor: "#3b6e8f" }}
  />
);

const FirstRoute = (props) => {
  function ActivityIndicator({ visible = false }) {
    if (!visible) return null;

    return (
      <View style={styles.overlay}>
        <LottieView autoPlay loop source={require("../assets/loader.json")} />
      </View>
    );
  }

  const [accept, setaccept] = useState(false);
  const [cardName, setcardName] = useState("");
  const [cardNumber, setcardNumber] = useState();
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [cvv, setcvv] = useState();
  const [zipcode, setzipcode] = useState("");
  const [errorMessage, seterrorMessage] = useState(false);
  const [errorMessgeValue, seterrorMessgeValue] = useState("");
  const [appLoading, setappLoading] = useState(false);

  const toggle = () => {
    setaccept(!accept);
  };

  ////console.log("On Payment");
  ////console.log(props);

  const submitPayment = () => {
    /*     props.customObject.reset({
      index: 0,
      routes: [{ name: "Payment" }],
    });

 */ if (
      props.customObject.isSelected === ""
    ) {
      Alert.alert(
        "Payment Error",
        "Please select payment amount from the dropdown to proceed.",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return null;
    }
    if (
      props.customObject.isSelected === "other" &&
      props.customObject.otherAmount > props.customObject.totalAmount
    ) {
      Alert.alert(
        "Payment Error",
        "Payment amount should not be more than total balance.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return null;
    }
    if (
      props.customObject.isSelected === "other" &&
      props.customObject.otherAmount < 1
    ) {
      //    //console.log("Inside true");
      Alert.alert(
        "Payment Error",
        "Payment amount should be more than a dollar",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return null;
    }

    setappLoading(true);

    setTimeout(() => {
      setappLoading(false);
      if (props.customObject.isSelected === "total") {
        props.customObject.onPayment(props.customObject.totalAmount);
        // props.customObject.reset({ routes: [{ name: "Payment" }] });
        props.customObject.navigate("Summary");
      } else if (props.customObject.isSelected === "invoice") {
        props.customObject.onPayment(props.customObject.amountDue);
        props.customObject.navigate("Summary");
        // props.customObject.reset({ routes: [{ name: "Payment" }] });
      } else {
        props.customObject.onPayment(props.customObject.otherAmount);
        props.customObject.navigate("Summary");
      }
    }, 2000);
  };

  return (
    <>
      <ActivityIndicator visible={appLoading} />
      <View style={[styles.scene]}>
        <View style={{ flex: 0.1 }}>
          <Input
            placeholder="Name on Card"
            style={{ textAlign: "justify" }}
            leftIcon={{
              type: "font-awesome",
              name: "user-o",
              color: "#3b6e8f",
            }}
            keyboardType="name-phone-pad"
            returnKeyType="done"
            keyboardAppearance="light"
            style={{ fontSize: 18, fontFamily: myFont }}
          />
        </View>
        <View style={{ flex: 0.1, top: 10 }}>
          <Input
            placeholder="Credit Card"
            leftIcon={{
              type: "font-awesome",
              name: "credit-card",
              color: "#3b6e8f",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            keyboardAppearance="light"
            style={{ fontSize: 18, fontFamily: myFont }}
            maxLength={14}
          />
        </View>
        <View
          style={{
            flex: 0.13,
            flexDirection: "row",
            top: expMonthLabelView,
          }}
        >
          <View style={{ width: "50%" }}>
            <RNPickerSelect
              placeholder={{ label: "Month" }}
              items={CardExpiryMonth.getMonth()}
              onValueChange={(value) => {}}
              style={{
                ...pickerSelectStyles2,
                placeholder: {
                  color: "black",
                  textAlign: "left",
                  fontFamily: myFont,
                  fontSize: 18,
                  color: "grey",
                },
              }}
            />
          </View>
          <View style={{ width: "50%" }}>
            <RNPickerSelect
              placeholder={{ label: "Year" }}
              items={CardExpiryYear.getYear()}
              onValueChange={(value) => {}}
              style={{
                ...pickerSelectStyles3,
                placeholder: {
                  color: "black",
                  textAlign: "left",
                  fontFamily: myFont,
                  fontSize: 18,
                  color: "grey",
                },
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.13,
            flexDirection: "row",
            top: cvvViewTop,
          }}
        >
          <View style={{ width: "50%" }}>
            <Input
              inputContainerStyle={{
                borderBottomWidth: 0,
                textAlign: "left",
                width: "100%",
                left: 1,
              }}
              style={{
                left: 1,
                borderColor: "grey",
                borderWidth: 1,
                textAlign: "left",
                paddingLeft: 10,
                fontFamily: myFont,
              }}
              keyboardType="number-pad"
              returnKeyType="done"
              placeholder="CVV"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Input
              inputContainerStyle={{
                borderBottomWidth: 0,
                textAlign: "center",
                width: "100%",
                left: 1,
              }}
              style={{
                left: 1,
                borderColor: "grey",
                borderWidth: 1,
                textAlign: "left",
                paddingLeft: 10,
                fontFamily: myFont,
              }}
              keyboardType="number-pad"
              returnKeyType="done"
              placeholder="Zipcode"
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            top: agreeView,
          }}
        >
          <CheckboxField
            onSelect={toggle}
            selected={accept}
            label="I accept billing terms and agreement"
            labelSide="right"
            containerStyle={{
              flex: 1,
              flexDirection: "row",
              minWidth: "100%",
              left: 10,
              fontFamily: myFont,
            }}
            labelStyle={{ left: 10, top: 4, fontFamily: myFont }}
            selectedColor="#247fd2"
          >
            <Icon name="check" color="#fff" />
          </CheckboxField>
        </View>

        <View
          style={{
            flex: 0.18,
            flexDirection: "row",
            top: paynowView,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              submitPayment();
            }}
          >
            <Text style={styles.myText}>Submit Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const SecondRoute = () => {
  const [accept, setaccept] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const [date, setDate] = useState("2020-05-15");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const toggle = () => {
    setaccept(!accept);
  };

  const submitPayment = () => {
    seterrorMessage(!errorMessage);
  };

  return (
    <View style={[styles.scene]}>
      <View style={{ flex: 0.1, top: 10 }}>
        <Input
          placeholder="Routing Number"
          leftIcon={{
            type: "material-community",
            name: "bank",
            color: "#3b6e8f",
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          keyboardAppearance="light"
          style={{ fontSize: 18, fontFamily: myFont }}
        />
      </View>
      <View style={{ flex: 0.1, top: 20 }}>
        <Input
          placeholder="Account Number"
          style={{ textAlign: "justify" }}
          leftIcon={{
            type: "material-community",
            name: "bank",
            color: "#3b6e8f",
          }}
          keyboardType="name-phone-pad"
          returnKeyType="done"
          keyboardAppearance="light"
          style={{ fontSize: 18, fontFamily: myFont }}
        />
      </View>
      <View style={{ flex: 0.1, top: 30 }}>
        <Input
          placeholder="Confirm Account Number"
          style={{ textAlign: "justify" }}
          leftIcon={{
            type: "material-community",
            name: "bank",
            color: "#3b6e8f",
          }}
          keyboardType="name-phone-pad"
          returnKeyType="done"
          keyboardAppearance="light"
          style={{ fontSize: 18, fontFamily: myFont }}
        />
      </View>

      <View
        style={{
          flex: 0.13,
          flexDirection: "row",
          top: expMonthLabelView,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              paddingRight: 2,
              paddingLeft: 3,
              left: 5,
              top: datePickerTextTop,
              fontFamily: myFont,
              color: "gray",
              fontSize: datePickerFontSize,
            }}
          >
            When would you like to Pay ?
          </Text>
        </View>

        <View style={{ width: "50%" }}>
          {show && (
            <DatePicker
              style={{ top: datePickerTop }}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 0.13,
          flexDirection: "row",
          top: cvvViewTop,
        }}
      >
        <View style={{ width: "50%" }}>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
              textAlign: "center",
              width: "100%",
              left: 1,
            }}
            style={{
              left: 1,
              borderColor: "grey",
              borderWidth: 1,
              textAlign: "center",
              fontFamily: myFont,
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="CVV"
          />
        </View>
        <View style={{ width: "50%" }}>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
              textAlign: "center",
              width: "100%",
              left: 1,
            }}
            style={{
              left: 1,
              borderColor: "grey",
              borderWidth: 1,
              textAlign: "center",
              fontFamily: myFont,
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="Zipcode"
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          top: agreeView,
        }}
      >
        <CheckboxField
          onSelect={toggle}
          selected={accept}
          label="I accept billing terms and agreement"
          labelSide="right"
          containerStyle={{
            flex: 1,
            flexDirection: "row",
            minWidth: "100%",
            left: 10,
            fontFamily: myFont,
          }}
          labelStyle={{ left: 10, top: 4, fontFamily: myFont }}
          selectedColor="#247fd2"
        >
          <Icon name="check" color="#fff" />
        </CheckboxField>
      </View>

      <View
        style={{
          flex: 0.17,
          flexDirection: "row",
          top: paynowView,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            submitPayment();
          }}
        >
          <Text style={styles.myText}>Submit Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MenuIcon = ({ DrawerProp }) => (
  <Icon
    name="three-bars"
    style={{
      top: size,
      right: rights,
      width: "50%",
      height: "100%",
      aspectRatio: 1,
    }}
    color="white"
    size={40}
    onPress={() => {
      /* //console.log(DrawerProp); */
      return DrawerProp.openDrawer();
    }}
  />
);

export default class Payment extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    console.ignoredYellowBox = true;
    /*     //console.log("props in constructor");
    //console.log(this.props);
 */ this.state = {
      uniqueValue: 1,
      country: "invoice",
      disp: false,
      index: 0,
      other: 0,
      routes: [
        { key: "first", title: "Credit-Card" },
        { key: "second", title: "Bank-Account" },
      ],
      flex1: 0.1,
      flex2: 0.7,
      totalAmount: this.props.route.params.accountBalance,
      amountDue: this.props.route.params.amountDue,
      onPayment: this.props.route.params.onPayment,
      isSelected: "",
    };
  }

  _handleIndexChange = (index) => {
    this.setState({ index });
  };

  componentDidMount() {
    //console.log("******************** Mounted ***********************");
  }

  componentDidUpdate(prevprops) {
    if (
      this.props.route.params.accountBalance !=
        prevprops.route.params.accountBalance ||
      this.props.route.params.amountDue != prevprops.route.params.amountDue
    ) {
      console.log("************** Component Updated ******************");
      this.setState({ uniqueValue: this.state.uniqueValue + 1 });
      this.setState({
        totalAmount: this.props.route.params.accountBalance,
        amountDue: this.props.route.params.amountDue,
        disp: false,
      });
      this.setState({ flex1: 0.1 });
      this.setState({ flex2: 0.8 });

      //console.log("Going to call Render ()");
      this.render();
    }
  }

  render() {
    console.ignoredYellowBox = true;
    const test = () => {
      return [
        {
          label: "Invoice Amount Due     : $" + this.state.amountDue,
          value: "invoice",
        },
        {
          label: "Total Account Balance       : $" + this.state.totalAmount,
          value: "total",
        },
        {
          label: "Other",
          value: "other",
        },
      ];
    };

    console.log("Payment ******* ");

    //console.log(this.props.route.params);

    let customObject = {
      navigate: this.props.navigation.navigate,
      pop: this.props.navigation.pop,
      reset: this.props.navigation.reset,
      onPayment: this.state.onPayment,
      otherAmount: this.state.other,
      totalAmount: this.state.totalAmount,
      amountDue: this.state.amountDue,
      isSelected: this.state.isSelected,
    };

    ////console.log(customObject);

    const renderScene = SceneMap({
      first: () => <FirstRoute customObject={customObject} />,

      second: SecondRoute,
    });

    const initialLayout = {
      width: Dimensions.get("window").width,
    };
    ////console.log(Dimensions.get("window").height + "ht");
    return (
      <View
        key={this.state.uniqueValue}
        style={{
          flex: 1,
          flexDirection: "column",
          minHeight: Dimensions.get("window").height,
        }}
      >
        <MyStatusBar backgroundColor="black" barStyle="light-content" />
        <ClientHeader myNavigation={this.props.navigation} />

        <View
          style={{
            flex: this.state.flex1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <RNPickerSelect
            onValueChange={(item) => {
              if (item === null) return;
              ////console.log(item);
              if (item === "other") {
                this.setState({ isSelected: "other" });
                this.setState({ disp: true });
                this.setState({ flex1: 0.2 });
                this.setState({ flex2: 0.7 });
              } else if (item === "total") {
                this.setState({ isSelected: "total" });
                this.setState({ disp: false });
                this.setState({ flex1: 0.1 });
                this.setState({ flex2: 0.8 });
              } else if (item === "invoice") {
                this.setState({ isSelected: "invoice" });
                this.setState({ disp: false });
                this.setState({ flex1: 0.1 });
                this.setState({ flex2: 0.8 });
              }
              this.setState({
                country: item.value,
              });
            }}
            items={test()}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: "yellow" }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          />
          {this.state.disp && (
            <Input
              placeholder="Amount"
              value={this.state.other}
              onChange={(e) => {
                this.setState({ other: Number(e.nativeEvent.text) });
              }}
              leftIcon={{
                type: "font-awesome",
                name: "dollar",
                color: "#3b6e8f",
              }}
              keyboardType="numeric"
              returnKeyType="done"
            />
          )}
        </View>
        <View
          style={{
            flex: this.state.flex2,
            flexDirection: "column",
          }}
        >
          <TabView
            navigationState={this.state}
            renderScene={renderScene}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            /* backgroundColor: "gold", */
          }}
        >
          <Text style={styles.agreementText}>
            By visiting our web site, you accept the terms and conditions as
            described in our
            <Text style={styles.agreementLinkText}> Terms and Agreements</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "black",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
  agreementLinkText: {
    fontFamily: myFont,
    color: "black",
    fontSize: aggreementText,
    paddingTop: 5,
    textDecorationStyle: "double",

    textDecorationColor: "black",
    textDecorationLine: "underline",
  },
  agreementText: {
    fontFamily: myFont,
    color: "black",
    fontSize: aggreementText,
    paddingTop: 5,
    marginTop: 25,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#3b6e8f",
    padding: 10,
    width: 200,
    height: "70%",
    justifyContent: "center",
    left: paynowLeft,
    borderRadius: 20,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#3b6e8f",
    padding: 10,
    width: 200,
    height: "85%",
    justifyContent: "center",
    left: paynowLeft,
    borderRadius: 20,
  },
  myText: { fontFamily: myFont, color: "white", fontSize: 18 },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },

  scene: {
    flex: 1,
    flexDirection: "column",
    /* backgroundColor: "orange", */
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const pickerSelectStyles1 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 150,
    top: myTop,
    left: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 130,
    left: 8,
    top: myTop,
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: "91%",

    left: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: "91%",
    left: 5,
  },
});

const pickerSelectStyles3 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    textAlign: "left",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: "90%",
    left: 13,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: "90%",
    left: 25,
  },
});
