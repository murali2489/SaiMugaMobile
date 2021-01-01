import * as React from "react";
import { Text, View, Image, SafeAreaView } from "react-native";

import Carousel from "react-native-snap-carousel";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          borderRadius: 5,
          borderColor: "#3b6e8f",
          borderWidth: 2,
          height: "100%",
          padding: 0,
          marginLeft: 25,
          marginRight: 10,
        }}
      >
        <Text style={{ textAlign: "center", top: "40%", fontSize: 16 }}>
          Promotions and Notifications.
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{ height: "40%", paddingTop: 50, marginBottom: "4%" }}
      >
        <View
          style={{
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}
