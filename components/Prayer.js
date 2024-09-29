import { Platform, StyleSheet, Text, View, Image , TouchableOpacity, AppState} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'


const Prayer = ({data, onRowPress, index}) => {
    const [future, setFuture] = React.useState({show: false});
    
    const [appState, setAppState] = React.useState(AppState.currentState);
    const [nextPrayer, setNextPrayer] = React.useState(null);
    const {Masjid: name, imageURL: image, current} = data;
    const {Fajr, Zuhr, Asr, Maghrib, Isha} = current;
    const prayers = ['Fajr', 'Zuhr', 'Dhuhr', 'Thuhr', 'Asr', 'Maghrib', 'Isha'];
    
    React.useEffect(() => {
        function run() {
        if (data) {
            getNextPrayer(data);
            
            // if (data?.upcomingChanges) {
            //     let changes = data.upcomingChanges;
                
                
            //     let obj = {};
            //     changes.forEach(element => {
            //         for (let prayer in element.updatedPrayers) {
            //             obj[prayer] = element.updatedPrayers[prayer] + " " + element.effectiveDate.split('-').slice(0, 2).join('-');
            //         }
            //     });
                
            //     setFuture({...future,times : { ...obj}})
            
            // }
            if (data?.upcomingChanges) {
                let changes = data.upcomingChanges;
        
                // Define the correct prayer order
                const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Jummah'];
        
                let obj = {};
                
                // Process the changes to update the prayer times
                changes.forEach(element => {
                    let updatedPrayers = element.updatedPrayers;
                    
                    let effectiveDate = element.effectiveDate.split('-').slice(0, 2).join('-');
        
                    // Add prayers to the obj in the correct order
                    prayerOrder.forEach(prayer => {
                        if (updatedPrayers[prayer]) {
                            obj[prayer] = updatedPrayers[prayer] + " " + effectiveDate;
                        }
                    });
                });
        
                // Set future times in the correct order
                setFuture({ ...future, times: { ...obj } });
            }
            
        }
    }
    run();
    const handleAppStateChange = (nextAppState) => {
        // Only trigger when the app comes to the foreground
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          
          run(); // Rerun the effect logic when coming back to the foreground
        }
        setAppState(nextAppState);
      };
  
      const subscription = AppState.addEventListener('change', handleAppStateChange);
  
      // Cleanup the listener when the component unmounts
      return () => {
        subscription.remove();
      };
        
        
    }, [data, appState])
    function convertTo24HourTime(timeString) {
        // Remove any spaces and convert the string to uppercase
        if (!timeString) {
            return null;
        }
        
        timeString = timeString.replace(/\s+/g, '')
        
        
        timeString = timeString.toUpperCase();
        // Extract the period (AM/PM)
        const period = timeString.slice(-2);
      
        // Extract the hour and minute parts
        let [hours, minutes] = timeString.slice(0, -2).split(':');
        hours = parseInt(hours, 10);
      
        // Convert to 24-hour format
        if (period === 'PM' && hours !== 12) {
          hours += 12;
        }
        if (period === 'AM' && hours === 12) {
          hours = 0;
        }
      
        // Ensure hours and minutes are in two-digit format
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes.padStart(2, '0');
      
        return `${hours}:${minutes}`;
      }
      
      
      function getCurrent24HourTime() {
        const now = new Date();
      
        // Get hours and minutes
        let hours = now.getHours();
        const minutes = now.getMinutes();
      
        // Format hours and minutes to always be two digits
        hours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        // Return the formatted time
        return `${hours}:${formattedMinutes}`;
      }
      
      
      function isTomorrowMatchingDate(monthDayString) {
          // Parse the month and day from the string
          const [month, day] = monthDayString.split('/').map(Number);
        
          // Get today's date
          const today = new Date();
        
          // Get tomorrow's date
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
        
          // Check if tomorrow's month and day match the given string
          const isMatch =
            tomorrow.getMonth() + 1 === month && tomorrow.getDate() === day;
        
          return isMatch;
      }
      
      function getNextPrayer(masjid) {
          
          let next = {};
          for (let prayer of prayers) {
              if (prayer.substring(0,1) !== 'J') {
                
              if (convertTo24HourTime(masjid.current[prayer]) > getCurrent24HourTime()) {
                
                  next = {Prayer: prayer, Time: masjid.current[prayer]};
                  break;
              }
          }
          }
          if (!next) {
              //check if there is a change in tommorows fajr
              next.Prayer = 'Fajr';
                  let updated = masjid?.upcomingChanges;
                  if (updated) {
                      for (let date of updated) {
                          if (isTomorrowMatchingDate(date.effectiveDate.substring(0,4))) {
                              next.Time = date.updatedPrayers?.Fajr ?? masjid.current.Fajr;
                          }
                      }
                  }
              if (!next?.Time) {
                  next.Time = masjid.current.Fajr;
              }
      
              
              
          }
          
          return setNextPrayer(next);
      }
      function remspace(timeString) {
        // Use regex to check if there is a space between HH:MM and AM/PM
        if (/\d{1,2}:\d{2}\s[APMapm]{2}/.test(timeString)) {
          // If space is found, remove it using replace
          return timeString.replace(' ', '');
        }
        // Return the original string if no space is found
        return timeString;
      }
      function format(timeString) {
        if (!timeString) {
            return null;
        }
        // Regular expression to match a time string that might not have a space between time and AM/PM
        const timeRegex = /^(\d{1,2}:\d{2})([aApP][mM])$/;
        
        // Check if there's no space between the time and AM/PM
        if (timeRegex.test(timeString)) {
          // If no space, add one between HH:MM and AM/PM
          return timeString.replace(timeRegex, '$1 $2').toUpperCase();
        }
        
        // If the space is already present, return the original string
        return timeString.toUpperCase();
      }
      
      if (!nextPrayer || !data ) {
        return null;
      }
      
  return (
    <TouchableOpacity onPress = {() => {
        
        onRowPress(index)
        }} style = {{width: '100%'}}>
    <View style = {{width: '90%', height: 160, borderRadius: 12, backgroundColor: 'white', marginVertical: 6, flexDirection: 'row', alignItems: 'center', 
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
        <Text style = {{fontWeight: 600, fontSize: 12, textAlign: 'center', marginVertical: 2, }}>({data.duration})</Text>
        </View>
        {data.upcomingChanges && (
        <TouchableOpacity style = {{ height: 20,}} onPress = {() => setFuture({...future, show: !future.show})}>
            <View style = {{width: 101, height: '100%', borderRadius: 100, backgroundColor: '#168AAD', justifyContent: 'center', alignItems: 'center', marginTop: 4}}>
                <Text style = {{fontSize: 8, fontWeight: 800, color: 'white', textAlign: 'center'}}>{!future.show ? 'View Future Timings' : 'View Current Times'}</Text>
            </View>
        </TouchableOpacity>
        )}

      </View>
      <View style = {{width: 190, height: 136, marginHorizontal: 17, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
            {
                
            !future.show ? (
                <>
            {prayers.map((prayer, index) => {
                
                let next = false;
                
                if (prayer == nextPrayer?.Prayer) {
                    
                    next = !next;
                }
                const time = current[prayer];
                if (!time) {

                    return null;
                }
                if (['Dhuhr', 'Zuhr', 'Thuhr'].includes(prayer)) {
                    prayer = 'Zuhr';
                }
                return (
                    <View style = {{height: '50%', width: '30%', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: next ? 'black' : 'rgba(0,0,0,0.12)', borderRadius: 10, backgroundColor: next ? 'rgba(0,0,0,0.05)': 'white', textAlign: 'center'}} key = {index}>
                        <Text style = {{fontSize: 12, color: '#184E77'}}>{prayer}</Text>
                        <Text style = {{fontSize: 11, color: 'rgba(51,51,51,0.72)'}}>{format(time.trim())}</Text>
                    </View>
                )

            })}
            <View style = {{height: '50%',  justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)', borderRadius: 10, textAlign: 'center'}}>
                        <Text style = {{fontSize: 12, color: '#184E77', marginHorizontal: 3,}}>Jummah</Text>
                        <View>
                        {/* <Text style = {{fontSize: 12, color: 'rgba(51,51,51,0.72)'}}>{format(current['Jumu\'ah'])}</Text>
                        {!!current['Jumu\'ah II'] ? <Text style = {{fontSize: 12, color: 'rgba(51,51,51,0.72)'}}>{format(current['Jumu\'ah II'])}</Text> : null} */}
                        {Object.keys(current).filter(key => key.startsWith('J')).map((key, index) => {
                            return (
                                <Text style = {{fontSize: 10, color: 'rgba(51,51,51,0.72)'}} key = {index}>{format(current[key])}</Text>
                            )
                        })}
                        </View>
            </View>
            </>
            
        ) : (
            Object.entries(future.times).map(([prayer, time], index) => {
                if (!time) {
                    return null;
                }
            
                // Ensure there's no extra space between HH:MM and AM/PM
                
                
                let array = time.split(' ');
                // If array length is more than 2, clean up the time string
                if (array.length > 2) {
                    // Fix space issue between HH:MM and AM/PM
                    time = `${array[0]}${array[1]} ${array.slice(2).join(' ')}`;
                    
                } else {
                    // Ensure proper format by removing space between HH:MM and AM/PM
                    array[0] = array[0].replace(' ', '');
                }
                
                const [atime, period, date] = time.split(' ');
                
                let formattedDate = period;
                if (period && period.split('/').length === 3) {
                    // Convert MM/DD/YYYY to MM/DD
                    formattedDate = period.split('/').slice(0, 2).join('/');
                    
                }
                
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.12)',
                        borderRadius: 10,
                        backgroundColor: 'white',
                        marginVertical: 10
                    }} key={index}>
                        <Text style={{ fontSize: 12, color: '#184E77' }}>{prayer}</Text>
                        <Text style={{ fontSize: 12, color: 'rgba(51,51,51,0.72)' }}>{`${atime}`}</Text>
                        <Text style={{ fontSize: 12, color: 'rgba(51,51,51,0.72)' }}>{formattedDate}</Text>
                    </View>
                );
            })
        )
        
        }

            
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default Prayer

const styles = StyleSheet.create({})