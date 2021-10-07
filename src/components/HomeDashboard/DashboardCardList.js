import React from "react";
import CardInfo from "./CardInfo";
import ProgressMinistrySkillRing from "./MinistrySkillsProgressRings";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Dimensions, View } from "react-native";



const DashboardCardList = ({ studentInfo }) => {
  // const detailColor = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];
  // const descriptions = [
  //   "Number of Souls Brought to Service",
  //   "Status",
  //   "Status",
  //   "Number of Souls Bussed On Sunday"
  // ];

  const ministrySkills = [
    {name:'ANTIBRUTISH',skill: 'ANTI BRUTISH'},
    {name:'COUNSELLING', skill: 'COUNSELLING'},
    {name:'MULTIPLICATION', skill: 'MULTIPLICATION'},
    {name:'SAT', skill: 'SAT'},
    {name:'SHEEP_SEEKING', skill:'SHEEP SEEKING'},
    {name:'UNDERSTANDING', skill: 'UNDERSTANDING CAMPAIGN'},
    {name:'BASONTA', skill: 'BASONTA'},
    {name:'BUSSING', skill: 'BUSSING'}
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
    
    <ScrollView style={styles.scrollViewDashboardContent} contentContainerStyle={{ paddingBottom: 120 }}>
      
        {
          
          studentInfo.attnData.map((item, idx) => 
            <CardInfo
                key={idx}
                id={item.id}
                title={item.title}
                description={item.extra_details}
                value={item.value}
                studentIndex={studentInfo.index_number}
                icon={icons[idx].icon}
                type={icons[idx].type}
            />
          )
        }
         
        {
          ministrySkills.map((item, index) => 
              <ProgressMinistrySkillRing key={index} name={item.name} skill={item.skill}/>
          )  
        }

    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollViewDashboardContent:{
    height: Dimensions.get("window").height * 0.65,
    marginHorizontal: 12, 
    backgroundColor: 'transparent'
  }
});

export default DashboardCardList;
