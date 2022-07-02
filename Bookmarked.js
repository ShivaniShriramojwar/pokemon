import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
var width = Dimensions.get('window').width;

export class Bookmarked extends Component {
  static navigationOptions = {
    headerStyle: {backgroundColor: '#6CACE4'},

    headerTitle: () => (
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Bookmarked
      </Text>
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      allBookMarked: props.navigation.state.params.allBookMarked,
      pokemonDetails: '',
    };
  }

  getPokemon = url => {
    this.props.navigation.navigate('ListingPage', {url});
  };
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    const {allBookMarked} = this.state;

    return (
      <View>
        <FlatList
          data={allBookMarked}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.getPokemon(item.url);
                }}>
                <View
                  style={{
                    width: '89%',
                    height: 100,
                    marginVertical: 5,
                    alignSelf: 'center',

                    backgroundColor: '#49d0b0',
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      width: '65%',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                      {this.Capitalize(item.name)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '30%',
                      height: 59,
                      justifyContent: 'flex-end',
                      alignSelf: 'flex-end',
                    }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://projectpokemon.org/images/normal-sprite/${item.name}.gif`,
                      }}
                    />
                  </View>

                  <View></View>
                </View>
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    );
  }
}

export default Bookmarked;

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 16,
    width: '100%',
    height: 40,
    backgroundColor: '#dce5eb',
    paddingLeft: 10,
    borderRadius: 7,
    flexDirection: 'row',

    fontSize: 15,
    color: 'black',
  },
  image: {
    width: width * 0.2, //its same to '20%' of device width
    aspectRatio: 1, // <-- this
    resizeMode: 'contain', //optional
  },
});
