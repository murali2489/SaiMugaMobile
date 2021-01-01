import React, { Component } from "react";
import LottieView from "lottie-react-native";
import MarqueeText from "react-native-marquee";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import { StackActions, CommonActions } from "@react-navigation/native";

import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Linking,
  Platform,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import Svg, {
  Defs,
  Pattern,
  Image,
  G,
  Path,
  Circle,
  TSpan,
} from "react-native-svg";
import Icon from "react-native-vector-icons/Octicons";
import { Header, Card } from "react-native-elements";
import { Input } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Icons from "react-native-vector-icons/FontAwesome";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "./Dashboard";
import RightSide from "./RightSide";
import { LogBox } from "react-native";
import CNACarousel from "./CNACarousel";
import ClientHeader from "./ClientHeader";
console.disableYellowBox = true;
console.ignoredYellowBox = true;

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

// width is 360pxs

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
////console.log("Width is " + SCREEN_WIDTH);
let size = "5%";
let rights = "65%";
let myFontSize = 20;
let myFontSizean = 17;
let amountFontSize = 50;
let accountNumberBottom = 20;
let paynowleft = 80;
let autopayleft = "22%";
let autopayTop = "10%";
let treeTop = 40;
let paperlessButtonTop = "20%";
let accountNumberViewTop = 15;
let amountDueViewTop = 30;
let submitPaymentViewTop = 40;
let autopayWidth = "63%";
let paybuttonWidth = "50%";
let cardFlex = 0.7;
let mainFlex = 0.6;
let aggreementText = 12;
let payMargin = 35;
if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 360) {
  size = 4;
  rights = 40;
  payMargin = 20;
  myFontSize = Platform.OS === "ios" ? 18 : 18;
  amountFontSize = 40;
  paybuttonWidth = "55%";
  autopayleft = "21%";
  autopayTop = "10%";
  myFontSizean = Platform.OS === "ios" ? 15 : 14;
  accountNumberBottom = 10;
  cardFlex = 0.75;
  mainFlex = 0.7;
  submitPaymentViewTop = 20;
  paynowleft = 55;
  accountNumberViewTop = -5;
  accountNumberViewTop = Platform.OS === "ios" ? 10 : 10;
  amountDueViewTop = Platform.OS === "ios" ? 20 : 20;
  submitPaymentViewTop = Platform.OS === "ios" ? 20 : 30;
  autopayWidth = "60%";
  paperlessButtonTop = "18%";
  aggreementText = 10;
} else if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 415 && SCREEN_HEIGHT < 737) {
  size = 10;
  rights = 40;
  cardFlex = 0.71;
} else if (SCREEN_HEIGHT < 812) {
  autopayWidth = "65%";
  treeTop: 50;
}
////console.log(SCREEN_WIDTH + "pxs");
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const myFont = Platform.OS === "ios" ? "AppleSDGothicNeo-Regular" : "Roboto";

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
      ////console.log(DrawerProp);
      return DrawerProp.openDrawer();
    }}
  />
);

