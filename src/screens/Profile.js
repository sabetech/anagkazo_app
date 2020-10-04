import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import Tel from "../components/Profile/Tel";
import Email from "../components/Profile/Email";
import CustomProfileField from "../components/Profile/CustomProfileField";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL } from "../config/index";

class Profile extends Component {
  state = {
    loading: false,
    student: {
      name: "",
      class: "",
      index_number: "",
      phone: "",
      email: "",
      gender: "",
      home_church: "",
      pastors_name: "",
      pastors_phone: "",
      educational_level: "",
      marital_status: "",
      occupation: "",
      date_of_birth: "",
      country: "",
      denomination: "",
      photo_url: "",
    },
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });

    AsyncStorage.getItem("student_index").then((res) => {
      this.getStudentProfile(res);
    });
  }

  getStudentProfile = (myStudentIndex) => {
    fetch(`${BASE_URL}/student/${myStudentIndex}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          student: responseJson,
        });

        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = {
      avatar:
        "http://anagkazo.firstlovegallery.com/" + this.state.student.photo_url,
      avatarBackground: "https://i.imgur.com/rXVcgTZ.jpg",
      name: this.state.student.name,
      address: { city: "Ginatown", country: "Nepal" },
    };

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: avatarBackground }}
        >
          <View style={styles.headerColumn}>
            <Image style={styles.userImage} source={{ uri: avatar }} />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {this.state.student.class}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderTel = () => {
    return <Tel name={"Phone Number"} number={"029 3892983"} />;
  };

  renderEmail = () => {
    return <Email name={"Email"} email={"kwakeuajo@mail.com"} />;
  };

  renderGender = () => {
    return (
      <CustomProfileField
        field={"gender"}
        value={this.state.student.gender == "m" ? "Male" : "Female"}
        icon={"gender-male-female"}
        type={"material-community"}
      />
    );
  };

  renderHomeChurch = () => {
    return (
      <CustomProfileField
        field={"Home Church"}
        value={this.state.student.home_church}
        icon={"church"}
        type={"material-community"}
      />
    );
  };

  renderPastorsName = () => {
    return (
      <CustomProfileField
        field={"Pastor's Name"}
        value={
          this.state.student.pastors_name == ""
            ? "Not Set"
            : this.state.student.pastors_name
        }
        icon={"person-outline"}
        type={"material-icons"}
      />
    );
  };

  renderPastorsPhone = () => {
    return (
      <CustomProfileField
        field={"Pastor's Phone"}
        value={this.state.student.pastors_phone}
        icon={"phone"}
        type={"feather"}
      />
    );
  };

  renderEducationalLevel = () => {
    return (
      <CustomProfileField
        field={"Educational Level"}
        value={this.state.student.educational_level}
        icon={"user-graduate"}
        type={"font-awesome-5"}
      />
    );
  };

  renderMaritalStatus = () => {
    return (
      <CustomProfileField
        field={"Marital Status"}
        value={this.state.student.marital_status}
        icon={"ring"}
        type={"material-community"}
      />
    );
  };

  renderOccupation = () => {
    return (
      <CustomProfileField
        field={"Occupation"}
        value={this.state.student.occupation}
        icon={"md-hammer"}
        type={"ionicon"}
      />
    );
  };

  renderDateOfBirth = () => {
    return (
      <CustomProfileField
        field={"Date of Birth"}
        value={this.state.student.date_of_birth}
        icon={"calendar"}
        type={"antdesign"}
      />
    );
  };

  renderCountry = () => {
    return (
      <CustomProfileField
        field={"Country"}
        value={this.state.student.country}
        icon={"md-globe"}
        type={"ionicon"}
      />
    );
  };

  renderDenomination = () => {
    return (
      <CustomProfileField
        field={"Denomination"}
        value={this.state.student.denomination}
        icon={"streetview"}
        type={"material-icons"}
      />
    );
  };

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {this.renderEmail()}
            {this.renderGender()}
            {this.renderHomeChurch()}
            {this.renderPastorsName()}
            {this.renderPastorsPhone()}
            {this.renderEducationalLevel()}
            {this.renderMaritalStatus()}
            {this.renderOccupation()}
            {this.renderDateOfBirth()}
            {this.renderCountry()}
            {this.renderDenomination()}
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 21,

    paddingBottom: 8,
    textAlign: "center",
  },
});

export default Profile;
