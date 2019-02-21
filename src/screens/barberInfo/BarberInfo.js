import React, { Component } from "react";
import {
    Container,
    Text,
    Header,
    Body,
    Thumbnail,
    Content,
    Title,
    Tabs,
    Tab,
    Col,
    Row,
    Grid
} from "native-base";
import {ActivityIndicator, AsyncStorage} from "react-native";
import { Rating } from 'react-native-elements';
import styles from "./styles";

import TabInfo from "./tabInfo";
import TabReview from "./tabReview";
import TabImage from "./tabImage";
import datas from "../../constants/Data";
import {GetApiIpAddress} from "../../Utils/ApiUtils"


export default class BarberInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barberInfo: null,
        };
    }

    componentDidMount(){
        //get info barber with data pass from tabOne
        const { navigation } = this.props;
        let username = navigation.getParam('barberId', '1');
        let reqString = GetApiIpAddress()+"api/Barber/GetBarberInfo?username=" + username;
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
                    this.setState({ barberInfo: responseJson });
                    // AsyncStorage.setItem('barberInfo', responseJson);
                } else {
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        if(!this.state.barberInfo){
            return (
                <ActivityIndicator
                    animating={true}
                    size="large"
                />
            );
        }
        return (
            <Container style={styles.container}>
                <Grid>
                    <Row size={2} >
                        <Col size={3}>
                            <Thumbnail style={styles.avatarThumbnail} large source={{uri:this.state.barberInfo.coverImage}} />
                        </Col>
                        <Col size={7}>
                            <Row></Row>

                            <Row>
                                <Title style={styles.barberNametitle}>{this.state.barberInfo.fullName}</Title>
                            </Row>
                            <Row>
                                <Text style={styles.barberStarNumber}>{this.state.barberInfo.OverallRate}</Text>
                                <Rating startingValue={this.state.barberInfo.OverallRate}  imageSize={30} readonly/>
                                <Text style={styles.ratingCount}>{this.state.barberInfo.RatingCount}</Text>
                            </Row>
                            <Row></Row>
                        </Col>
                    </Row>
                    <Row size={7}>
                        <Tabs>
                            <Tab heading="Information" >
                                <TabInfo barberInfo={this.state.barberInfo} navigation={this.props.navigation}/>
                            </Tab>
                            <Tab heading="Review">
                                <TabReview barberInfo={this.state.barberInfo} navigation={this.props.navigation} />
                            </Tab>
                            <Tab heading="Image"  >
                                <TabImage barberInfo={this.state.barberInfo} navigation={this.props.navigation}/>
                            </Tab>
                        </Tabs>
                    </Row>
                </Grid>

            </Container>
        );
    }
}
