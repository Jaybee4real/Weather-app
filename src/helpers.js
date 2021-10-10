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