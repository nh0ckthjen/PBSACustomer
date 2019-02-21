import React, { Component } from 'react';
import { Container,
  Header,
  Footer,
  Left,
  Body,
  Right,
  Button,
  Icon,
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
import {FlatList,Dimensions, Alert} from 'react-native'
import styles from "./../booking/styles";
import {ActivityIndicator} from "react-native";
var tempCheckValues = [];

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: 'blank-${numberOfElementsLastRow}', empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};
const numColumns = 3;
export default class ChooseTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchValue: '',
        dataList: null,
        barberInfo: null,
        serviceStr: '',
        timeChecked: '',
    };

  }

  componentDidMount(){
    //get info barber with data pass from tabOne
      const { navigation } = this.props;
      let barberInfo = navigation.getParam('barberId');
      let serviceIdList = navigation.getParam('serviceIdList');
      this.setState({ barberInfo: barberInfo });
      let serviceStr = "";
      serviceIdList.map((item) => {
          serviceStr += "&serviceIds=" + item;
      });
      this.setState({ serviceStr: serviceStr });
      let reqString = GetApiIpAddress()+"booking/available-slot?barberId="+barberInfo.username+"&dates=today"+serviceStr ;
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
                  // console.log(responseJson);
              } else {
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }


    _goback(){
        this.props.navigation.goBack();
    }

    _continueBooking(){
        let reqString = IpAddress + "booking/book?customerId=huuthien&barberId="
            + this.state.barberInfo.username +"&date=today&time="+ this.state.timeChecked + this.state.serviceStr ;
        console.log(reqString);
        fetch(reqString, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((responseJson) => {
                if(responseJson.status == 200){
                    Alert.alert("Đặt lịch thành công");
                    this.props.navigation.navigate("Home");
                } else {
                    Alert.alert("Đặt lịch thất bại");
                    console.log(responseJson);
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }
    timeSelect(hour, minute){
        var time = hour + "%3A" + minute;
        this.setState({ timeChecked: time });
        console.log(this.state.timeChecked);

    }
        renderItem = ({ item, index }) => {
            if (item.empty === true) {
                return <Button style={[styles.item, styles.itemInvisible]} />;
            }
            return (
                <Button style={styles.item} key={index}
                        onPress={() => this.timeSelect(item.hour, item.minute)}><Text>{item.hour}:{item.minute}</Text></Button>
            );
        };



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
            <Text>Choose Time</Text>
          </Button>
        </Segment>
          <Body>
          <FlatList
              data={formatData(this.state.dataList.today, numColumns)}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
              keyExtractor={(item, index) => index.toString()}
          />

          </Body>

              <View style={{flexDirection: 'row'}}>
                  <Col size={3}style={styles.rowButton}><Button style={styles.backButton} onPress={() => this._goback()}><Text>Trở lại</Text></Button></Col>
                  <Col size={4}></Col>
                  <Col size={3}style={styles.rowButton}><Button style={styles.nextButton} onPress={() => this._continueBooking()}><Text>Hoàn tất</Text></Button></Col>
              </View>

      </Container>
    );
  }
}
