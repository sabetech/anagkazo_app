import React from "react";
import { View, FlatList } from "react-native";
import CardInfo from "./CardInfo";

const DashboardCardList = ({ studentInfo }) => {
  const detailColor = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];
  const icons = [
    {
      icon:"slack-hash", 
      type:"font-awesome-5"
    }, 
    {
      icon:"praying-hands", 
      type:"font-awesome-5"
    },
    {
      icon:"church", 
      type: "material-community"
    }, 
    {
      icon: "bus-multiple", 
      type: "material-community"
    }];
  return (
    <View style={{ height: "70%", marginHorizontal: 12 }}>
      <FlatList
        data={studentInfo.attnData}
        renderItem={({ item, index }) => {
          return (
            <CardInfo
              id={item.id}
              title={item.title}
              value={item.value}
              studentIndex={studentInfo.index_number}
              colorDetail={detailColor[index]}
              icon={icons[index].icon}
              type={icons[index].type}
            />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

export default DashboardCardList;
