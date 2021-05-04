import React from "react";
import Weather from "./Weather";

interface IWeatherProps {
    forcast: IForcast;
}

interface IForcast {
    weather: string;
    temp: number;
}

const DisplayWeather: React.FunctionComponent<IWeatherProps> = (props) => {
    return (
        <div>
            <h2>Here is today's forcast.</h2>
                <p style={{textTransform: "capitalize"}}>Current Weather: {props.forcast.weather}</p>
                <p>Current Tempature: {props.forcast.temp}°F</p>
        </div>
    )
}

export default DisplayWeather;