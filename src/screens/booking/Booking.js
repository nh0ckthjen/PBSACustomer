import React, { Component } from "react";
import {
    Container,
    Tabs,
    Tab,
    Button,
    Text
} from "native-base";
import {Alert} from "react-native";

import styles from "./styles";
import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import {GetApiIpAddress} from "../../Utils/ApiUtils";

import CustomFooter from '../../Component/CustomeFooter';
export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.props.state = {
                tab1: false,
                tab2: true,
                tab3: false,
                tab4: false
        };
    }
    _showAlert(){
            Alert.alert(GetApiIpAddress());
    }
    render() {
        const {...props} = this.props;
        return (
            <Container style={styles.container}>
                <Tabs>
                    <Tab heading="Danh sách" >
                        <TabOne navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Bản đồ">
                        <TabTwo navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
                {/*<Button onPress={() => this._showAlert()}><Text>Check IP</Text></Button>*/}
                <CustomFooter link {...props} />
            </Container>

        );
    }
}
