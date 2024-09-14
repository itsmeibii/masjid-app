import { Platform, StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'

const Prayer = ({data, onRowPress, index}) => {
    
    const {Masjid: name, imageURL: image, current} = data;
    const {Fajr, Zuhr, Asr, Maghrib, Isha} = current;
    const prayers = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
  return (
    <TouchableOpacity onPress = {() => {
        
        onRowPress(index)
        }}>
    <View style = {{width: 353, height: 160, borderRadius: 12, backgroundColor: 'white', marginVertical: 6, flexDirection: 'row', alignItems: 'center', 
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.25)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        })
    }}>

      <View style = {{width: 112, height: 136, marginLeft: 16, justifyContent: 'space-around', borderRightWidth: 1, borderRightColor: 'rgba(0,0,0,0.12)' }}>
        <Image source = {{uri: image}} style = {{flex: 5, width: 96, borderRadius: 8}} />
        <View style = {{width: 96,  justifyContent: 'center', }}>
        <Text style = {{fontWeight: 600, fontSize: 12, textAlign: 'center', marginVertical: 2, }}>{name}</Text>
        </View>
        <TouchableOpacity style = {{ height: 20,}}>
            <View style = {{width: 101, height: '100%', borderRadius: 100, backgroundColor: '#168AAD', justifyContent: 'center', alignItems: 'center', marginTop: 4}}>
                <Text style = {{fontSize: 8, fontWeight: 800, color: 'white', textAlign: 'center'}}>View Future Timings</Text>
            </View>
        </TouchableOpacity>

      </View>
      <View style = {{width: 190, height: 136, marginHorizontal: 17, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
            {prayers.map((prayer, index) => {
                const time = current[prayer];
                return (
                    <View style = {{height: '50%', width: '30%', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', borderRadius: 10,}} key = {index}>
                        <Text style = {{fontSize: 12, color: '#184E77'}}>{prayer}</Text>
                        <Text style = {{fontSize: 12, color: 'rgba(51,51,51,0.72)'}}>{time.trim()}</Text>
                    </View>
                )

            })
            }
            <View style = {{height: '50%', width: '30%', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', borderRadius: 10,}}>
                        <Text style = {{fontSize: 12, color: '#184E77'}}>Jummah</Text>
                        <View>
                        <Text style = {{fontSize: 12, color: 'rgba(51,51,51,0.72)'}}>{current['Jumu\'ah']}</Text>
                        {!!current['Jumu\'ah II'] ? <Text style = {{fontSize: 12, color: 'rgba(51,51,51,0.72)'}}>{current['Jumu\'ah II']}</Text> : null}
                        </View>
            </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default Prayer

const styles = StyleSheet.create({})