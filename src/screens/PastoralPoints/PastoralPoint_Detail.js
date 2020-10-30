import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
  } from "react-native";

import PastoralPointInfoCard from "../../components/Helpers/PastoralPointInfoCard";
import { FontAwesome5 } from "@expo/vector-icons";
import {Card, Title} from 'react-native-paper';
import { ListItem } from 'react-native-elements';


export default function PastoralPoint_Detail({ navigation, route }) {
    
    const [pastoralPoints, setPastoralPoints] = useState([]);
    const [totalPoint, setTotalPoint] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);

    useEffect(()=> {
            
        setPastoralPoints(route.params.pastoralPoints.filter(point => point.point_category === route.params.parameter));

        setTotalPoint(route.params.pastoralPoints.filter(point => point.point_category === route.params.parameter)
                                                 .reduce((temp, currentValue) => temp + currentValue.pivot.points, 0));

        setTotalWeight(route.params.pastoralPoints.filter(point => point.point_category === route.params.parameter)
        .reduce((temp, currentValue) => temp + currentValue.weight, 0));
    },
    [])


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
                  
          <ScrollView>
            <View style={styles.cardStyle}>
                    <Card>
                        <Title style={styles.pointStyle}>{route.params.parameter.toUpperCase()}</Title>
                        <Text style={styles.pointStyle}>Total Point: {totalPoint} / {totalWeight}</Text>
                    </Card>
            </View>

            <View>
                {
                    pastoralPoints.map((point, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                        <ListItem.Title>{point.parameter}</ListItem.Title>
                    <ListItem.Subtitle>{point.pivot.points} / {point.weight}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    ))
                }
            </View>
        </ScrollView>

          
        </View>
        )
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
        marginTop: 30,
        width: "90%",
        marginHorizontal: 20,
        marginBottom: 20
    },
    pointStyle:{
        textAlign:'left',
        padding: 10,
    }
});