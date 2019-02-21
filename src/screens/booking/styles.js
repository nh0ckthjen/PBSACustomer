import {Dimensions} from "react-native";
const numColumns = 3;
export default {
    container: {
        flex: 1,
    },
    nextButton: {
        marginTop: 10,

    },
    backButton: {
        marginTop: 10,
        marginLeft:10
    },
    rowButton:{
        paddingLeft:10
    },
    DurationText:{
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    item: {
        // backgroundColor: '#4D243D',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
        // margin: 1,
        // height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    }
};
