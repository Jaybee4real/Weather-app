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
        activeMeasureType: "C",
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
        }
    },
});
export default slice.reducer;
export const { saveData, setPermission, setActiveCity } = slice.actions;

export const getWeatherWhereOnEarth = payload => async dispatch => {
    console.log("Getting Weather details with location")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        await dispatch(getWeather(2459115)) // hardcoded to new york for now
        return;
    } else {
        await dispatch(setPermission(true));
        console.log("Permission givem")
    }
    let location = await Location.getCurrentPositionAsync();
    try {
        const result = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${location.coords.latitude},${location.coords.longitude}`)
        await dispatch(setActiveCity(result.data[0]))
        await dispatch(getWeather(result.data[0].woeid))
    } catch (e) {
        // console.log("Location could not be accessed!", e);
        return { e: "Failed to get table data" }
    }
};


const getWeather = payload => async dispatch => {
    console.log("Getting Weather details")
    try {
        const result = await axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${payload}`)
        await dispatch(saveData(result.data.consolidated_weather))
        console.log("Weather details received")
        return true
    } catch (e) {
        console.log("Something went wrong getting data", e);
        return e
    }
}


