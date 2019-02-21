import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { List, ListItem } from "react-native-elements";
import {Content} from "native-base";
import datas from '../../constants/Data';

export default class TabImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }
    list = [
             'http://sslweb.solidstatelogic.com.s3.amazonaws.com/user-icon.png',
             'http://sslweb.solidstatelogic.com.s3.amazonaws.com/user-icon.png',
             'http://sslweb.solidstatelogic.com.s3.amazonaws.com/user-icon.png',
        ];

  render() {
    return (
      <Content padder style={{ marginTop: 0 }}>
        
              <Image
                  style={{width: 100, height: 100}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              />
      </Content>
    );
  }
}
