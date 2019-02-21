import React, { Component } from "react";
import { Content, Card, CardItem, Text, Body,ListItem, Left, Thumbnail } from "native-base";
import {View} from "react-native";
import { MapView, Location, Permissions, Marker } from "expo";
import styles from "../barberInfo/styles";
import {GetApiIpAddress} from "../../Utils/ApiUtils"
const avatar = require("../../assets/images/avatar.jpg");
import { Rating } from 'react-native-elements';

export default class TabTwo extends Component {
    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        markers: [
        ],
    };


    componentDidMount() {
        this._getLocationAsync();
        this._getBarberAsync();
    }

    _getBarberAsync = async () => {
        let city = "79";
        let reqString = GetApiIpAddress()+"api/Barber/SearchByCity?city=" + city;
        fetch(reqString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson != null){
                    // Alert(responseJson);
                    this.setState({ markers: responseJson });
                    console.log(this.state.markers);
                } else {
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }


    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });

        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});

    };

    render() {
        if (!this.state.markers) {
            return (
                <ActivityIndicator
                    animating={true}
                    size="large"
                />
            );
        }
        return (
            <MapView style={{flex: 1}}
                     region={this.state.mapRegion}
                     onRegionChange={this._handleMapRegionChange}
                     showsUserLocation={true}
            >
                {this.state.markers.map((marker, index) => {
                    return (
                        <MapView.Marker key={index}
                                        coordinate={{
                                            latitude: marker.latitude,
                                            longitude: marker.longitude}}
                                        showsMyLocationButton={true}
                                        onCalloutPress= {() => this.props.navigation.navigate('BarberInfo', {barberId: marker.userId})}
                        >
                            <MapView.Callout>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail size={20} source={{uri: marker.coverImage}} />
                                    </Left>
                                    <Body>
                                    <Text>
                                        {marker.fullName}
                                    </Text>
                                    <Rating startingValue={marker.OverallRate}  imageSize={10} readonly/>
                                    </Body>
                                </ListItem>
                            </MapView.Callout>

                        </MapView.Marker>
                    );
                })}
            </MapView>
        );

    }
}
