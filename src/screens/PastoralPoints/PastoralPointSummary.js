import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
  } from "react-native";

  import PastoralPointInfoCard from "../../components/Helpers/PastoralPointInfoCard";
import { FontAwesome5 } from "@expo/vector-icons";
import {Card, Title} from 'react-native-paper';
import {BASE_URL} from '../../config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PastoralPointSummary({ navigation }) {
    const [aggregatedPoints, setAggregatedPoint] = useState([]);
    const [overallTotal, setOverallTotal] = useState(0);
    const [pastoralPoints, setPastoralPoints] = useState([]);

    const colorArray = ["#4285F4", "#DB4437", "#0F9D58", "#F4B400"];

    useEffect(()=>{
        
        AsyncStorage.getItem("student_index").then((res) => {   
            getPastoralPoint(res);
        });
    },[]);

    const getPastoralPoint = (studentIndex) => {
        fetch(
            `${BASE_URL}/student/${studentIndex}/getPastoralPoints`,
                {
                    method: "GET",
                }
        ).then((response) => response.json())
        .then((responseJson) => {
            setPastoralPoints(responseJson);
            setAggregatedPoint(pastoralSummaryPoint(responseJson));
            setOverallTotal( responseJson.reduce((temp, parameter) => temp + parameter.pivot.points, 0) )
            
        })
        .catch((error) => {
            console.log(error);
            Alert.alert("Error", "Check your Internet Connection");
        });
    }

    const pastoralSummaryPoint = (studentPastoralPoints) => {
        let sum = 0;
        let previousCategory = studentPastoralPoints[0];
        
        const pointSummary = studentPastoralPoints.reduce((accumulator, point) => {
            sum += previousCategory.pivot.points;

            if (previousCategory.point_category !== point.point_category) { 
                let o = {
                    parameter : previousCategory.point_category,
                    value: sum
                }
                accumulator.push(o);
                sum = 0;
            }
            previousCategory = point;
            return accumulator;
        }, []);

        pointSummary.push({
            parameter:previousCategory.point_category,
            value: studentPastoralPoints[studentPastoralPoints.length-1].pivot.points
        });
        
        return pointSummary;
    }

    return (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity>
              <View style={styles.header}>
                <FontAwesome5
                  name="arrow-left"
                  size={28}
                  color={"#ffffff"}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                <Text style={{ fontSize: 32 }}></Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.header}>Pastoral Point Summary</Text>
          </View>
          
          <View style={styles.container}>
          <ScrollView>
            <PastoralPointInfoCard
                title = {overallTotal}
                infoText={"Below is the breakdown of the point for each category"}
                colorDetail={"#4285F4"}
            />
                
                <View style={styles.cardLayout}>
                    {
                        aggregatedPoints.map((element, index) => 
                            (
                                <View style={styles.cardStyle} key={index}>
                                    <TouchableOpacity
                                        onPress={(() =>
                                            navigation.navigate('pastoralpoint_detail', {
                                                    pastoralPoints: pastoralPoints ,
                                                    parameter: element.parameter
                                                } 
                                            ) 
                                            )
                                        }
                                        >
                                        <Card style={{borderWidth: 1, borderColor: colorArray[index % 4]}}>
                                            <Card.Content>
                                                <Title style={[styles.pointStyle, {color:"black"}]}>{element.value}</Title>
                                            </Card.Content>
                                        </Card>
                                        <Text style={styles.pointStyle}>{element.parameter}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        )
                    }
                </View>
            </ScrollView>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      height: 75,
      backgroundColor: "#4285F4",
      flexDirection: "row",
      elevation: 10,
    },
    header: {
      fontSize: 21,
      marginTop: 32,
      marginLeft: 15,
      color: "#ffffff",
    },
    cardLayout:{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    cardStyle:{
        width: "40%",
        marginHorizontal: 10,
        marginBottom: 20
    },
    pointStyle:{
        textAlign:'center',
        padding: 5,
        
    }


  });
