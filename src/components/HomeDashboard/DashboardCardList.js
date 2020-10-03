import React from "react";
import { View, FlatList } from "react-native";
import CardInfo from "./CardInfo";

const DashboardCardList = ({ studentInfo, handler }) => {
  return (
    <View style={{ height: 530, marginHorizontal: 12 }}>
      <FlatList
        data={studentInfo.attnData}
        renderItem={({ item }) => {
          return (
            <CardInfo id={item.id} title={item.title} value={item.value} />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

export default DashboardCardList;