export default class Summary extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
    console.ignoredYellowBox = true;
    this.state = {
      accountName: "Jacksonium Fishing Corporation and Logistics ",
      accountNumber: "012906674",
      totalAccountBalance: 23380,
      amountDue: 130,
      disablePayment: false,
      routes: [
        { key: "first", title: "Credit-Card" },
        { key: "second", title: "Bank-Account" },
      ],
      payColor: "#3b6e8f",
      flex1: 0.1,
      flex2: 0.7,
      accountMessage:
        "Your Payment is past Due, Please pay immediately to avoid cancellation !!!",
    };
  }

  handlePayment = (e) => {
    console.log("Handle Payment called");
    console.log(e);
    if (e === this.state.amountDue) {
      ////console.log("***************************1 **************************");
      //console.log("cxf1");
      this.setState({
        totalAccountBalance:
          this.state.totalAccountBalance - this.state.amountDue,
      });

      this.setState({ amountDue: 0 });
      //console.log("cxf2");
      this.setState({
        accountMessage:
          "No outstanding balance in your account . Thanks for being a valued customer !!! ",
      });
      return null;
    }

    if (e === this.state.totalAccountBalance) {
      ////console.log("***************************2 **************************");
      this.setState({
        totalAccountBalance: 0,
        amountDue: 0,
      });
      //console.log("cxf3");
      this.setState({
        accountMessage:
          "No outstanding balance in your account . Thanks for being a valued customer !!! ",
      });
      //console.log("fcx2");
      if (this.state.totalAccountBalance <= 0) {
        this.setState({ payColor: "#cccccc" });
        this.setState({ disablePayment: true });
      }
      return null;
    }

    if (this.state.amountDue != 0) {
      this.setState({
        totalAccountBalance: this.state.totalAccountBalance - e,
        amountDue: this.state.amountDue - e,
      });

      if (this.state.amountDue < 0) {
        this.setState({
          amountDue: 0,
        });
        //console.log("fcx3");
        if (this.state.totalAccountBalance <= 0) {
          this.setState({ payColor: "#cccccc" });
          this.setState({ disablePayment: true });
        }
      }
      if (this.state.amountDue < 0) {
        this.setState({
          amountDue: 0,
        });
        //console.log("fcx4");
        if (this.state.totalAccountBalance <= 0) {
          this.setState({ payColor: "#cccccc" });
          this.setState({ disablePayment: true });
        }
      }

      if (this.state.amountDue === 0) {
        //console.log("cxf4");
        this.setState({
          accountMessage:
            "No outstanding balance in your account . Thanks for being a valuable customer !!! ",
        });
      }
      return null;
    } else {
      this.setState({
        totalAccountBalance: this.state.totalAccountBalance - e,
      });

      if (this.state.totalAccountBalance <= 0) {
        this.setState({
          totalAccountBalance: 0,
        });
        //console.log("fcx1");
        if (this.state.totalAccountBalance <= 0) {
          this.setState({ payColor: "#cccccc" });
          this.setState({ disablePayment: true });
        }
        if (this.state.amountDue === 0) {
          //console.log("cxf6");
          this.setState({
            accountMessage:
              "No outstanding balance in your account . Thanks for being a valuable customer !!! ",
          });
        }
      }
      return null;
    }

    ////console.log("this.state.amountDue");
    ////console.log(this.state.amountDue);
  };

  submitPayment = () => {
    /*     this.props.navigation.dispatch(
      StackActions.replace("Payment", {
        accountBalance: this.state.totalAccountBalance,
        amountDue: this.state.amountDue,
        onPayment: this.handlePayment,
        navigationobj: this.props.navigation,
      })
    );
 */
    //console.log("Error Check");

    //console.log(this.props.navigation);
    /* 
    this.props.navigation.dispatch({
      ...CommonActions.goBack(),
      //source: route.key,\
      //  target: state.key,
    });

 */ /* this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Tweets" },
          { name: "Welcome" },
          {
            name: "Payment",
            params: {
              accountBalance: this.state.totalAccountBalance,
              amountDue: this.state.amountDue,
              onPayment: this.handlePayment,
              navigationobj: this.props.navigation,
            },
          },
          {
            name: "Payment",
            params: {
              accountBalance: this.state.totalAccountBalance,
              amountDue: this.state.amountDue,
              onPayment: this.handlePayment,
              navigationobj: this.props.navigation,
            },
          },
        ],
      })
    );
 */
    /*     this.props.navigation.dispatch((state) => {
      // Remove the home route from the stack
      console.log("fc1");
      const routes = state.routes;

      console.log(routes);
      return CommonActions.reset({
        index: 2,
        routes: [
          { name: "Tweets" },
          { name: "Welcome" },
          { name: "Payment" },
          { name: "Summary" },
        ],
      });
    });

 */ console.log(
      "fc2"
    );

    console.log("Checking the parameters passed");
    console.log("Amount Due");
    console.log(this.state.amountDue);
    console.log("Total Balance");
    console.log(this.state.totalAccountBalance);

    this.props.navigation.navigate("Payment", {
      accountBalance: this.state.totalAccountBalance,
      amountDue: this.state.amountDue,
      onPayment: this.handlePayment,
      navigationobj: this.props.navigation,
    });
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <MyStatusBar backgroundColor="black" barStyle="light-content" />
        <ClientHeader myNavigation={this.props.navigation} />
        <View
          style={{
            flex: mainFlex,
            borderColor: "#343a40",
            /* backgroundColor: "orange", */
          }}
        >
          <View
            style={{
              flex: 0.1,
            }}
          >
            <MarqueeText
              style={styles.alertText}
              duration={10000}
              marqueeOnStart
              loop
              marqueeResetDelay={100}
            >
              {this.state.accountMessage}
            </MarqueeText>
          </View>
          <View style={{ flex: cardFlex }}>
            <Card
              style={{
                flexDirection: "row",

                /* backgroundColor: "green", */
              }}
              containerStyle={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#FFFFFF",
                /* backgroundColor: "orange", */
                shadowColor: "#808080",
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.75,
                shadowRadius: 3.84,
                elevation: 20,
              }}
            >
              <Card.Title
                style={{
                  fontSize: myFontSize,
                  fontFamily: myFont,
                  fontStyle: "italic",
                  textAlign: "center",
                  textDecorationStyle: "double",
                  textDecorationColor: "#3b6e8f",
                }}
              >
                {this.state.accountName}
              </Card.Title>
              <Card.Divider style={{ height: 2, backgroundColor: "#343a40" }} />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    Account Number
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    {this.state.accountNumber}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  top: accountNumberViewTop,
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    Total Account Balance
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    <NumberFormat
                      value={this.state.totalAccountBalance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => <Text>{value}</Text>}
                    />
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  top: amountDueViewTop,
                  /* backgroundColor: "purple", */
                  minHeight: 50,
                  flexWrap: "wrap",
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    Amount Due by 10/08/2020
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text
                    style={{
                      fontSize: myFontSizean,
                      fontFamily: myFont,
                      fontStyle: "italic",
                      textAlign: "left",
                      textDecorationStyle: "double",
                      textDecorationColor: "#3b6e8f",
                    }}
                  >
                    <NumberFormat
                      value={this.state.amountDue}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value) => <Text>{value}</Text>}
                    />
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={this.state.disablePayment}
                  style={{
                    alignItems: "center",
                    backgroundColor: this.state.payColor,
                    padding: 10,
                    width: paybuttonWidth,
                    left: paynowleft,
                    borderRadius: 20,
                    marginTop: payMargin,
                  }}
                  onPress={() => {
                    this.submitPayment();
                  }}
                >
                  <Text style={styles.payText}>Submit Payment</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            /* backgroundColor: "orange", */
            bottom: treeTop,
          }}
        >
          <View style={{ width: "30%" }}>
            <LottieView
              autoPlay
              loop={false}
              source={require("../assets/tree.json")}
              style={styles.animation}
            />
          </View>
          <View
            style={{
              width: "70%",
              flexDirection: "column",
            }}
          >
            <TouchableOpacity
              style={styles.autopayButton}
              onPress={() => {
                submitPayment();
              }}
            >
              <Text style={styles.myText}>AutoPay Enroll</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paperlessButton}
              onPress={() => {
                submitPayment();
              }}
            >
              <Text style={styles.myText}>Go Paperless</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            /* backgroundColor: "green", */
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
    ``;
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
    backgroundColor: "#3b6e8f",
    padding: 10,
    width: "75%",
    left: "12%",
    borderRadius: 20,
  },
  paperlessButton: {
    alignItems: "center",
    backgroundColor: "#3b6e8f",
    padding: 10,
    width: autopayWidth,
    left: autopayleft,
    borderRadius: 20,
    top: paperlessButtonTop,
  },
  profile: {
    alignItems: "center",
    padding: 2,
    width: 100,
    left: 1,
    height: "60%",
    top: 14,
  },
  autopayButton: {
    alignItems: "center",
    backgroundColor: "#3b6e8f",
    padding: 10,
    width: autopayWidth,
    left: autopayleft,
    borderRadius: 20,
    top: autopayTop,
  },
  faqButton: {
    alignItems: "center",
    padding: 2,
    width: 100,
    left: -8,
    height: "60%",
    top: 14,
  },
  invoiceButton: {
    alignItems: "center",
    padding: 2,
    width: 100,
    left: -3,
    height: "60%",
    top: 14,
  },
  contact: {
    alignItems: "center",
    padding: 2,
    width: 130,
    left: 5,
    height: "60%",
    top: 14,
  },

  autopay: {
    alignItems: "stretch",
    padding: 0,
    width: 80,
    left: 30,
    height: 70,
    top: 5,
    color: "#3b6e8f",
  },

  quickText: {
    fontFamily: myFont,
    color: "black",
    fontSize: 25,
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
  payText: {
    fontFamily: myFont,
    color: "white",
    fontSize: myFontSizean,
    textAlign: "justify",
  },
  myText: { fontFamily: myFont, color: "white", fontSize: myFontSizean },
  accountName: {
    fontFamily: myFont,
    width: 130,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
  },
  accountNumber: {
    fontFamily: myFont,
    width: 130,
    color: "black",
    fontSize: 15,
    paddingRight: 10,
    top: 7,
    left: 5,
  },
  accountNumValue: {
    fontFamily: myFont,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
    overflow: "scroll",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
  accountBalance: {
    fontFamily: myFont,
    width: 130,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
  },
  accountBalValue: {
    fontFamily: myFont,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
    overflow: "scroll",
  },
  amountDue: {
    fontFamily: myFont,
    width: 130,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
  },
  amountDueValue: {
    fontFamily: myFont,
    color: "black",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
    overflow: "scroll",
  },

  accountValue: {
    fontFamily: myFont,
    color: "black",
    width: "72%",
    fontSize: 15,
    top: 7,
    paddingRight: 10,
    left: 5,
    overflow: "scroll",
  },
  title: {
    fontFamily: myFont,
    color: "black",
    fontSize: 20,
    top: 9,
    shadowOpacity: 0,
    fontWeight: "bold",
    left: 5,
  },
  navigation: {
    fontFamily: myFont,
    color: "black",
    fontSize: 20,
    top: 3,
    shadowOpacity: 0,
    fontWeight: "bold",
    left: 5,
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
  },
  alertText: {
    fontFamily: myFont,
    color: "black",
    fontSize: 18,
    paddingTop: 5,
    /* borderColor: "#3b6e8f", */
    /* borderWidth: 3, */
    /* borderBottomWidth: 4, */
    /* borderBottomColor: "#3b6e8f", */
  },
  linkText: {
    fontFamily: myFont,
    color: "black",
    fontSize: 10,
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
});
