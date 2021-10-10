import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Location from 'expo-location';


const slice = createSlice({
    name: 'app',
    initialState: {
        weatherDetails: {},
        permissionGiven: false,
        activeCity: {
            title: "New York",
            woeid: 2459115,
            latt_long: "40.71455,-74.007118"
        },
        activeMeasureType: "celsius",
    },
    reducers: {
        saveData: (state, action) => {
            state.weatherDetails = action.payload;
        },
        setPermission: (state, action) => {
            state.permissionGiven = action.payload;
        },
        setActiveCity: (state, action) => {
            state.activeCity = action.payload;
        },
        toggleMeasureType: (state, action) => {
            state.activeMeasureType = action.payload;
        }
    },
});
export default slice.reducer;
export const { saveData, setPermission, setActiveCity, toggleMeasureType } = slice.actions;


export const checkPermission = payload => async dispatch => {
    let { granted } = await Location.getBackgroundPermissionsAsync();
    if (granted === false) {
        return false;
    } else {
        await dispatch(setPermission(true));
        return true
    }
}

export const getWeatherWithCurrentLocation = payload => async dispatch => {
    console.log("Getting Weather details with location")
    let location;
    let { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted === false) {
        return { error: "Access to location services denied" };
    } else {
        location = await Location.getCurrentPositionAsync();
    }
    try {
        const result = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${location.coords.latitude},${location.coords.longitude}`)
        await dispatch(setActiveCity(result.data[0]))
        await dispatch(getWeather(result.data[0].woeid))
    } catch (e) {
        // console.log("Location could not be accessed!", e);
        return { error: "Failed to get table data", e }
    }
};


export const getWeather = payload => async dispatch => {
    console.log("Getting Weather details")
    try {
        const result = await axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${payload}`)
        await dispatch(saveData(result.data.consolidated_weather))
        console.log("Weather details received")
        return true
    } catch (e) {
        return { error: "Failed to get table data, please try again", e }
    }
}


