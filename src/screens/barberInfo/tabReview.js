import React, { Component } from "react";
import {
  Content,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Body,} from "native-base";
import { MapView } from 'expo';
import { Rating } from 'react-native-elements';
import datas from '../../constants/Data';
import styles from "./styles";

export default class TabReivew extends Component {
  render() {
    return (
      <Content padder style={{ marginTop: 0 }}>
          <List
              dataArray={datas.comment}
              renderRow={data =>
                  <ListItem avatar>
                      <Left>
                          <Thumbnail size={55} source={data.img} />
                      </Left>
                      <Body>
                      <Text>
                          {data.name}
                      </Text>
                      <Rating style={styles.reviewStar} startingValue={parseFloat(data.star)}  imageSize={20} readonly/>
                      <Text numberOfLines={2} note>
                          {data.note}
                      </Text>
                      </Body>
                  </ListItem>}
          />
      </Content>
    );
  }
}
