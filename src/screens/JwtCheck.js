import React, { Component } from 'react'
import {
  ActivityIndicator,
  StatusBar, Image, Text, StyleSheet,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { addJWT } from '../actions/JwtActions';

class JwtCheck extends Component {    
      componentDidMount() {
        this.loadJWT();
      }

      loadJWT = async () => {
        const userToken = await AsyncStorage.getItem('id_token');
        this.props.add(userToken)

        this.props.navigation.replace(userToken ? 'Home' : 'Login');
      };
    
    render() {
        return (
          <View style={styles.container}>
            <View style={{flex: 0.25, width: '100%',}}>
              <Image style={{flex:1, alignSelf: 'center'}} resizeMode='contain' source={require('../../image/E-WP_Logo.png')} />
            </View>
            {/* <StatusBar barStyle="default" /> */}
            <Text style={{ textAlign: 'center',fontSize:18, marginBottom:20, marginTop:20, color:'white', fontFamily:'Sans-serif D-Din'}}>moonlay<Text style={{fontWeight:"bold"}}>technologies</Text></Text>
            <View style={{marginTop:'20%' }}>  
              <ActivityIndicator color='white' size={40}/>
            </View>  
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingTop: 60,
    backgroundColor:'#1A446D',
    height: '100%',
    width: '100%'
  },
});

const mapStateToPropsData = (state) => {
  console.log(state);
  return {
    tokenJWT: state.JwtReducer.jwt
  }
}

const mapDispatchToPropsJWT = (dispatch) => {
  return {
    add: (userToken) => dispatch(addJWT(userToken))
  }
}

export default connect(mapStateToPropsData, mapDispatchToPropsJWT)(JwtCheck)
