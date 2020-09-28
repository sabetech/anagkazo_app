import React from "react";
import { View, FlatList } from "react-native";
import CardInfo from "CardInfo";

const DashboardCardList = () => {
  return (
    <View style={{ height: 475, marginHorizontal: 12 }}>
      <FlatList
        data={this.state.studentInfo.attnData}
        renderItem={({ item }) => {
          return (
            <CardInfo
              title={item.title}
              value={item.value}
              extra_details={item.extra_details}
            />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

export default DashboardCardList;
