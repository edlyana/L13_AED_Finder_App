import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Audio} from "expo-av";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
        padding: 15,
        margin: 10,
        borderColor: '#368F8B',
        borderStyle: 'dashed',
    },
    content: {
        padding: 5,
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
    },
    contentCountry:{
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
        margin:4,
        fontWeight: 'bold',
    },
    imgCard:{
        width: 159,
        height: 227,
    },
    searchContainer:{
        padding: 15,
        backgroundColor: '#EEF5DB',
    },
    searchStyle:{
        borderWidth:1,
        borderColor: '#BA2D0B',
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    opacityStyle: {
        alignItems: 'center',
        padding: 20,
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEF5DB',
        opacity: 1,
    },
})

let originalData= [];

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);
    const [category, setCategory] = useState(null);
    const [mySound, setMySound] = useState();

    async function playSound() {
        const soundfile = require('./wooshSound.wav');
        const {sound} = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    }

    // ADD USEEFFECT() - Exercise 1B
    useEffect(() => {
        // ADD FETCH() - Exercise 1A
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_e8934d28896a1eceecfe86f42dd3c077")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                const records = myJson?.result?.records || [];
                if(originalData.length < 1){
                    setMyData(records);
                    originalData = records;
                }
            })
    }, []);

    const FilterData = (text) => {
        if(text !== ''){
            let myFilterData = originalData.filter(
                (item) =>
                    (item.Building_Name && item.Building_Name.toLowerCase().includes(text.toLowerCase())) ||
                    (item.Location_Description && item.Location_Description.toLowerCase().includes(text.toLowerCase()))
            );
            setMyData(myFilterData);
        }
        else{
            setMyData(originalData);
        }
    }

    const renderItem = ({item}) => {

        if (category === 'Available1' && !item.Location_Description.includes("During Dual Use Scheme Operating Hours")) {
            return null;
        }
        if (category === 'Available2' && !item.Location_Description.includes("During School Operating Hours")) {
            return null;
        }

        return (
            <TouchableOpacity style={styles.opacityStyle} onPress={() => {
                playSound();
                navigation.navigate("MoreDetails", {item});
            }}>
                <View style={styles.container}>
                    <Text style={styles.contentCountry}>{item.Building_Name}</Text>
                    <Text style={styles.content}>Location: {item.Location_Description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.searchContainer}>
            <StatusBar/>
            <Text style={{padding:3, fontSize:22, fontWeight:'bold', color:'#0A8754', textAlign:'center'}}>AED Finder</Text>
            <Text style={{fontSize:15, fontWeight:'bold', margin: 5}}>Search AED:</Text>
            <TextInput style={styles.searchStyle} placeholder='Enter a location' onChangeText={(text) => {FilterData(text)}}/>

            <View style={{ backgroundColor: 'white',}}>
                <Text style={{fontSize:15, fontWeight:'bold', margin: 5, paddingTop:10}}>Availability By:</Text>
                <RNPickerSelect
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                    items={[
                        {label:"During Dual Use Scheme Operating Hours", value:"Available1"},
                        {label:"During School Operating Hours", value:"Available2"},
                    ]}
                />
            </View>

            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default Home;
