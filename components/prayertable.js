import React, { useState, useEffect } from 'react';
import { Button, DataTable } from 'react-native-paper';
import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native';
import AltTable from './nextchangetable';

const PrayerTable = ({ data, nextPrayer, onRowPress }) => {
    const [current, setCurrent] = useState(true);
    const filter = (name) => {
        if (name.length > 4) {
            return;
        }
    }
    
    const styles = StyleSheet.create({
        center : {
            justifyContent: 'center',
            alignItems: 'center',
        },
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
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    function removeLetters(timeString) {
       let replace = timeString.replace(/[a-zA-Z]/g, '').trim();
       if (replace.charAt(0) == '0') {
        replace = replace.slice(1);
       }
       return replace;
    }

    function isNextPrayer(prayer, index) {
        return prayer === nextPrayer?.Prayer && !index;
    }

    return (
        <>
        <ScrollView style={{ flex: 1, width: '100%', marginTop: 70,  }}>
            {current ? (
                <DataTable>
                    <DataTable.Header style={{ left: 12 }}>
                        <DataTable.Title style = {{right: 7,}}>Masjid</DataTable.Title>
                        <DataTable.Title>Fajr</DataTable.Title>
                        <DataTable.Title>Thuhr</DataTable.Title>
                        <DataTable.Title>Asr</DataTable.Title>
                        <DataTable.Title style = {{right: 10,}}>Maghrib</DataTable.Title>
                        <DataTable.Title>Isha</DataTable.Title>
                        <DataTable.Title style = {{right: 20,}}>Jummah</DataTable.Title>
                    </DataTable.Header>
                    {data.map((item, index) => (
                        <Pressable key={item.id || index} onPress={() => onRowPress(index)}>
                            <DataTable.Row key={item.id || index}>
                                <DataTable.Cell style = {{backgroundColor: '#dee3df', justifyContent: 'center'}} ><Text style = {{fontSize: 12,}}>{item.id}</Text></DataTable.Cell>
                                <DataTable.Cell style={[isNextPrayer('Fajr', index) ? { backgroundColor: '#e6f19f' } : null,styles.center]}><Text style = {{color: 'black'}}>
                                    {removeLetters(item.current.Fajr)}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={[isNextPrayer('Zuhr', index) ? { backgroundColor: '#e6f19f' } : null, styles.center]}><Text style = {{color: 'black'}}>
                                    {removeLetters(item.current.Dhuhr ?? item.current.Zuhr ?? item.current.Thuhr)}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={[isNextPrayer('Asr', index) ? { backgroundColor: '#e6f19f' } : null, styles.center]}> <Text style = {{color: 'black'}}>
                                    {removeLetters(item.current.Asr)}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={[isNextPrayer('Maghrib', index) ? { backgroundColor: '#e6f19f' } : null,styles.center]}> <Text style = {{color: 'black'}}>
                                    {removeLetters(item.current.Maghrib)}
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={[isNextPrayer('Isha', index) ? { backgroundColor: '#e6f19f' } : null,styles.center]}> <Text style = {{color: 'black'}}>
                                    {removeLetters(item.current.Isha)}
                                    </Text>
                                </DataTable.Cell>
                                {item.current?.["Jumu'ah II"] ? (
                                    <DataTable.Cell numeric>
                                        <View style={styles.stackedCell}>
                                            <Text style={styles.text}>
                                                {removeLetters(item.current["Jumu'ah"])}
                                            </Text>
                                            <View style={styles.divider} />
                                            <Text style={styles.text}>
                                                {removeLetters(item.current["Jumu'ah II"])}
                                            </Text>
                                        </View>
                                    </DataTable.Cell>
                                ) : (
                                    <DataTable.Cell numeric style={{ right: 20 }} textStyle={{ fontSize: 13 }}>
                                        {removeLetters(item.current["Jumu'ah"])}
                                    </DataTable.Cell>
                                )}
                            </DataTable.Row>
                        </Pressable>
                    ))}
                </DataTable>
            ) : (
                <AltTable data={data} />
            )}
            
        </ScrollView>
        <Button
        mode={current ? 'outlined' : 'contained'}
        style={{ marginTop: 30, marginLeft: 150, width: 200 }}
        onPress={() => setCurrent(!current)}
    >
        {current ? 'See Future Changes' : 'See Current Timings'}
    </Button>
    </>
    );
};

export default PrayerTable;
