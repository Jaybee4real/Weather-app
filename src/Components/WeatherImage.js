import React from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'


import ClearImage from '../../assets/images/Clear.png'
import HailImage from '../../assets/images/Hail.png'
import HeavyCloudImage from '../../assets/images/HeavyCloud.png'
import HeavyRainImage from '../../assets/images/HeavyRain.png'
import LightCloudImage from '../../assets/images/LightCloud.png'
import LightRainImage from '../../assets/images/LightRain.png'
import ShowerImage from '../../assets/images/Shower.png'
import SleetImage from '../../assets/images/Sleet.png'
import SnowImage from '../../assets/images/Snow.png'
import ThunderstormImage from '../../assets/images/Thunderstorm.png'



const { height, width } = Dimensions.get('window')
export default function WeatherImage({ type, imageStyles, ...props }) {

    var WeatherImage = {
        sn: SnowImage,
        sl: SleetImage,
        h: HailImage,
        t: ThunderstormImage,
        hr: HeavyRainImage,
        lr: LightRainImage,
        s: ShowerImage,
        hc: HeavyCloudImage,
        lc: LightCloudImage,
        c: ClearImage,
    }

    return (
        <Image source={WeatherImage[type]} style={[styles.image, imageStyles]} resizeMode="cover" resizeMethod="scale" />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    }
})
