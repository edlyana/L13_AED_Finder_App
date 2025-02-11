import React, {useState} from 'react';
import {TextInput, View, Text, Button, Alert} from "react-native";

const MoreDetails = ({navigation, route}) => {

    // TAKE NOTE! To get the data form the previous screen
    const { item } = route.params;

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}>{item.Building_Name}</Text>

                <Text style={{fontWeight: 'bold'}}>{item.Postal_Code}</Text>

                <Text style={{fontWeight: 'bold'}}>{item.Location_Description}</Text>

                <Button title="Go Back" onPress={() => {
                    navigation.navigate("Home")
                }}/>
            </View>
        </View>
    );
};

export default MoreDetails;
