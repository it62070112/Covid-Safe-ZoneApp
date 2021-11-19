import { LAT_LONG_LOCATION } from "../actions/LatLongAction";

const initialState = {
    lat: null,
    long: null
}

const LatLongReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAT_LONG_LOCATION: 
            return { lat: action.latitude, long: action.longitude }
        default:
            return state
    }
}

export default LatLongReducer;