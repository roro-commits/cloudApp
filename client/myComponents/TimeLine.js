/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   RefreshControl,
   ActivityIndicator
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import axios from 'axios'
import StartButton from './startButton'
 
 export default class RefreshTimeLine extends Component {
   constructor(){
     super()
     this.onEndReached = this.onEndReached.bind(this)
     this.renderFooter = this.renderFooter.bind(this)
     this.onRefresh = this.onRefresh.bind(this)
 
     this.state = {
       isRefreshing: false,      
       waiting: false,
       getTimeData:[],

     }
   }

   componentWillMount=() =>{
    console.log("before MOunt Set Timer")

    this.getTimeData();

  }

    getTimeData =() =>{
        let data;

        axios.get('http://localhost:8082/api') 
        .then((response) => {
            data = response.data
            
            console.log('Data has been recived');
            // changing  the revive file for icon 
          this.setState({getTimeData:data})

        })

        .catch(()=>{
            console.log('data is not recived')
        })
  
         return data

    }
 
   onRefresh(){
     this.setState({isRefreshing: true});
     this.getTimeData();
     //refresh to initial data
     setTimeout(() => {
       //refresh to initial data
       this.setState({
         data: this.data,
         isRefreshing: false
       });
     }, 2000);
   }
 
   onEndReached() {
     if (!this.state.waiting) {
         this.setState({waiting: true});
         this.onRefresh();
 
        
     }
   }
 
 renderFooter() {
     if (this.state.waiting) {
         return <ActivityIndicator />;
     } else {
         return <Text>~</Text>;
     }
   }
 
   render() {
     //'rgb(45,156,219)'
     return (
       <View style={styles.container}>
         <Timeline 
           style={styles.list}
           data={this.state.getTimeData }
           circleSize={30}
           circleColor='rgb(45,156,219)'
           lineColor='rgb(45,156,219)'
           timeContainerStyle={{minWidth:52, marginTop: -5}}
           timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
           descriptionStyle={{color:'gray'}}
           options={{
             style:{paddingTop:5},
             refreshControl: (
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={this.onRefresh}
               />
             ),
             renderFooter: this.renderFooter,
             onEndReached: this.onEndReached
           }}
           innerCircle={'dot'}
         />
         <StartButton text ={"load"}  props={this.onRefresh} />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 10,
         paddingTop:20,
     backgroundColor:'white'
   },
   list: {
     flex: 1,
     marginTop:10,
   },
 });