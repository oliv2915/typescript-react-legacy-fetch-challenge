import React from "react";
import DisplayWeather from "./DisplayWeather";

interface IGeoLocation {
    coords: ICoords
};

interface ICoords {
    accuracy?: number | null;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    latitude: number;
    longitude: number;
    speed?: number | null;
};

interface IForcast {
    weather: string;
    temp: number;
}

interface IState {
    geoLocation: ICoords;
    forcast: IForcast
};

interface IProps {
    forcast: IForcast;
};

export default class Weather extends React.Component<{}, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            geoLocation: {latitude: 0, longitude: 0},
            forcast: {weather: "", temp: 0}
        };
    }
    // no access to this keyword outside of arrow functions
    setGeoLocation = (geoLocationData: IGeoLocation): void => {
        const geo: ICoords = {
            longitude: geoLocationData.coords.longitude,
            latitude: geoLocationData.coords.latitude
        }
        this.setState({geoLocation: geo}, () => this.fetchWeather());
    }

    fetchWeather = (): void => {
        fetch(`${process.env.REACT_APP_OPENWEATHER_BASE_API_URL}?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lat=${this.state.geoLocation.latitude}&lon=${this.state.geoLocation.longitude}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                this.setState(
                    {forcast: {weather: data.weather[0].description, temp: data.main.temp}}
                )
            })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.setGeoLocation);
    }

    render() {
        return(
            <div>
               <DisplayWeather forcast={this.state.forcast} />
            </div>
        )
    }
}