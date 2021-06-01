import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styles from './styles';

class Gallery extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.getImageFromGallery()
  }
  getImage = (uri) => {
    this.props.selectImageFromChat(uri)
  }


  getImageFromGallery = () => {
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    })
      .then((responseJson) => {
        const response = responseJson.edges.map((item, id) => {
          item.node.id = id
          item.node.isSelect = false;
          item.node.selectedClass = styles.list;
          return item;
        });
        this.setState({ data: response });
      })
      .catch((error) => {
        console.log(error);
      });

  }
  onPressHandler(id) {
    let renderData = this.state.data
    for (let data of renderData) {
      if (data.node.id == id) {
        data.node.isSelect = (data.node.isSelect == false) ? true : !data.node.isSelect;
        break;
      }
    }
    this.setState({ data: renderData });
  }

  render() {
    const itemNumber = this.state.data.filter(item => item.node.isSelect).length;
    const item = this.state.data.filter(item => item.node.isSelect);
    console.log("======",item)
    return (
      <View>
        <FlatList
          numColumns={3}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={item.node.isSelect == true ? { backgroundColor: '#000000', borderColor: 'blue', borderWidth: 2 } : { backgroundColor: 'green' }}
              onLongPress={() => this.onPressHandler(item.node.id)}
            >
              <Image
              blurRadius={1}
                style={styles.galleryImage}
                source={{ uri: item.node.image.uri }}
              />
            </TouchableOpacity>

          )}
        />

      </View>
    );
  }


};
export default Gallery;
