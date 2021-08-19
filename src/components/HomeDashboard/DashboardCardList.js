import React from "react";
import { ImageBackground } from "react-native";
import { View, FlatList } from "react-native";
import CardInfo from "./CardInfo";

const DashboardCardList = ({ studentInfo }) => {
  const detailColor = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];
  const descriptions = [
    "Number of Souls Brought to Service",
    "Status",
    "Status",
    "Number of Souls Bussed On Sunday"
  ];
  const icons = [
    {
      icon:"church", 
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
      <ImageBackground 
          source={require('../../res/imgs/geometry.png')} 
          resizeMode="cover" 
          style={{flex: 1,
      justifyContent: "center"}} >
      <FlatList
        style={{marginTop: "5%"}}
        data={studentInfo.attnData}
        renderItem={({ item, index }) => {
          return (
            <CardInfo
              id={item.id}
              title={item.title}
              description={item.extra_details}
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
    </ImageBackground>
    </View>
    
  );
};

export default DashboardCardList;
