import { FlatList, StyleSheet, Text, View, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import EventElement from './EventElement';
import { ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import EventSearch from './EventSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filter } from 'lodash';

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

const EventTable = ({ events, prayerData }) => {
    const [sorted, setSorted] = useState([]);
    const [unsorted, setUnsorted] = useState([]);
    const [value, setValue] = useState('Masjid');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');  // New state to track search input
    const [showUnspecifiedEvents, setShowUnspecifiedEvents] = useState(true);
  
    

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
                if (!prayer) {
                    
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

    const renderItem = ({ item, index }) => {
        const isfirst = index > 0 && data[index - 1].dateObj !== null && item.dateObj === null && value === 'Time';
        return <EventElement data={item} isfirst = {isfirst} />;
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
    
        return `12:00 AM`;
    }
    
    

    const keyExtractor = (item, index) => `${item.uniqueIdentifier || index}-${item.Date}`;
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
  
    function filterRemoveEvents(events) {
        const now = new Date();
        
        // Filter out past events if showPastEvents is false
        if (!showPastEvents) {
          events = events.filter(event => {
            return event.dateObj >= now || !event.dateObj;
          });
        }
      
        // Filter out events without dateObj if showUnspecifiedEvents is false
        if (!showUnspecifiedEvents) {
          events = events.filter(event => !!event.dateObj); // Only keep events with a dateObj
        }
      
        return events;
      }
  
    function filterBySearch(events) {
      if (searchQuery.trim() === '') return events;
      return events.filter(event => event.data.eventName.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()));
    }
    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }
  
    useEffect(() => {
        if (events) {
            let newUnsortedData = [];
    
            for (let [key, value] of Object.entries(events)) {
                let copy = value.map((entry, index) => {
                    let obj = entry.data;
                    let date = null;
    
                    if (isValidDate(new Date(obj.date.trim()))) {
                        let time = formatTimeString(obj.time.trim());
                        if (typeof time === 'string') {
                            let param = `${obj.date.trim()}T${convertTo24(time.trim())}`.trim();
                            date = new Date(param);
                        } else if (time) {
                            let timeString = getPrayer(key.substring(6), time.prayer);
                            let params = `${obj.date.trim()}T${convertTo24(timeString.trim()).trim()}`.trim();
                            date = new Date(params);
                        }
                    }
                    
                    return {
                        ...entry,
                        color: colors[key.substring(6)],
                        mosque: key.substring(6),
                        uniqueIdentifier: `${key}-${index}-${entry.data.date}`,
                        dateObj: date,
                    };
                });
    
                newUnsortedData = [...newUnsortedData, ...copy];
            }
    
            // Set unsorted array (raw data without sorting)
            setUnsorted(newUnsortedData);
            
    
            // Now create the sorted array without modifying unsorted
            const newSortedData = [...newUnsortedData].sort((a, b) => {
                if (a.dateObj === null) return 1; // Move nulls to the end
                if (b.dateObj === null) return -1;
                return a.dateObj - b.dateObj; // Sort valid dateObjs normally
            });
    
            setSorted(newSortedData);
        }
    }, [events]);
    

            // for (let event of newUnsortedData) {
            //     let obj = event.data;
                
            //     if (isValidDate(new Date(obj.date.trim()))) {
            //         // console.log(`${obj.eventName} BEFORE FORMATTING: ${obj.time}`);
            //         let time = formatTimeString(obj.time.trim());
            //         // console.log(`${obj.eventName} : ${time}`);
            //         if (!time) {
            //             noDates.push(event);
            //             // console.log('RAN')
            //         } else if (typeof time === 'string') {
            //             // console.log(`RESPECTIVE TIME ${convertTo24(time.trim())}`);
            //             let param = `${obj.date.trim()}T${convertTo24(time.trim())}`.trim()
            //             let date = new Date(param);
            //             // console.log(`PARAMS -${param}-`);
            //             // console.log("DATE OBJECT " + date);
            //             // console.log(`${event.data.eventName} : ${date}`);
            //             let copy = {
            //                 ...event,
            //                 dateObj: date,
            //             };
            //             newSortedData.push(copy);
            //         } else {
                        
            //             let timeString = getPrayer(event.mosque, time.prayer);
            //             // console.log(`TIME STRING: ${timeString}`);  
            //             let params = `${obj.date.trim()}T${convertTo24(timeString.trim()).trim()}`.trim();
            //             // console.log(params)
            //             let date = new Date(params);
            //             // console.log(`DATE OBJECT: ${date}`);
            //             let copy = {
            //                 ...event,
            //                 dateObj: date,
            //             };
            //             newSortedData.push(copy);
            //         }
            //     } else {
            //         noDates.push(event);
                    
            //     }
            // }

            
            
    useEffect(() => {
      let filteredData = value === 'Masjid' ? unsorted : sorted;
      let temp = filteredData.filter((event) => event.dateObj === null);
            console.log('YESS' + temp.length)
        
      
        
    filteredData = filterRemoveEvents(filteredData);
    temp = filteredData.filter((event) => event.dateObj === null);
    console.log('AFTER FILTERING' + temp.length)
      
      
      filteredData = filterBySearch(filteredData);  // Apply search filter here
      setData(filteredData);
    }, [value, unsorted, sorted, showPastEvents, searchQuery, showUnspecifiedEvents]);
    
    return (
      <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: 15 }}>
        <View style={{ height: 44, width: 353, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <EventSearch setValue={setValue} value={value} past={setShowPastEvents} setSearchQuery={setSearchQuery}   />
        </View>
  
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, alignItems: 'center' }}>
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
          <Text style = {{marginRight: 5, fontSize: 10,}}>Show Past Events</Text>
          <Switch value={showPastEvents} onValueChange={() => {setShowPastEvents(!showPastEvents);}} />
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
            <Text style = {{marginRight: 5, marginLeft: 10, fontSize: 10,}}>Show Unspecified Events</Text>
            <Switch value={showUnspecifiedEvents} onValueChange={() => {setShowUnspecifiedEvents(!showUnspecifiedEvents); console.log(!showUnspecifiedEvents)}} />
            </View>
        </View>
  
        <View style={{ width: '100%', flex: 1, marginTop: 12 }}>
          {data.length === 0 ? (
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>No events found</Text>
          ) : (
            <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} style={{ width: '100%', flexGrow: 0 }} contentContainerStyle={{ alignItems: 'center', width: '100%' }} />
          )}
        </View>
      </View>
    );
  };

export default EventTable;



  