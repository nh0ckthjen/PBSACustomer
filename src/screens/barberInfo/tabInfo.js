import React, { Component } from "react";
import { Content, Card, Button, Text, Icon, Col, Row, Grid } from "native-base";
import styles from "./styles";
import {ActivityIndicator} from "react-native";


export default class TabInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


  render() {

      return (
          <Grid>
            <Row size={4} style={styles.TabInfoContent} >
                <Grid>
                    <Row>
                        <Col size={1} style={styles.TabInfoColIcon}>
                            <Icon
                            name="navigate"
                            />
                        </Col>
                        <Col size={4} style={styles.TabInfoColText}><Text>{this.props.barberInfo.address}</Text></Col>
                    </Row>
                    <Row >
                        <Col size={1} style={styles.TabInfoColIcon}>
                            <Icon
                            name="md-phone-portrait"
                            />
                        </Col>
                        <Col size={4} style={styles.TabInfoColText}><Text>{this.props.barberInfo.contactPhone}</Text></Col>
                    </Row>
                    <Row >
                        <Col size={1} style={styles.TabInfoColIcon}>
                            <Icon
                            name="md-timer"
                            />
                        </Col>
                        <Col size={4} style={styles.TabInfoColText}><Text>7h - 17h</Text></Col>
                    </Row>
                    <Row></Row>
                </Grid>

            </Row>
            <Row size={1} style={styles.TabInfoBtnContent} >
              <Button onPress={() => this.props.navigation.navigate('chooseService', {barberId: this.props.barberInfo})}><Text>Booking</Text></Button>
            </Row>
          </Grid>
    );
  }
}
