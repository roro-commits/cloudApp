import * as React from 'react';
import {StyleSheet, TextPropTypes, View} from 'react-native'
import { BottomNavigation, Text} from 'react-native-paper';
import TopBar from './TitleAppBar';
import Constants from 'expo-constants';
import TimerTabs from './SetTimerModal'

import RefreshTimeLine from './TimeLine'


class  MyComponent extends React.Component{
  
    state = {

      index: 0,
      routes:[ 
          { key: 'TimeLine', title: 'TimeLine', icon: 'timeline-clock-outline' },
          { key: 'Timer', title: 'Timer', icon: 'timer' },
          
      ],
    };

    TimerRoute = () =>  {
    return(
            <View>
               <TopBar title = "Timer " subtitle="clock" />
                <TimerTabs/>
            </View>
           
        
    );
    }


   TimeLineRoute = () => {
      return(
          <React.Fragment>
              <TopBar title = "Time Line" subtitle="Today"/>
                  <RefreshTimeLine />
             
          </React.Fragment>
      );
      }




    _handleIndexChange = index => this.setState({ index });
   renderScene = BottomNavigation.SceneMap({
    TimeLine: this.TimeLineRoute,
    Timer: this.TimerRoute,
    // Friend: this.FriendsRoute,
  });

 

 render (){ return (
    <BottomNavigation
      navigationState={this.state}
      onIndexChange={this._handleIndexChange}
      renderScene={this.renderScene}
    />
  );}
  
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    remainingTime: {
      fontSize: 46,
    },
    startButton:{
        marginTop:'40px'

    },
  });





export default MyComponent;


