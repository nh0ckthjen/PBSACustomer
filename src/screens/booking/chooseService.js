import React, { Component } from 'react';
import { Container,
  Header,
  Footer,
  Left,
  Body,
  Right,
  Button,
  Title,
  Segment,
  Content,
  List,
  ListItem,
  Thumbnail,
  CheckBox,
  View,
  Text,
    Col,
  Item} from 'native-base';
import {FlatList,  Alert} from 'react-native'
import styles from "./../home/styles";
import {ActivityIndicator} from "react-native";
import {GetApiIpAddress} from "../../Utils/ApiUtils"
var tempCheckValues = [];
export default class SegmentOutsideHeaderExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchValue: '',
        dataList: null,
        barberInfo: null,
        checkBoxChecked: []
    };
  }
  componentDidMount(){
    //get info barber with data pass from tabOne
      const { navigation } = this.props;
      let barberInfo = navigation.getParam('barberId', '1');
      this.setState({ barberInfo: barberInfo });
      let reqString = GetApiIpAddress()+"service/get-all?barberId=" + barberInfo.username;
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
                  this.setState({ dataList: responseJson });
                  console.log(responseJson);
              } else {
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }
  checkBoxChanged(id) {
    let tmp = this.state.checkBoxChecked;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );

    } else {
      tmp.push( id );
    }

    this.setState({
      checkBoxChecked: tmp
    });
    console.log(this.state.checkBoxChecked)
  }

  _caculateDuration(){
      let sumDuration = 0;
      this.state.dataList.map((service) => {
          this.state.checkBoxChecked.map((checkboxId) => {
                if(service.id == checkboxId) {
                    sumDuration += service.durationMinute
                }
          });
      });
      return sumDuration;
  }

    _goback(){
      this.props.navigation.goBack();
    }

    _continueBooking(){
        // AsyncStorage.setItem('chooseService', this.state.checkBoxChecked);
        this.props.navigation.navigate("chooseTime", {barberId: this.state.barberInfo, serviceIdList: this.state.checkBoxChecked});
    }


  render() {
      if(!this.state.dataList || !this.state.barberInfo){
          return (
              <ActivityIndicator
                  animating={true}
                  size="large"
              />
          );
      }
    return (
      <Container>
        <Header hasSegment span>
            <Body style={styles.body}>
                    <Thumbnail style={styles.avatarThumbnail} large source={{uri:this.state.barberInfo.coverImage}} />
                    <Content style={styles.CusInfoContent}>
                        <Title style={styles.custNametitle}>{this.state.barberInfo.fullName}</Title>
                        <Title style={styles.custNametitle}>7h-10h</Title>
                    </Content>
            </Body>
        </Header>
        <Segment>
          <Button first active>
            <Text>Choose Services</Text>
          </Button>
        </Segment>
          <Body>
          <Item>
              <FlatList
                  extraData={this.state}
                  keyExtractor={(item, index) => item.id.toString()}
                  data = {this.state.dataList}
                  renderItem={({item}) => {
                      return<ListItem onPress={() => this.checkBoxChanged(item.id)}>
                          <CheckBox
                              checked={this.state.checkBoxChecked.includes(item.id) ? true : false}
                              onPress={() => this.checkBoxChanged(item.id)}
                          />
                          <Body>
                          <Text>{item.name}</Text>
                          </Body>
                      </ListItem>
                  }}
              />
          </Item>

          <Text style={styles.DurationText}>Duration: {this._caculateDuration()} minutes</Text>
          </Body>

              <View style={{flexDirection: 'row'}}>
                  <Col size={3}style={styles.rowButton}><Button style={styles.backButton} onPress={() => this._goback()}><Text>Trở lại</Text></Button></Col>
                  <Col size={4}></Col>
                  <Col size={3}style={styles.rowButton}><Button style={styles.nextButton} onPress={() => this._continueBooking()}><Text>Tiếp theo</Text></Button></Col>
              </View>

      </Container>
    );
  }
}
