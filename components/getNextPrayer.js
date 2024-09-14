mosqueData = [{"Masjid": "Gwinnett Islamic Circle", "current": {"Asr": "5:26 PM", "Dhuhr": "1:42 PM", "Fajr": "5:16 AM", "Isha": "9:51 PM", "Jumu'ah": "2:10 PM", "Jumu'ah II": "3:00 PM", "Maghrib": "8:37 PM"}, "id": "GIC", "imageURL": "http://res.cloudinary.com/dhgy0ct5f/image/upload/v1723169010/GIC.jpg", "lastUpdated": "8/4/2024", "loc": {"_latitude": 34.02732, "_longitude": -84.04733}}, {"Masjid": "Hamzah Islamic Center", "current": {"Asr": "5:28pm", "Fajr": "5:34am", "Isha": "9:54pm", "Jumu'ah": "2:00PM", "Maghrib": "8:36pm", "Zuhr": "1:44pm"}, "id": "HIC", "imageURL": "http://res.cloudinary.com/dhgy0ct5f/image/upload/v1723169469/hic.jpg", "lastUpdated": "8/4/2024", "loc": {"_latitude": 34.11766, "_longitude": -84.24867}, "upcomingChanges": [[Object], [Object]]}, {"Masjid": "Islamic Center of North Fulton (ICNF)", "current": {"Asr": "5:27pm", "Fajr": "5:16am", "Isha": "9:54pm", "Jumu'ah": "1:45PM", "Jumu'ah II": "2:45PM", "Maghrib": "8:36pm", "Shurooq": "6:49am", "Zuhr": "1:44pm"}, "id": "ICNF", "imageURL": "http://res.cloudinary.com/dhgy0ct5f/image/upload/v1723168633/icnf.jpg", "lastUpdated": "8/4/2024", "loc": {"_latitude": 34.07376, "_longitude": -84.32345}, "upcomingChanges": [[Object], [Object]]}, {"Masjid": "Roswell Community Masjid", "current": {"Asr": "5:27 pm", "Fajr": "5:33 am", "Isha": "9:53 pm", "Jumu'ah": "1:50PM", "Jumu'ah II": "2:40PM", "Maghrib": "8:36 pm", "Sunrise": "6:50 am", "Zuhr": "1:43 pm"}, "id": "RCM", "imageURL": "http://res.cloudinary.com/dhgy0ct5f/image/upload/v1723168877/rcm.png", "lastUpdated": "8/4/2024", "loc": {"_latitude": 34.03071, "_longitude": -84.34033}}]
function convertTo24HourTime(timeString) {
  // Extract the period (AM/PM)
  if (!timeString) {
    return null;
  }
  
  const period = timeString.slice(-2).trim().toUpperCase();
  
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
    const prayerOrder = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];
    let next;
    for (let prayer of prayerOrder) {
      
        if (prayer.substring(0,1) !== 'J') {
        
        if (convertTo24HourTime(masjid.current[prayer]) > getCurrent24HourTime()) {
            
            
            next = {Prayer: prayer, Time: masjid.current[prayer]};
            break;
        }
    }
    }
    if (!next) {
        //check if there is a change in tommorows fajr
        next = {Prayer: 'Fajr'}
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
    return next;
}



export default getNextPrayer