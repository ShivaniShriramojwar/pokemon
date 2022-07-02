import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
var width = Dimensions.get('window').width;

export class ListingPage extends Component {
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
        Pokemon Details
      </Text>
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: props.navigation.state.params.url,
      pokeData: '',
      pokeName: '',
      pokeAbility: '',
      isBookmarked: '',
    };
  }

  componentDidMount() {
    let {url} = this.state;

    fetch(`${url}`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          isLoading: false,

          pokeData: response,
          pokeAbility: response.abilities,
          pokeName: response.forms[0].name,
        });
      });
  }

  OnbookMark = () => {
    this.setState({
      isBookmarked: !this.state.isBookmarked,
    });
  };
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const {pokeName, pokeAbility} = this.state;

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            width: '95%',
            height: '50%',
            borderRadius: 15,
            backgroundColor: '#49d0b0',
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Image
              style={styles.image}
              source={{
                uri: `https://projectpokemon.org/images/normal-sprite/${pokeName}.gif`,
              }}
            />
            <View style={styles.pokeName}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                {' '}
                {this.Capitalize(pokeName)}
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: 10,
                height: '80%',
                padding: 20,
              }}>
              <View style={{width: '50%'}}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>
                  {' '}
                  Abilities
                </Text>
                <FlatList
                  data={pokeAbility}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View style={styles.ability}>
                      <Text style={styles.name}>
                        {' '}
                        {this.Capitalize(item.ability.name)}
                      </Text>
                    </View>
                  )}></FlatList>
              </View>

              <View style={{height: '100%', width: '50%'}}>
                <Text style={{fontSize: 23, fontWeight: 'bold'}}>About</Text>
                <Text style={styles.about}> height :2'3.6* (0.70 cm)</Text>
                <Text style={styles.about}> Weight :15.2 lbs (6.9 kg)</Text>
                <Text style={styles.about}> Spacies:Speed</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ListingPage;
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
    width: width * 0.5, //its same to '20%' of device width
    aspectRatio: 1, // <-- this
    resizeMode: 'contain', //optional
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ability: {
    paddingHorizontal: 2,
    width: '57%',
  },
  name: {
    fontSize: 17,
    color: 'blue',
  },
  about: {
    color: 'blue',
    fontSize: 15,
  },

  pokeName: {
    fontSize: 24,

    width: 200,
    borderRadius: 5,
    padding: 5,
  },
});
