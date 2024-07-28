function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
export function sorter(mosques,lat,lng) {




// Users location
    const userLocation = {
        lat,
        lng,
    };




// Calculate distance and sort by closest
    mosques.forEach(mosque => {
        mosque.distance = getDistanceFromLatLonInMi(userLocation.lat, userLocation.lng, mosque.lat, mosque.lng);
    });

    mosques.sort((a, b) => a.distance - b.distance);

// Output sorted list
    return mosques;
}
export function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance/1.60934; // Distance in miles
}