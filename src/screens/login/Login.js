import React, { Component } from "react";
import { StatusBar } from "react-native";
import {
    Container,
    Text
} from "native-base";
import styles from "./styles";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>

                    <Text>Login screen</Text>
            </Container>
        );
    }
}
