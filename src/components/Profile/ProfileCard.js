import React, { Component } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-community/async-storage";

import PropTypes from "prop-types";

import profileStyles from "./ProfileStyle";
import DashboardCardList from "../HomeDashboard/DashboardCardList";
import { FontAwesome5 } from "@expo/vector-icons";

import { BASE_URL } from "../../config/index";

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

  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  };

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: "1", title: "MEMBERS", count: 0 },
        { key: "2", title: "PASTORAL POINT", count: 0 },
      ],
    },
    studentInfo: {
      name: "",
      class: "",
      attnData: [],
      index_number: "",
      memberCount: 0,
    },
    detailsShown: false,
    dashboardItemToShow: "",
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    AsyncStorage.getItem("student_index").then((res) => {
      
      this.getStudentDashboardData(res);
    });
  }

  getStudentDashboardData = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}/get_dashboard_values`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          studentInfo: responseJson,
        });
        this.state.tabs.routes[0].count = responseJson.memberCount;
        this.state.tabs.routes[1].count = responseJson.pastoralPoint;
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

    let labels = [];
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? "black" : "gray");
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View style={styles.tabRow}>
        <Animated.Text style={[styles.tabLabelNumber, { color }]} >
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
            source={require("../../res/imgs/card-dashboard-backgrnd.jpg")}
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

  handler(detailShownState, vala) {
    this.setState({
      detailsShown: detailShownState,
      dashboardItemToShow: vala,
    });
  }

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
        {this.state.loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="darkblue"
          />
        ) : null}
        <DashboardCardList studentInfo={this.state.studentInfo} />
      </View>
    );
  }
}

export default ProfileCard;
