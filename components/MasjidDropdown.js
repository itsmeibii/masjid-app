import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {sorter, getDistanceFromLatLonInMi} from "./sorter";

let listofmosques = [
    {
        name: 'Gwinnett Islamic Circle',
        lat: 34.02732,
        lng:-84.04733
    },
    {
        name: 'Hamzah Islamic Center',
        lat: 34.11766,
        lng:-84.24867,
    },
    {
        name: 'Islamic Center of North Fulton',
        lat: 34.07376,
        lng:-84.32345,
    },
    {
        name: 'Roswell Community Masjid',
        lat: 34.03071,
        lng:-84.34033,
    },
];

const MasjidDropdown = ({loc}) => {
    const [selected, setSelected] = useState([]);
    const [mosqueData, setMosqueData] = useState([]);

    useEffect(() => {
        let data;
        if (loc) {
            const { latitude, longitude } = loc;
            const sorted = sorter(listofmosques, latitude, longitude);
            data = sorted.map(mosque => ({
                label: `${mosque.name} (${getDistanceFromLatLonInMi(latitude, longitude, mosque.lat, mosque.lng).toFixed(1)} mi)`,
                value: mosque.name,
            }));
        } else {
            data = listofmosques.map(mosque => ({
                label: mosque.name,
                value: mosque.name,
            }));
        }
        setMosqueData(data);
    }, [loc]);

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={mosqueData}
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
