import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

const AltTable = ({ data }) => {
    function removeLetters(timeString) {
        return timeString.replace(/[a-zA-Z]/g, '').trim();
    }

    const [prayerChanges, setPrayerChanges] = useState({});

    const handleData = () => {
        let updatedPrayerChanges = {};

        for (let i = 0; i < data.length; ++i) {
            let changes = data[i]?.upcomingChanges;
            if (changes) {
                let obj = {};
                changes.forEach(element => {
                    for (let prayer in element.updatedPrayers) {
                        obj[prayer] = element.updatedPrayers[prayer] + " " + element.effectiveDate.split('-').slice(0, 2).join('-');
                    }
                });
                updatedPrayerChanges[data[i].id] = obj;
            }
        }

        setPrayerChanges(updatedPrayerChanges); // Update the state
    };

    useEffect(() => {
        handleData();
    }, [data]); // Re-run when data changes

    const styles = StyleSheet.create({
        cell: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 60, // Set a fixed height for the cell to ensure consistency
        },
        stackedCell: {
            right: 20,
        },
        singleCell: {
            flex: 1,
            justifyContent: 'center', // Vertically center the single Jumu'ah time
            alignItems: 'center',
        },
        text: {
            fontSize: 13,
            textAlign: 'center',
            marginVertical: 2,
        },
        divider: {
            width: '100%',
            height: 1,
            backgroundColor: '#ddd',
            marginVertical: 2,
        },
    });

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    const renderCell = (prayerTime) => {
        if (!prayerTime) {
            return <Text style={{marginLeft: 10,}}>-</Text>;
        }

        const [time, date] = prayerTime.split(' ');

        return (
            <View style={styles.cellContainer}>
                <Text style={{fontSize: 12,}}>{time}</Text>
                <Text style={{fontSize: 12,}}>{date}</Text>
            </View>
        );
    };
    return (
        <DataTable>
            <DataTable.Header style={{ left: 12 }}>
                <DataTable.Title></DataTable.Title>
                <DataTable.Title>F</DataTable.Title>
                <DataTable.Title>T</DataTable.Title>
                <DataTable.Title>A</DataTable.Title>
                <DataTable.Title>M</DataTable.Title>
                <DataTable.Title>I</DataTable.Title>
            </DataTable.Header>
            {Object.entries(prayerChanges).map(([key, value], index) => (
                <DataTable.Row key={key || index}>
                    <DataTable.Cell>{key}</DataTable.Cell>
                    <DataTable.Cell>{renderCell(value?.['Fajr'])}</DataTable.Cell>
                    <DataTable.Cell>{renderCell(value?.['Thuhr'])}</DataTable.Cell>
                    <DataTable.Cell>{renderCell(value?.['Asr'])}</DataTable.Cell>
                    <DataTable.Cell>{renderCell(value?.['Maghrib'])}</DataTable.Cell>
                    <DataTable.Cell>{renderCell(value?.['Isha'])}</DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}

export default AltTable;

const styles = StyleSheet.create({});
