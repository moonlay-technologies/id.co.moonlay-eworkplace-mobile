import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput'
import {Loading} from '../components/Loading';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { StackActions, NavigationActions } from 'react-navigation';
import {Card} from 'react-native-paper'
import { connect } from 'react-redux';
import { addJWT } from '../actions/JwtActions';

const resetAction = StackActions.reset({
  index: 0, 
  key: null,
  actions: [
       NavigationActions.navigate({ routeName: 'Home' })
  ],
});

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      jwtt : '',
      password: '',
      error: '',
      loading: false
    };
    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
}

static navigationOptions = { headerShown: false }

loginUser() {
  const { username, password} = this.state;

  if(username == null || username == ""){
    this.setState({
        messageErrUsername : 'username tidak boleh kosong'
    })
 }

 if(password == null || password == ""){
   this.setState({
    messageErrPassword : 'Password tidak boleh kosong'
   })
}

if((username != null && username != "" ) && ( password != null && password != "") ){
    axios({
        method: 'post',
        url: 'https://userabensiendpoint.azurewebsites.net/v1/authenticate',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json-patch+json',
        },
        data: {
          Username: username,
          Password: password,
        }
      }).then(response => {
        deviceStorage.saveItem("id_token", response.data.data);
        this.setState({
          jwtt: response.data.data,
          loading: true
        })
        this.props.add(this.state.jwtt)
        this.props.navigation.replace('Home');
       })
      .catch((errorr) => {
        this.onLoginFail();
        });
        this.setState({ error: '', loading: true });
  }
}
  onLoginFail() {
    this.setState({
      error: 'Username / password tidak ditemukan',
      loading: false
    });
  }

  handleChangeUsername = event => {
    if(event != ""){
        this.setState({messageErrUsername : '' });
    }

    this.setState({ 
        username: event,
    });
  };

  handleChangePassword = event => {
    if(event != ""){
        this.setState({messageErrPassword : '' });
    }
    this.setState({ password: event });
  };

  render() {
    const { username, password, error, loading } = this.state;

    return (
      <View style={styles.container}>
       <View style={{flex: 0.2, width: '100%',}}>
        <Image style={{flex:1, alignSelf: 'center'}} resizeMode='contain' source={require('../../image/E-WP_Logo.png')} />
        </View>
       <View style={styles.back}>
       <Card style={styles.dcard}>
       
       <Text style={styles.logintitle}>Login</Text>
       
       <View style={{flex: 1,justifyContent: 'center'}}>
          <FormInput username={username} password={password} onChangeTextUsername={this.handleChangeUsername} onChangeTextPass={this.handleChangePassword}
            messageErrUsername = {this.state.messageErrUsername} messageErrPassword={this.state.messageErrPassword} error={error}
          />
          </View>
          <View style={{justifyContent:'center', flex:0.6}}>
         {!loading ?
            <Button value= "Login" action={this.loginUser}/>
            :
            <Loading size={'large'} />
          }
          </View>
        </Card>
        </View>  
          <Text style={{ textAlign: 'center',fontSize:18, marginBottom:20, color:'white', fontFamily:'Sans-serif D-Din'}}>moonlay<Text style={{fontWeight:"bold"}}>technologies</Text></Text>
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
  
  dcard: {
    flex:0.8,
    borderRadius: 15,
    width: '80%',
    justifyContent:'center',
  },
  back: {
    flex:1,
    justifyContent: 'center',
    height:"40%",
    width:"100%",
    paddingBottom:50,
    alignItems: 'center'
  },
  logintitle: {
    textAlign: 'center',
    fontSize: 36,
    color: '#1A446D',
    paddingTop: '5%'
  }
});

const mapStateToPropsData = (state) => {
  console.log(state);
  return {
    tokenJWT: state.JwtReducer.jwt
  }
}

const mapDispatchToPropsJWT = (dispatch) => {
  return {
    add: (jwtt) => dispatch(addJWT(jwtt))
  }
}
export default connect(mapStateToPropsData, mapDispatchToPropsJWT) (Login)