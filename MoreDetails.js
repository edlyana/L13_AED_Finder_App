import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#E8F1F2',
        padding: 15,
    },
    content: {
        backgroundColor:'#f1e9e7',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        margin: 10,
        fontWeight: 'bold',
        color: '#1B98E0',
    },
    btn: {
        backgroundColor: '#9A031E',
        padding: 10,
        borderRadius: 10,
        width: '40%',
        alignSelf: 'flex-end',
    }
})

const MoreDetails = ({navigation, route}) => {

    // TAKE NOTE! To get the data form the previous screen
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize: 23, fontWeight:'bold', paddingBottom: 3}}>{item.Building_Name}</Text>

                <Text style={{fontSize:19, padding: 1, fontStyle: 'italic',}}>{item.Postal_Code}</Text>

                <Text style={{fontSize:16, padding: 1}}>{item.Location_Description}</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => {
                navigation.navigate("Home");
            }}>
                <Text style={{color:'#E8F1F2', fontSize: 19, textAlign: 'center'}}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MoreDetails;
