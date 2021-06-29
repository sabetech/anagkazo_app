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
    let phone = this.state.student.phone; 
    
    return <CustomProfileField 
      field={"phone"} 
      value={phone}
      userReadableField={"Phone"} 
      icon={"phone"} 
      type={"feather"} 
      index={this.state.student.index_number} 
      url_part={"edit"}
    />;
  };

  renderEmail = () => {
    return <CustomProfileField 
      field={"email_address"} 
      value={this.state.student.email_address}
      userReadableField={"Email Address"}  
      icon={"email"}
      type={"entypo"}
      index={this.state.student.index_number}
      url_part={"edit"}
      
      />;
  };

  renderGender = () => {
    return (
      <CustomProfileField
        field={"gender"}
        value={this.state.student.gender == "m" ? "Male" : "Female"}
        userReadableField={"Gender"}
        icon={"gender-male-female"}
        type={"material-community"}
        
      />
    );
  };

  renderHomeChurch = () => {
    return (
      <CustomProfileField
        field={"home_church"}
        value={this.state.student.home_church}
        userReadableField={"Home Church"}
        icon={"church"}
        type={"material-community"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderPastorsName = () => {
    return (
      <CustomProfileField
        field={"pastors_name"}
        value={
          this.state.student.pastors_name == ""
            ? "Not Set"
            : this.state.student.pastors_name
        }
        icon={"person-outline"}
        userReadableField={"Pastor's Name"}
        type={"material-icons"}
        index={this.state.student.index_number}
        url_part={"edit"}
      />
    );
  };

  renderPastorsPhone = () => {
    return (
      <CustomProfileField
        field={"pastors_phone"}
        value={this.state.student.pastors_phone}
        userReadableField={"Pastor's Phone"}
        icon={"phone"}
        type={"feather"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderEducationalLevel = () => {
    return (
      <CustomProfileField
        field={"educational_level"}
        value={this.state.student.educational_level}
        userReadableField={"Educational Level"}
        icon={"user-graduate"}
        type={"font-awesome-5"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderMaritalStatus = () => {
    return (
      <CustomProfileField
        field={"marital_status"}
        value={this.state.student.marital_status}
        userReadableField={"Martial Status"}
        icon={"ring"}
        type={"material-community"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderOccupation = () => {
    return (
      <CustomProfileField
        field={"occupation"}
        value={this.state.student.occupation}
        userReadableField={"Occupation"}
        icon={"md-hammer"}
        type={"ionicon"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderDateOfBirth = () => {
    return (
      <CustomProfileField
        field={"date_of_birth"}
        value={this.state.student.date_of_birth}
        userReadableField={"Date of Birth"}
        icon={"calendar"}
        type={"antdesign"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderCountry = () => {
    return (
      <CustomProfileField
        field={"country"}
        value={this.state.student.country}
        userReadableField={"Country"}
        icon={"md-globe"}
        type={"ionicon"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
      />
    );
  };

  renderDenomination = () => {
    return (
      <CustomProfileField
        field={"denomination"}
        value={this.state.student.denomination}
        userReadableField={"Denomination"}
        icon={"streetview"}
        type={"material-icons"}
        index={this.state.student.index_number}
        url_part={"edit"}
        
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
