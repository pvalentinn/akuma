import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenContainer } from 'react-native-screens';
import Populars from './screens/Populars';
import TextList from './components/TextList';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import loadPopular from './API/popular';
import Collection from './components/Collection';
import ImgList from './components/ImgList';

const colors = require('./colors.json').default

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgList: null,
            textList: null,
            name: null,
            display: false
        }
        this.showManga = this.showManga.bind(this);
    }
  
    async componentDidMount() {
        await this.awaitSetState({imgList: await loadPopular()});
        await this.awaitSetState({display: 1});
    }
  
    async showManga(manga, navigation) {
      await this.awaitSetState({display: false});
      await this.awaitSetState({manga: manga})
      await this.awaitSetState({display: 3});
    }
  
    awaitSetState(newChange) {
      return new Promise( resolve => {
        this.setState(newChange, () => resolve());
      });
    }
  
    render() {
        
        // let imgScreen = ( { navigation, route } ) => (
        //     <View style={styles.container}>
        //         <Stack.Navigator>
        //             <Stack.Screen name={'ImgList'} component={Populars} initialParams={
        //                 {
        //                     imgList: this.state.imgList, 
        //                     showManga: this.showManga ,
        //                     navigation: navigation
        //                 }
        //             }/>
        //             <Stack.Screen name={'Manga'} component={() => Collection(this.state.manga, navigation)}/>
        //         </Stack.Navigator>
        //     </View>
        // );

        let imgScreen = ( { navigation, route } ) => (
            <View style={styles.container}>
                <ImgList data={this.state.imgList} showManga={this.showManga}/>
            </View>
        );

        let textScreen = () => (
            <View style={styles.container}>
                <TextList />
            </View>
        );

        if(!this.state.display) return <LoadingScreen />
        if(this.state.display == 3) return <Collection manga={this.state.manga}/>
        else return (
            <View style={styles.container}>
                <NavigationContainer theme={
                    {
                        dark: false,
                        colors: {
                            primary: colors.active,
                            card: colors.borders,
                            text: colors.text,
                            border: colors.borders,
                        }
                    }
                }>
                <Header />
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                
                            if (route.name === 'Populaires') {
                              iconName = focused ? 'ios-star' : 'ios-star-outline';
                            } else if (route.name === 'Liste') {
                              iconName = focused ? 'ios-list-box' : 'ios-list';
                            }
                
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                          },
                        })}>
                        <Tab.Screen name="Populaires" component={imgScreen} />
                        <Tab.Screen name="Liste" component={textScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
          </View>
        )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    }
  });