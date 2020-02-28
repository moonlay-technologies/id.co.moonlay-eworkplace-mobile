import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, BackHandler,Picker, TextInput, ToastAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import {ApiMaps} from '../config/apiKey'
import deviceStorage from '../services/deviceStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { connect } from 'react-redux';
import { addStatusClockin, addLoading } from '../actions/DataActions';

class sick extends Component {
    constructor(props){
        super(props);
        this.state = {
            idUser : '',
            photo: null,
            location:'',
            message:'',
            status: 'Sick',
            scrumMaster: '',
            projectName :'',
            clockInstatus: false,
            statusCheckInn: 'You have clocked in!',
          }
        this.findCoordinates = this.findCoordinates.bind(this);
        this.submitAll = this.submitAll.bind(this);
        this.onBack = this.onBack.bind(this);
      }
  
      componentDidMount(){
        // alert(this.props.clockin_status)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
        this.findCoordinates()
      }
      componentWillUnmount() {
          this.watchID != null && Geolocation.clearWatch(this.watchID);
          this.backHandler.remove();
      }

      onBack = () => {
        this.props.navigation.goBack();
        return true;
     };

      async submitAll(){
        const value = await AsyncStorage.getItem('clockin_state2');
        if(this.props.clockin_status === false || value === 'clockin'){
          alert('kamu sudah clock in hari ini');
        }
        else if(this.state.scrumMaster === '' || this.state.projectName === ''){
          alert('Scrum master dan nama proyek harus dipilih!');
        }
        else if(this.state.scrumMaster !== '' && this.state.projectName !== '' && this.props.clockin_status === true){
          axios({
            method: 'POST',
            url: 'https://absensiapiendpoint.azurewebsites.net/api/Sick',
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            },
            data: {
              username: this.props.nameUser,
              name: this.props.namee,
              checkIn: new Date(),
              state: this.state.status,
              location : this.props.userLocation,
              approval: "pending",
              headDivision: this.state.scrumMaster,
              projectName: this.state.projectName,
              note: this.state.message
            }
          }).then((response) => {
            console.log(response)
            this.setState({
              statusCheckIn: 'You have clocked in!',
              clockInstatus: true,
              idUser: response.data.idSick,
            });
            deviceStorage.saveItem("clockin_state", "clockin");
            deviceStorage.saveItem("id_user", JSON.stringify(this.state.idUser));
            this.props.addClockin(this.state.clockInstatus, this.state.statusCheckInn, this.state.idUser, this.state.status)
            this.props.addLoad(true)
            ToastAndroid.showWithGravity(
              'Clock in success',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Home' },
                ],
              })
            )
          })
          .catch((errorr) => {
            alert(errorr)
        });
        }       
      }

      findCoordinates = () => {
        Geolocation.getCurrentPosition(
          position => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
                    //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
                    //getting the Latitude from the location json
            this.setState({ 
                location : currentLongitude + ' ' + currentLatitude
            });
			    },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 }
        );
            this.watchID = Geolocation.watchPosition(position => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ location: currentLongitude + ' ' + currentLatitude });
          });
	  };

    render() {
        return (
            <View style={styles.container2}>
                <Text style={styles.textareaContainer}>
                    Please fill this forms
                </Text>
                <Text style={styles.textSM}>
                    Select Your Scrum Master *
                </Text>

                <View style={styles.viewPicker}>            
                  <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.scrumMaster}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({scrumMaster: itemValue})
                    }>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>

                <Text
                  style={styles.textSM}>
                    Project Name *
                </Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={text => this.setState({projectName: text})}
                  value={this.state.projectName}>
                </TextInput>

                <Text
                  style={styles.textSM}>
                    Notes
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="kamu sakit apa..." 
                    style={styles.textInput}
                    onChangeText={text => this.setState({message: text})}
                    value={this.state.message}>
                </TextInput>
                <TouchableOpacity onPress={this.submitAll} style={styles.buttonSubmit}>
                    <Text style={styles.textbtnSubmit} >CLOCK IN</Text>
                </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container2:{
    flex: 1,
    backgroundColor:'#e5e5e5',
  },
  textareaContainer: {fontSize: 25, fontWeight:'bold', paddingLeft:20, paddingTop:15},
   textSM:{
    marginTop: 16,
    paddingLeft:20,
    fontSize:18
  },
  viewPicker:{
    width:'80%', height:'6%', marginLeft:20, borderRadius:10, borderColor:'black', borderWidth:1, backgroundColor:'white'
  },
  picker:{
    height: '100%', width: '100%', borderWidth:20, borderColor:'black'
  },
  textInput:{
    height:200, borderColor: 'gray', textAlignVertical: 'top', borderWidth: 1, marginLeft:20, borderColor:'black', width:'80%', borderRadius:10, backgroundColor:'white', fontSize:20
  },
  buttonSubmit:{
    backgroundColor:'#1A446D', marginTop:30, alignItems:'center', width:'50%', height:'12%', alignSelf:'center', borderRadius:20
  },
  textbtnSubmit:{
    color:'white', fontSize: 29, fontWeight:'bold', textAlign:'center',textAlignVertical: "center", flex:1 
  },
  inputText:{
    textAlignVertical: 'top', borderWidth: 1, borderRadius:10, width:'80%', height:'6%', marginLeft:20, backgroundColor:'white', fontSize:20 
  },
});

const mapStateToPropsData = (state) => {
  console.log(state);
  return {
    tokenJWT: state.JwtReducer.jwt,
    nameUser: state.DataReducer.username,
    namee: state.DataReducer.fullname,
    userLocation: state.DataReducer.locations,
    clockin_status : state.DataReducer.clockIn,
    status_Checkin : state.DataReducer.statusCheckIn,
    id : state.DataReducer.id,
    workStatus :  state.DataReducer.workStatus
  }
}
const mapDispatchToPropsData = (dispatch) => {
  return {
    addLoad : (Loading) => dispatch(addLoading(Loading)),
    addClockin : (clockInstatus, statusCheckInn, idUser, status) => dispatch(addStatusClockin(clockInstatus, statusCheckInn, idUser, status))
  }
}

export default connect(mapStateToPropsData, mapDispatchToPropsData)(sick)
