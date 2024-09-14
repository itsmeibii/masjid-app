import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {sorter, getDistanceFromLatLonInMi} from "./sorter";
import { useModal } from '../context/AuthContext';
import util from 'util';




let mosques;




const MasjidDropdown = ({data , loc}) => {
    
    const [selected, setSelected] = useState([]);
    const {isAppReady} = useModal();
    

    if (!isAppReady) {
        return null
    }
    function format() {
        
        const {latitude, longitude} = loc;
        if (loc) {  
            
            return data
      .map(mosque => ({
        label: `${mosque.Masjid} (${getDistanceFromLatLonInMi(latitude, longitude, mosque.loc._latitude, mosque.loc._longitude).toFixed(1)} mi)`,
        value: mosque.Masjid,
        distance: getDistanceFromLatLonInMi(latitude, longitude, mosque.loc._latitude, mosque.loc._longitude)
      }))
      .sort((a, b) => a.distance - b.distance) // Sort by distance
      .map(mosque => ({
        label: mosque.label,
        value: mosque.value,
      }));
        
        
        } else {
          return data.map(mosque => ({
            label: mosque.Masjid,
            value: mosque.Masjid,
          }));
        }
    }
   
    
    
    

    return (
        <View style={styles.container}>
            
                <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={format()}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item => {
                    setSelected(item);
                    console.log(item);
                }}
                renderLeftIcon={() => (
                    <FontAwesome5
                        style={styles.icon}
                        color="black"
                        name="mosque"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
            
            
        </View>
    );
};

export default MasjidDropdown;

const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});
