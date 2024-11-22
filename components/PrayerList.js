import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import Prayer from './Prayer'

const PrayerList = ({data, onRowPress}) => {
    const [times, setTimes] = React.useState([])
    React.useEffect(() => {
        if (data) {
            setTimes(data);
            
        }
    }, [data])
    if (!times) {
        return <ActivityIndicator size="large" color="green" />
    }
  return (
    <View style = {{flex: 1, width: '100%', marginTop: 20,}}>
        <FlatList data={times} keyExtractor={(item) => `${item.Masjid}`} style = {{width: '100%'}} contentContainerStyle = {{alignItems: 'center', width: '100%'}} renderItem={({item, index}) => <Prayer data = {item} index = {index} onRowPress = {(indexx) => onRowPress(indexx)} />}  />
    </View>
  )
}

export default PrayerList



// <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} style = {{width: '100%'}} contentContainerStyle = {{alignItems: 'center', width: '100%'}} />