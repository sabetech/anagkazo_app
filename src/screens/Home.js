import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Profile from "../components/Profile/ProfileCard";
import contactData from "../backend/data.json";

const Home = () => <Profile {...contactData} />;

// ProfileScreen.navigationOptions = () => ({
//   header: null,
// })

// ProfileScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// }

export default Home;

// export function Home() {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import PropTypes from 'prop-types'

//
