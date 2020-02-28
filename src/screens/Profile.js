import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Loading } from '../components/Loading';
import Button from '../components/Button';
import deviceStorage from '../services/deviceStorage';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { deleteToken } from '../actions/JwtActions';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
        loading: false,
        username: '',
        error: '',
      }
      this.deleteJWT = deviceStorage.deleteJWT.bind(this);
      this.LogOut = this.LogOut.bind(this);
  }

 async LogOut(){
  this.deleteJWT();
  this.props.delete();
  await AsyncStorage.removeItem('clockin_state');
  await AsyncStorage.removeItem('clockin_state2')
  this.props.navigation.dispatch(
    CommonActions.navigate({
      name: 'Login',
    })
  );
 }

  render() {
    const { container } = styles;
    const { loading } = this.state;

    if (loading){
        return(
            <View style={container}>
              <Loading size={'large'} />
            </View>
        )
      } else {
          return(
            <View style={styles.container}>
              <View style={styles.container2}>
                <View style={styles.viewPhoto}>
                  <Image source={{uri : 'https://cdn1-production-images-kly.akamaized.net/z_99H-LnphJr-mbj20rviPIz2_Q=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1172440/original/065874900_1458100101-02dd5811274c59f4b9549124d2c3fcd6-008981400_1447238383-seolhyun.jpg'}} 
                  style={styles.ava}/>        
                </View>
                <View style={{ justifyContent:'center'}}>
                  <Text fontFamily= 'D-Din' style={styles.nama}>Kim Seol Hyun</Text>
                  <Text fontFamily= 'D-Din' style={styles.nama}>Developer</Text>
                  <Text fontFamily= 'D-Din' style={styles.nama}>since 2018</Text>
                </View>
              </View> 
              <View style={styles.itemrow}>
                  <View style={styles.dcard}>
                    <Text style={styles.text4}>Day Off</Text>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{ fontSize:36, color: 'white', alignSelf:'flex-start', paddingLeft:'10%'}}>5</Text>
                      <Text style={{ fontSize:12, color: 'white', justifyContent:'center', paddingLeft:'5%', paddingTop:'10%'}}>Days {'\n'} remaining</Text>
                    </View>
                  </View>
                  <View style={styles.dcard}>
                    <Text style={styles.text4}>Overwork</Text>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{ fontSize:36, color: 'white', alignSelf:'flex-start', paddingLeft:'10%'}}>12</Text>
                      <Text style={{ fontSize:12, color: 'white', justifyContent:'center', paddingLeft:'5%', paddingTop:'20%'}}>Hours</Text>
                    </View>
                  </View>
                  <View style={styles.dcard}>
                    <Text style={styles.text4}>Overwork</Text>
                    <Text style={styles.text4}>Form</Text>
                    <FontAwesome5 name='file' size={20} color='#FFFFFF' style={{alignSelf:'flex-end', marginRight:'10%'}}/>
                </View>
              </View>
              <View style={styles.ViewHistory}>
                <Text style={styles.textHistory}>History</Text>
                <View style={styles.ViewHistory2}>
                  <View style={styles.cardHistory}>
                    <View style={styles.viewinCard}>
                    <Text style={styles.text1}>Check{'\n'} in {'\n'} time</Text>
                    </View>
                    <View style={{flex:1, height:'85%'}}>
                      <Text style={styles.text2}>3rd Jan</Text>
                      <Text style={styles.text3}>07:50</Text>
                    </View>
                  </View>
                  <View style={styles.cardHistory2}>
                    <View style={styles.viewinCard}>
                      <Text style={styles.text1}>Check{'\n'} out {'\n'} time</Text>
                    </View>
                    <View style={{flex:1, height:'85%',}}>
                      <Text style={styles.text2}>3rd Jan</Text>
                      <Text style={styles.text3}>07:50</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Button action={this.LogOut} value="Log Out">
                Log Out
              </Button>
          </View>      
          
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E5E5E5',
  },
  container2:{
    flexDirection:'row', height:'30%', backgroundColor:'white'
  },
  viewPhoto:{
    justifyContent: 'center', alignItems:'flex-start'
  },
  dcard: {
    flex:1, 
    justifyContent:'flex-start',
    backgroundColor:'#4A90E2', marginRight:'3%', height:'80%', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  itemrow: {
    flex:0.2,
    alignSelf:'center',
    flexDirection: 'row', 
    width:'85%',
    marginTop:'-5%'      
  },
  ava: {
  width: 100,
  height: 100,
  borderWidth: 2,
  borderColor: 'grey',
  borderRadius: 100/2,
  alignSelf: 'flex-start',
  marginLeft:'10%'
  },
  nama:{
    fontSize: 20,
    color: 'black'
  },
  status:{
    fontSize: 20
  },
  ViewHistory: {
    alignItems:'center', width:'100%', flex:0.3, marginTop:'5%'
  },
  textHistory:{
    fontSize: 18, color: 'black',
  },
  ViewHistory2:{
    flexDirection:'row', height:'100%', alignSelf:'center',
  },
  cardHistory:{
    flex:1, flexDirection:'row', backgroundColor:'white', width:'20%',borderRadius:20, marginLeft:'5%', marginTop:'5%', marginRight:'1%', borderColor:'#4A90E2', borderWidth:3
  },
  cardHistory2:{
    flex:1, flexDirection:'row', backgroundColor:'white', width:'20%',borderRadius:20, marginLeft:'5%', marginTop:'5%', marginLeft:'1%', borderColor:'#E74C3C', borderWidth:3, marginRight:'5%'
  },
  viewinCard:{
    flex:1, justifyContent:'center', height:'85%'
  },
  text1:{
    fontSize: 16, color: 'black', textAlignVertical:'center', marginLeft:'10%', fontWeight:'bold'
  },
  text2:{
    fontSize: 16, color: 'grey', textAlignVertical:'top', textAlign:'right', marginTop:'10%',marginRight:'8%'
  },
  text3:{
    fontSize: 26, color: 'black', textAlignVertical:'bottom', textAlign:'left', justifyContent:'flex-end', marginTop:'15%'
  },
  text4:{
    fontSize: 16, color: 'white', paddingLeft:'10%'
  },
})

const mapDispatchToPropsJWT = (dispatch) => {
  return {
    delete: () => dispatch(deleteToken())
  }
}
  
export default connect(null,mapDispatchToPropsJWT) (Profile)