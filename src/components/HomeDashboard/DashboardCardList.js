import React from "react";
import { View, FlatList } from "react-native";
import CardInfo from "./CardInfo";

const DashboardCardList = ({ studentInfo }) => {
  const detailColor = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];
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
            />
          );
        }}
        keyExtractor={(item) => item.id + ""}
      />
    </View>
  );
};

export default DashboardCardList;
