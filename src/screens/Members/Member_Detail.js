import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ActivityIndicator
} from "react-native";
import { Card, Icon } from "react-native-elements";
import CustomProfileField from "../../components/Profile/CustomProfileField";
import { BASE_URL } from "../../config/index";
import AsyncStorage from "@react-native-community/async-storage";

class MemberDetail extends Component {
  state = {
    loading: false,
    member: {
      id:"",
      name: "",
      gender:"",
      date_of_birth:"",
      occupation:"",
      phone:"",
      whatsapp_no:"",
      marital_status:"",
      basonta_id:"",
      member_category:"",
      photo_url:"",
      address_line_1:"",
      city:"",
      country:""
    },
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });

    AsyncStorage.getItem("student_index").then((res) => {
        this.getMemberProfile(res, this.props.route.params.index);
    });
    

  }

  getMemberProfile = (indexNumber, memberId) => {
    fetch(`${BASE_URL}/student/${indexNumber}/member/${memberId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            member: responseJson,
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
        "http://anagkazo.firstlovegallery.com/" + this.state.member.photo_url,
      avatarBackground: "https://i.imgur.com/rXVcgTZ.jpg",
      name: this.state.member.name,
      address: { city: this.state.member.city, country: this.state.member.country },
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
                  {this.state.member.city}, {this.state.member.country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderTel = () => {    
    
    return <CustomProfileField 
      field={"phone"} 
      value={this.state.member.phone} 
      icon={"phone"} 
      type={"feather"} 
      index={this.state.member.id}
      url_part={"member/edit"}
    />;
  };

  renderWhatsapp = () => {
    return <CustomProfileField 
      field={"whatsapp_no"} 
      value={this.state.member.whatsapp_no} 
      icon={"logo-whatsapp"}
      type={"ionicon"}
      index={this.state.member.id}
      url_part={"member/edit"}
      
      />;
  };

  renderGender = () => {
    return (
      <CustomProfileField
        field={"gender"}
        value={this.state.member.gender == "m" ? "Male" : "Female"}
        icon={"gender-male-female"}
        type={"material-community"}
        
      />
    );
  };

  renderBasonta = () => {
    return (
      <CustomProfileField
        field={"basonta_id"}
        value={this.state.member.basonta_id}
        icon={"caret-square-o-right"}
        type={"font-awesome"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
      />
    );
  };

  renderMaritalStatus = () => {
    return (
      <CustomProfileField
        field={"marital_status"}
        value={this.state.member.marital_status}
        icon={"ring"}
        type={"material-community"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
      />
    );
  };

  renderOccupation = () => {
    return (
      <CustomProfileField
        field={"occupation"}
        value={this.state.member.occupation}
        icon={"md-hammer"}
        type={"ionicon"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
      />
    );
  };

  renderDateOfBirth = () => {
    return (
      <CustomProfileField
        field={"date_of_birth"}
        value={this.state.member.date_of_birth}
        icon={"calendar"}
        type={"antdesign"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
      />
    );
  };
  renderCity = () => {
    return (
      <CustomProfileField
        field={"city"}
        value={this.state.member.city}
        icon={"city"}
        type={"font-awesome-5"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
      />
    );
  };

  renderCountry = () => {
    return (
      <CustomProfileField
        field={"country"}
        value={this.state.member.country}
        icon={"md-globe"}
        type={"ionicon"}
        index={this.state.member.id}
        url_part={"member/edit"}
        
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
            {this.renderWhatsapp()}
            {this.renderGender()}
            {this.renderMaritalStatus()}
            {this.renderOccupation()}
            {this.renderDateOfBirth()}
            {this.renderCity()}
            {this.renderCountry()}
          
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

export default MemberDetail;
