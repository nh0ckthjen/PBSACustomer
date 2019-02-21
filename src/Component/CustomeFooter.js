import React, { Component } from "react";
import {
    Text,
    Footer,
    FooterTab,
    Button,
    Icon
} from "native-base";


export default class CustomFooter extends Component<> {
    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        }
        // this.tabFooterHomeTouch = this.tabFooterHomeTouch.bind(this);
    }

    tabFooterHomeTouch() {
        this.props.navigation.navigate('Home');
    }
    tabFooterBookingTouch() {
        this.props.navigation.navigate('Booking');
    }
    tabFooterNewsTouch() {
        this.props.navigation.navigate('News');
    }
    tabFooterMenuTouch() {
        this.props.navigation.navigate('Menu');
    }

    render() {
        return (
                <Footer>
                    <FooterTab>
                        <Button active={this.state.tab1} onPress={() => this.tabFooterHomeTouch()}>
                            <Icon active={this.state.tab1} name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.tabFooterBookingTouch()}>
                            <Icon active={this.state.tab2} name="calendar" />
                            <Text>Đặt lịch</Text>
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.tabFooterNewsTouch()}>
                            <Icon active={this.state.tab3} name="md-paper" />
                            <Text>Tin tức</Text>
                        </Button>
                        <Button active={this.state.tab4} onPress={() => this.tabFooterMenuTouch()}>
                            <Icon active={this.state.tab4} name="menu" />
                            <Text>Cài đặt</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        );
    }
}
