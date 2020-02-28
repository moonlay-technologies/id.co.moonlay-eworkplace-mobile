import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, Alert, BackHandler,TouchableOpacity, Picker, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Textarea from 'react-native-textarea';

export default class sick extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            fullname: '',
            dateAttendece: '',
            CheckInTime: '',
            CheckOutTime: '',
            photo: null,
            location:'',
            message:'',
            status: 'Day Off',
            scrumMaster: '',
            endDate:'',
            reson:'',
            substitute:'',
            show: false          
        }
        this.showDatepicker = this.showDatepicker.bind(this)
        // this.findCoordinates = this.findCoordinates.bind(this);
        // this.handleChoosePhoto = this.handleChoosePhoto.bind(this)
        this.onBack = this.onBack.bind(this);
      }
  
      componentDidMount(){
        // alert(this.props.clockin_status)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
        //this.findCoordinates()
      }
      componentWillUnmount() {
          this.watchID != null && Geolocation.clearWatch(this.watchID);
          this.backHandler.remove();
      }

    onBack = () => {
      this.props.navigation.goBack();
      return true;
   };

    showDatepicker = () => {
        this.setState({
            show: true
        })
    };
    render() {
        var date = JSON.stringify(this.state.startDate);
        //
        //var dateaja = date2.substr(1,10);
       // alert(dateaja);
        const { show } = this.state
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
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                

            <View style={styles.Split}>
            <View style={styles.viewDate1}>
                <Text
                  style={styles.TextDate}>
                    Start Date *
                </Text> 
                
                <View style={styles.viewDate2}>
                <View style={styles.viewDate3}>
                <TextInput
                    multiline={true}
                    placeholder="" 
                    style={styles.textinputDate}
                    onChangeText={text => this.setState({startDate: text})}
                    value={date}>
                </TextInput>  
                </View>
                <View>          
                <FontAwesome5 style={{marginLeft:6}} name='calendar-alt' size={30} color='#3366FF' onPress={this.showDatepicker}/>
                </View>
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.startDate}
                    mode={'date'}
                    display="calendar"
                    onChange={(event, selectedDate) => {
                        alert(selectedDate)
                        this.setState({
                            startDate: selectedDate,
                            show: false
                        })
                        //alert(this.state.startDate)
                    }}    
                />
                )}
                </View>
                </View>
                <View style={styles.viewDate1}>
                <Text
                  style={styles.TextDate}>
                    End Date *
                </Text>
                <View style={styles.viewDate2}>
                <View style={styles.viewDate3}>
                <TextInput
                    multiline={true}
                    placeholder="" 
                    style={styles.textinputDate}
                    onChangeText={text => this.setState({startDate: text})}
                    value={date}>
                </TextInput>  
                </View>
                <View>
                <FontAwesome5 style={{marginLeft:6}} name='calendar-alt' size={30} color='#3366FF' onPress={this.showDatepicker}/>
                </View>
                </View>
                
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.startDate}
                    mode={'date'}
                    display="calendar"
                    onChange={(event, selectedDate) => {
                        alert(selectedDate)
                        this.setState({
                            startDate: selectedDate,
                            show: false
                        })
                        //alert(this.state.startDate)
                    }}    
                />
                )}
                
             </View> 
            </View>
                <Text
                  style={styles.textSM}>
                    Substitute *
                </Text>
                <TextInput
                    multiline={true}
                    placeholder="" 
                    style={styles.inputText}
                    onChangeText={text => this.setState({message: text})}
                    value={this.state.message}>
                </TextInput>            

                <Text
                  style={styles.textSM}>
                    Reason *
                </Text>            
                <View style={styles.viewPicker}>            
                  <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.scrumMaster}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({scrumMaster: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>

                
                <TouchableOpacity onPress={this.handleUpload} style={styles.buttonSubmit}>
                    <Text style={styles.textbtnSubmit} >SUBMIT</Text>
                </TouchableOpacity>
                
                
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container2:{
    flex: 1,
    backgroundColor:'#e5e5e5',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textareaContainer: {fontSize: 25, fontWeight:'bold', paddingTop:15},
   textSM:{
    marginTop: 16,
    fontSize:18
  },
  TextDate:{
    fontSize:18
  },
  viewPicker:{
    width:'80%', height:'8%', borderRadius:10, borderColor:'black', borderWidth:1, backgroundColor:'white'
  },
  picker:{
    height: '100%', width: '100%', borderWidth:20, borderColor:'black'
  },
   Split:{
     flex: 0.25,
     flexDirection: 'row',
     height:'8%',
     marginTop: 16,
   },
   inputText:{
    textAlignVertical: 'top', borderWidth: 1, borderRadius:10, width:'80%', height:'8%',backgroundColor:'white', fontSize:20 
  },
  buttonSubmit:{
    marginTop:40, backgroundColor:'#E74C3C', height:'6%', width:'100%', borderRadius:10
  },
  textbtnSubmit:{
    color:'white', fontSize: 20, fontWeight:'bold', textAlign:'center',textAlignVertical: "center", flex:1
  },
  viewDate1:{
    flex:1, height:'100%'
  },
  viewDate2:{
    flexDirection:'row',flex:1, height:'100%'
  },
  viewDate3:{
    flex:0.92, height:'100%',
  },
  textinputDate:{
    height:'100%', borderWidth: 1, backgroundColor:'white',borderRadius:10, fontSize:18
  },

});
