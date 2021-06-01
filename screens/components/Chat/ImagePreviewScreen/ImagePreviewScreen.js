import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Dimensions,
    Image,
} from 'react-native';
import Gallery from './gallery'
export default class ImageGrid extends PureComponent {

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Gallery />
            </SafeAreaView>
        );
    }
}

