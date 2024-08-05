import React from 'react';
import { StatusBar, View, Text, StyleSheet,ScrollView} from 'react-native';
import AppNavigator from './Navigation/AppNavigator';

const App = () => {
   return (
      <>
         <AppNavigator/>
         <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#000" translucent={true}/>
      </>
   );
}

export default App;

