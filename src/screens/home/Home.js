import React, { Component } from "react";
import { StatusBar } from "react-native";
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Thumbnail,
    Text,
} from "native-base";
import styles from "./styles";
import CustomFooter from '../../Component/CustomeFooter';

const avatar = require("../../assets/images/avatar.jpg");

export default class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false
    }
    
}

    render() {
        const {...props} = this.props;
        return (
            <Container style={styles.container}>

                <Header span>
                    <Body style={styles.body}>
                    <Thumbnail style={styles.avatarThumbnail} large source={avatar} />
                    <Content style={styles.CusInfoContent}>
                        <Title style={styles.custNametitle}>Nguyễn Hữu Thiện</Title>
                        <Title style={styles.custNametitle}>0933031178</Title>
                        {/*<Title >Tòa nhà Innocation, Công viên phần mềm Quang Trung</Title>*/}
                    </Content>
                    </Body>
                </Header>
                <Content padder>
                    <Text>News span here</Text>
                </Content>

                <CustomFooter link {...props} />
            </Container>
        );
    }
}
