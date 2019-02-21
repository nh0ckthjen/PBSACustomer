import React, { Component } from "react";
import {ActivityIndicator} from "react-native";
import {
    Content,
    List,
    ListItem,
    Left,
    Right,
    Thumbnail,
    Text,
    Body,
    Container, Header, Item, Input, Icon, Button
} from "native-base";
import {GetApiIpAddress} from "../../Utils/ApiUtils"
//
import chooseService from './chooseService';
import { Rating } from 'react-native-elements';

class tabOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            dataList: null,
            defaultList: null,
            isLoaded: false
        };
      }
      Search(searchValue) {
          this.setState({
              //filter dùng để search theo name
              dataList: this.state.defaultList.filter((n) => String(n.fullName.toLowerCase()).includes(searchValue.toLowerCase()))
          });
      }
      ViewDetail(){
          //code go to detail barber
      }

    componentDidMount(){
        let city = "79";
        let reqString = GetApiIpAddress()+"api/Barber/SearchByCity?city=" + city;
        console.log(reqString);
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
                    this.setState({ defaultList: responseJson });
                    console.log(responseJson);
                } else {
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }

  render() {
        if(!this.state.dataList){
            return (
                <ActivityIndicator
                    animating={true}
                    size="large"
                />
            );
        }
    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Tìm kiếm" onChangeText={(searchValue) => {this.Search(searchValue)}}/>
                    <Text>{this.state.searchValue}</Text>
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                <Text>Barber's name</Text>
                </Button>
            </Header>
      <Content padder>
            <List
              dataArray={this.state.dataList}
              selected = {true}
              renderRow={data =>
                  <ListItem avatar onPress={() => this.props.navigation.navigate('BarberInfo', {barberId: data.userId})}>
                      <Left>
                          <Thumbnail small source={{uri:data.coverImage}} />
                      </Left>
                      <Body>
                      <Text>
                          {data.fullName}
                      </Text>
                      <Text numberOfLines={1} note>
                          {data.address}
                      </Text>
                      <Left>
                          <Rating startingValue={data.OverallRate}  imageSize={15} readonly/>
                      </Left>

                      </Body>
                      <Right>
                          <Text note>
                              {}
                          </Text>
                      </Right>
                  </ListItem>
                  }
          />
      </Content>
      </Container>
    );
  }
}

export default tabOne;
