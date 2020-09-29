import React from "react";
import { View, FlatList } from "react-native";
import CardInfo from "./CardInfo";

const DashboardCardList = ({ studentInfo, handler }) => {
  return (
    <View style={{ height: 475, marginHorizontal: 12 }}>
      <FlatList
        data={studentInfo.attnData}
        renderItem={({ item }) => {
          return (
            <CardInfo
              id={item.id}
              title={item.title}
              value={item.value}
              extra_details={item.extra_details}
              handler={handler}
            />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

export default DashboardCardList;
