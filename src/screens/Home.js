import React from "react";

import Profile from "../components/Profile/ProfileCard";
import contactData from "../backend/data.json";

const Home = () => <Profile {...contactData} />;

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
