import React, { Component } from "react";
import {
    Container,
    Text,
    Input,
    Button,
    Row,
    Col,
    Item,
    Left,
    Right,
    Icon,
    ListItem,
    List
} from "native-base";
import {Alert} from "react-native";
import styles from "./styles";

import {SetApiIpAddress} from "../../Utils/ApiUtils";
const menuList = [
    "Simon Mignolet",
    "Nathaniel Clyne",
    "Dejan Lovren",
    "Mama Sakho",
    "Alberto Moreno",
    "Emre Can",
];


export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApiIp: "",
        };
    }
    _ChangeApiIp(){
        if (this.state.ApiIp !== ""){
            try{
                SetApiIpAddress(this.state.ApiIp);
                this.props.navigation.navigate('Home');
            } catch(ex){
                console.log(ex);
            }

        }
    }
    _menuPress(index){

        switch (index){
            case '0':
                Alert.alert("alo");
                break;
            case '1':
                Alert.alert("dang");
                break;
            case '2':
                Alert.alert("test");
                break;
            case '3':
                Alert.alert("thu");
                break;
            case '4':
                Alert.alert("thoi");
                break;
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <Row size={3}></Row>
                <Row size={7}>
                    <List
                        dataArray={menuList}
                        renderRow={(menuItem, sectionID, index) =>
                            <ListItem  onPress={() => this._menuPress(index)}>
                                <Left>
                                    <Text>
                                        {menuItem}
                                    </Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>}
                    />
                </Row>
                <Row size={1}>
                    <Input placeholder="Ip Address" onChangeText={(text) => this.setState({ApiIp : text})}/>
                    <Button onPress={() => this._ChangeApiIp()}><Text>Đổi Ip</Text></Button>
                </Row>

            </Container>
        );
    }
}
