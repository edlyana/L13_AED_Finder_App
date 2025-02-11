import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';

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

    const renderItem = ({item, index}) => {

        return (
            <TouchableOpacity style={styles.opacityStyle} onPress={() => {
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
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default Home;
