import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import EventElement from './EventElement';
import { ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import EventSearch from './EventSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EventTable = ({ events, prayerData }) => {
    
    const [sorted, setSorted] = useState([]);
    const [unsorted, setUnsorted] = useState([]);   
    const [value, setValue] = useState('Masjid');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    

    async function loadFilter() {
        setLoading(true);
        try {
            let temp = await AsyncStorage.getItem('filter');
            if (temp) {
                setValue(temp);
            }
            setLoading(false);
        } catch (e) {
            throw e;
        }
    }
    
    function convertToISO(dateString) {
        const [datePart, timePart, period] = dateString.split(/[\s:]+/);
    let [hours, minutes] = timePart.split(':');
    
    // Convert to 24-hour format
    if (period.toLowerCase() === 'pm' && hours !== '12') {
        hours = parseInt(hours) + 12;
    } else if (period.toLowerCase() === 'am' && hours === '12') {
        hours = '00'; // Midnight case
    }

    // Format the time part with hours and minutes in 24-hour format
    const time24 = `${String(hours).padStart(2, '0')}:${minutes}:00`; // Adds seconds as `:00`

    // Concatenate the date part with the time part to form an ISO 8601 string
    return `${datePart}T${time24}`;
    }
    function getPrayer (masjid, prayer) {
        let names = ['Thuhr', 'Zuhr', 'Dhuhr']
        
        for (let mosque of prayerData) {
            // console.log(Object.keys(mosque))
            if (mosque.abr === masjid) {
                
                // console.log('RUNNNNNNNNNNNNNNNNNNNNNN')
                if (names.includes(prayer)) {
                    return mosque.current['Zuhr'];
                }
                return mosque.current[prayer.trim()].toUpperCase().trim();
            }
        }
    }

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    const colors = {
        GIC: '#ffc300',
        HIC: 'rgb(109,180,156)',
        RCM: 'rgb(63,7,131)',
        ICNF: 'rgb(201,205,68)',
        ARCC: 'rgb(88,193,205)',
        YCC: '#f4acb7',
        MAZ: '#003566',
        SCC: '#656d4a',
    };

    const renderItem = ({ item }) => {
        return <EventElement data={item} />;
    };
    const convertTo24 = (time) => {
    
        let hours = +(time.trim().split(':')[0]);
        
        if (time.trim().slice(-2).toLowerCase() === 'pm') {
            hours += 12;
        }
        return `${hours}:${time.split(' ')[0].slice(-2)}:00`
    }

    function formatTimeString(timeString) {
        const lowerTimeString = timeString.toLowerCase();
    
        if (lowerTimeString.includes("no time specified")) {
            return null;
        }
    
        // Check for time first
        const timeRangeRegex = /(\d{1,2}:\d{2}\s*[APMapm]{2})/;
        const timeMatch = timeString.match(timeRangeRegex);
    
        if (timeMatch) {
            let time = timeMatch[0];
    
            // Ensure exactly one space before AM/PM
            time = time.replace(/\s*([APMapm]{2})$/, ' $1');
            
            return time;
        }
    
        // Check for prayer name if no time is found
        const prayerTimes = [
            { variants: ["fajr"], name: "Fajr" },
            { variants: ["dhuhr", "duhr", "zuhr", "thuhr"], name: "Thuhr" },
            { variants: ["asr"], name: "Asr" },
            { variants: ["maghrib"], name: "Maghrib" },
            { variants: ["isha"], name: "Isha" }
        ];
    
        for (let prayer of prayerTimes) {
            for (let variant of prayer.variants) {
                if (lowerTimeString.includes(variant)) {
                    return { prayer: prayer.name };
                }
            }
        }
    
        return null;
    }
    
    

    const keyExtractor = (item, index) => `${item.uniqueIdentifier || index}-${item.Date}`;

    useEffect(() => {
        if (events) {
            // console.log(Array.isArray(events['eventsHIC']))
            
            let newUnsortedData = [];
            let newSortedData = [];
            let noDates = [];

            for (let [key, value] of Object.entries(events)) {
                let copy = value.map((entry, index) => ({
                    ...entry,
                    color: colors[key.substring(6)],
                    mosque: key.substring(6),
                    uniqueIdentifier: `${key}-${index}-${entry.data.date}`,
                }));
                newUnsortedData = [...newUnsortedData, ...copy];
                // console.log("UNSORTED ARRAY: " + typeof newUnsortedData)
            }

            setUnsorted(newUnsortedData);

            for (let event of newUnsortedData) {
                let obj = event.data;
                
                if (isValidDate(new Date(obj.date.trim()))) {
                    // console.log(`${obj.eventName} BEFORE FORMATTING: ${obj.time}`);
                    let time = formatTimeString(obj.time.trim());
                    // console.log(`${obj.eventName} : ${time}`);
                    if (!time) {
                        noDates.push(event);
                        // console.log('RAN')
                    } else if (typeof time === 'string') {
                        // console.log(`RESPECTIVE TIME ${convertTo24(time.trim())}`);
                        let param = `${obj.date.trim()}T${convertTo24(time.trim())}`.trim()
                        let date = new Date(param);
                        // console.log(`PARAMS -${param}-`);
                        // console.log("DATE OBJECT " + date);
                        // console.log(`${event.data.eventName} : ${date}`);
                        let copy = {
                            ...event,
                            dateObj: date,
                        };
                        newSortedData.push(copy);
                    } else {
                        
                        let timeString = getPrayer(event.mosque, time.prayer);
                        // console.log(`TIME STRING: ${timeString}`);  
                        let params = `${obj.date.trim()}T${convertTo24(timeString.trim()).trim()}`.trim();
                        // console.log(params)
                        let date = new Date(params);
                        // console.log(`DATE OBJECT: ${date}`);
                        let copy = {
                            ...event,
                            dateObj: date,
                        };
                        newSortedData.push(copy);
                    }
                } else {
                    noDates.push(event);
                    
                }
            }

            newSortedData = newSortedData.sort((a, b) => a.dateObj - b.dateObj);
            setSorted([...newSortedData, ...noDates]);
            // console.log("SORTED ARRAY: " + JSON.stringify(newSortedData.slice(0,5)))

            setData(newUnsortedData);
        }
    }, [events]);

    useEffect(() => {
        // console.log(value)
        // console.log(data[0])
        if (value === 'Masjid') {
            setData(unsorted);  
        } else if (value === 'Time') {
            setData(sorted);  
        }
    }, [value, unsorted, sorted]); 
    let keys = ['Location', 'Event', 'Date', 'Time'];
    const styles = StyleSheet.create({
        title: {
            marginTop: 10,
            flex: 0.15,
            width: '90%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomColor: 'gray',
            borderBottomWidth: 2,
        },
        key: {
            width: '100%',
            flexDirection: 'row',
        },
        label: {
            paddingHorizontal: 15,
            borderRightColor: 'gray',
            borderRightWidth: 1,
            flex: 1,
            alignItems: 'center',
        },
    });

    if (!events) {
        return null;
    }

    // return (
    //     <View style={{ flex: 1, width: '100%', backgroundColor: '#b8bfb9', alignItems: 'center' }}>
    //         <View style={[styles.title, {}]}>
    //             <View style={{ flexDirection: 'row', width: '90%', height: 50, alignItems:'center' }}>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Events</Text>
    //                 <View style={{ marginLeft: 10, height: 50, flex: 2, width: 250 }}>
    //                     <SegmentedButtons
    //                         style={{ width: 250 }}
    //                         value={value}
    //                         onValueChange={setValue}
    //                         buttons={[
    //                             {
    //                                 value: 'Masjid',
    //                                 label: 'Sort by Masjid',
    //                                 labelStyle: {fontSize: 8,},
    //                                 style: {width: 100},
    //                             },
    //                             {
    //                                 value: 'Time',
    //                                 label: 'Sort by Next Time',
    //                                 labelStyle: {fontSize: 8,},
    //                                 style: {width: 150}
    //                             },
    //                         ]}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={styles.key}>
    //                 {['Location', 'Event', 'Date', 'Time'].map((key, index) => (
    //                     <View
    //                         key={index}
    //                         style={[styles.label, index === keys.length - 1 ? { borderRightWidth: 0 } : null]}
    //                     >
    //                         <Text style={{ fontSize: 10 }}>{key}</Text>
    //                     </View>
    //                 ))}
    //             </View>
    //         </View>
    //         <View style={{ width: '90%', flex: 1 }}>
    //             {data.length === 0 ? <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>No events found</Text> : (
    //                 <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
    //             )}
                
    //         </View>
    //     </View>
    // );
    useEffect(() => {loadFilter()},[]);

    if (loading) {
        return <ActivityIndicator size="large" color="green" />
    }
    return (
        <View style = {{flex: 1, width: '100%', alignItems: 'center', marginTop: 15}}>
            <View style = {{height: 44, width: 353, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                <EventSearch setValue = {setValue}/>
            </View>
            <View style={{ width: '100%', flex: 1, marginTop: 12,  }}>
                 {data.length === 0 ? <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>No events found</Text> : (
                    
                    <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} style = {{width: '100%', flexGrow: 0}} contentContainerStyle = {{alignItems: 'center', width: '100%'}} />
                    
                    
                 )}
                
            </View>
        </View>
    )
};

export default EventTable;
