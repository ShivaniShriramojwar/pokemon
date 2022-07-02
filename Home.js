import {
  FlatList,
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
var width = Dimensions.get('window').width;

class Home extends Component {
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
        Pokedex
      </Text>
    ),
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      pokemonDetails: '',
      searchData: [],
      searchString: '',
      isBookmarked: '',
      page:1,
      seed:1,
      refreshing :false
    };
  }

  componentDidMount() {
    const {page, seed} = this.state; 
    this.setState({
      isLoading: true,
    });
    // fetch(`https://pokeapi.co/api/v2/pokemon/`)
   

      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?seed=${seed}&page=${page}&limit=30`)
        .then(res => res.json())
        .then(response => {
          console.log("response", response)
          this.setState({
            isLoading: false,
            refreshing :false,
            pokemonDetails: response.results,
          });
        });
      }, 1500);
  }

  searchItems = text => {
    this.setState({searchString: text});

    if (text.length > 0) {
      let searchData = this.state.pokemonDetails.filter(item => {
        return item.name.toUpperCase().includes(text.toUpperCase());
      });
      this.setState({searchData: searchData});
    }
  };

  getPokemon = url => {
    this.props.navigation.navigate('ListingPage', {url});
  };
  getMarked = () => {
    const {pokemonDetails} = this.state;

    let allBookMarked = pokemonDetails.filter(item => item.isBookmarked);

    this.props.navigation.navigate('Bookmarked', {allBookMarked});
  };
  OnbookMark = (item, index) => {
    console.log('hhh', item, index);
    let isBookmarked;

    if (!item.isBookmarked) {
      isBookmarked = true;
    }
    if (item.isBookmarked === true) {
      isBookmarked = false;
    }
    if (item.isBookmarked === false) {
      isBookmarked = true;
    }

    let pokemonDetails = this.state.pokemonDetails;
    pokemonDetails[index]['isBookmarked'] = isBookmarked;
    this.setState({pokemonDetails});
  };
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handleRefresh = () => {
    this.setState(
      {page:1,
      refreshing:true,
      seed: this.state.seed + 1},
       
     
    
    )
      
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
  
    })
  }

  render() {
    const {pokemonDetails} = this.state;

    return (
      <View>
        <View style={styles.searchBar}>
          <EvilIcons
            name="search"
            size={20}
            style={{
              color: 'black',
              alignSelf: 'center',
              marginRight: 5,
            }}
          />

          <TextInput
            onChangeText={text => this.searchItems(text)}
            placeholder="Search for Pokemon..."
            placeholderTextColor="#696969"
            color="black"
            fontFamily="Montserrat-Regular"
          />
        </View>
        <View style={{margin: 4}}>
          <TouchableOpacity
            onPress={() => {
              this.getMarked();
            }}>
            <Text>Show all Bookmarked</Text>
          </TouchableOpacity>

          <FlatList
            data={
              this.state.searchString.length > 0
                ? this.state.searchData
                : pokemonDetails
            }
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={100}
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
                    <View style={{width: '15%'}}>
                      <Ionicons
                        onPress={() => this.OnbookMark(item, index)}
                        name={item.isBookmarked ? 'md-star' : 'md-star-outline'}
                        size={35}
                      />
                    </View>
                    <View
                      style={{
                        marginHorizontal: 10,
                        width: '50%',
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
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 16,
    width: '99%',
    marginHorizontal: 2,
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
