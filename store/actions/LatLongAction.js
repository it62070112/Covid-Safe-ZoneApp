export const LAT_LONG_LOCATION = "LAT_LONG_LOCATION";

export const addLocation = (lat, long) => {
    return { type: LAT_LONG_LOCATION, latitude: lat, longitude: long }
}