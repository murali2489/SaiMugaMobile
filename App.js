import React from "react";
import {
  Dimensions,
  ScrollView,
  Button,
  View,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {
  NavigationContainer,
  useNavigation,
  DrawerItem,
} from "@react-navigation/native";
import Landingzone from "./components/Landingzone";
import LandingPage from "./components/LandingPage";
import Summary from "./components/Summary";
import Payment from "./components/Payment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon, Text } from "react-native-elements";
const myFont = Platform.OS === "ios" ? "Arial" : "sans-serif";

let myFontSize = 15;

const SCREEN_WIDTH = Dimensions.get("window").width;

if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 360) {
  myFontSize = 10;
} else if (SCREEN_WIDTH > 300 && SCREEN_WIDTH <= 415) {
}

export default function App() {
  const Tweets = ({ navigation }) => {
    return (
      <SafeAreaView>
        <Text>Tweet</Text>
        <Button
          title="Navigate"
          onPress={() => {
            navigation.navigate("Summary");
          }}
        ></Button>
      </SafeAreaView>
    );
  };

  const Test = () => {
    const navi = useNavigation();
    return (
      <SafeAreaView>
        <Text>Summary</Text>
      </SafeAreaView>
    );
  };
  /* 
  const Summary = () => {
    return (
      <SafeAreaView>
        <Text>Summary</Text>
      </SafeAreaView>
    );
  };
 */
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  /* const DrawerNavigator = createDrawerNavigator(
    {
      //Drawer Optons and indexing
      NavScreen1: {
        screen: Summary,
        navigationOptions: {
          drawerLabel: 'Summary',
        },
      },
      NavScreen2: {
        screen: Test,
        navigationOptions: {
          drawerLabel: 'Test',
        },
      },
      
    },
  
  );
 */
  const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContentOptions={{
        labelStyle: {
          color: "white",
          fontFamily: myFont,
          fontSize: 16,
        },
      }}
      drawerStyle={{
        backgroundColor: "#343a40",
        flex: 1,
        flexDirection: "row",
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flex: 0.15,
            }}
          >
            <Icon
              reverse
              name="user-circle-o"
              type="font-awesome"
              color="#517fa4"
              containerStyle={{
                backgroundColor: "green",
                left: 115,
              }}
            />
            <Text
              style={{
                fontSize: myFontSize,
                fontFamily: myFont,
                fontStyle: "italic",

                textAlign: "center",
                textDecorationStyle: "double",

                textDecorationColor: "#3b6e8f",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Jackson@fishingcorp.com
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "white",
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
              }}
            >
              Enroll AutoPay
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "white",
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
              }}
            >
              Switch Account
            </Text>
          </View>

          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Invoices Screen
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
                color: "white",
              }}
            >
              FAQs
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Help
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: myFont,
                textDecorationStyle: "solid",

                textDecorationColor: "#343a40",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Profile Settings
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Welcome");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: myFont,
                  textDecorationStyle: "solid",

                  textDecorationColor: "#343a40",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Summary"
        component={Summary}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Test"
        component={Test}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );

  const StackNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Tweets" component={Tweets} />
      <Stack.Screen
        name="Welcome"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Summary"
        component={DrawerNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
