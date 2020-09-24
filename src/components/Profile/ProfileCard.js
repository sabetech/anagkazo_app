import React, { Component } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";

import PropTypes from "prop-types";

import profileStyles from "./ProfileStyle";
import CardInfo from "../HomeDashboard/CardInfo";

const styles = StyleSheet.create({ ...profileStyles });

class ProfileCard extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
  };

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  };

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: "1", title: "MEMBERS", count: 687 },
        { key: "2", title: "PASTORAL POINT", count: 1224 },
        { key: "3", title: "AVERAGE BUSSED", count: "3 M" },
      ],
    },
    studentInfo: {
      name: "",
      class: "",
      attnData: [],
    },
  };

  componentDidMount() {
    console.log("Retrieve Student basic info from here");
    fetch(
      "http://192.168.8.156/acc_membership/public/api/app/student/700446/get_dashboard_values",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        this.setState({
          studentInfo: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleIndexChange = (index) => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    });
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        indicatorStyle={styles.indicatorTab}
        renderLabel={this.renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
        {...props}
      />
    );
  };

  renderLabel = (props) => ({ route }) => {
    const routes = props.navigationState.routes;

    //console.log(routes);

    let labels = [];
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? "black" : "gray");
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View style={styles.tabRow}>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    );
  };

  renderScene = ({ route: { key } }) => {
    switch (key) {
      case "1":
      //return this.renderRequiredPage
      case "2":
      //return this.renderRequiredPage;
      case "3":
      //return this.renderRequiredPage;
      default:
        return <View />;
    }
  };

  renderContactHeader = () => {
    const { photo_url, name } = this.state.studentInfo;

    return (
      <View style={[styles.headerContainer, { elevation: 5 }]}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: this.props.avatarBackground,
            }}
            style={styles.coverImage}
          >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{name}</Text>
              <Text style={styles.coverBio}>
                {this.state.studentInfo.class}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "http://anagkazo.firstlovegallery.com/" + photo_url,
            }}
            style={styles.profileImage}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.cardContainer}>
          {this.renderContactHeader()}
          <TabView
            style={[
              styles.tabContainer,
              this.props.tabContainerStyle,
              { elevation: 10 },
            ]}
            navigationState={this.state.tabs}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
          />
        </View>
        <View style={{ height: 475 }}>
          <FlatList
            data={this.state.studentInfo.attnData}
            renderItem={({ item }) => {
              return <CardInfo title={item.title} value={item.value} />;
            }}
            keyExtractor={(item) => item.id + ""}
          />
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  card: {
    elevation: 5,
    marginBottom: 15,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 3,
  },
  valueTitle: {
    paddingHorizontal: 10,
  },
  imgDim: {
    height: "100%",
    width: "30%",
    flex: 0.1,
  },
});

export default ProfileCard;
