import { Dimensions } from "react-native";

export default {
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  coverBio: {
    color: "#FFF",
    fontSize: 15,
    textAlign: "right",
    marginRight: 10,
    marginBottom: -10,
  },
  coverContainer: {
    marginBottom: 55,
    position: "relative",
  },
  coverImage: {
    height: Dimensions.get("window").width * (1.5 / 4),
    width: Dimensions.get("window").width,
  },
  coverMetaContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "right",
    marginRight: 10,
  },
  coverTitle: {
    color: "#FFF",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 10
  },
  coverTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    paddingTop: 5,
  },
  headerContainer: {
    
    backgroundColor: "#FFF",
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  masonryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage: {
    borderColor: "#FFF",
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: "absolute",
  },
  sceneContainer: {
    marginTop: 15,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  tabBar: {
    backgroundColor: "transparent",
    marginBottom: -10,
    marginLeft: 120,
    marginRight: 5,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: "relative",
    zIndex: 10,
  },
  tabRow: {
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
  },
  tabLabelNumber: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 2,
  },
  tabLabelText: {
    color: "black",
    fontSize: 10,
    textAlign: "left",
  },
};
