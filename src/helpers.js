export const formatDate = (dateVal) => {
    var date = new Date(dateVal)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let currentDay = days[date.getDay()] + ' ' + date.getDate() + ' ' + monthNames[date.getMonth()]
    return currentDay
}


export const convertUnit = (val, type = 'celsius') => {
    let convertedUnitValue
    if (type === 'celsius') {
        convertedUnitValue = Math.round(val) + '°C'
    } else if (type === 'fahrenheit') {
        convertedUnitValue = Math.round(val * (9 / 5) + 32) + '°F'
    } return convertedUnitValue
}

export const rotateIconBasedOnDirection = (direction) => {
    let rotation = {
        "N": 0,
        "NNE": 22.5,
        "NE": 45,
        "ENE": 67.5,
        "E": 90,
        "ESE": 112.5,
        "SE": 135,
        "SSE": 157.5,
        "S": 180,
        "SSW": 202.5,
        "SW": 225,
        "WSW": 247.5,
        "W": 270,
        "WNW": 292.5,
        "NW": 315,
        "NNW": 337.5,
    }
    return rotation[direction] - 45 // the icon is rotated 45 degrees to the right 
}