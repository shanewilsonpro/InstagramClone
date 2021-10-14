import React, { Component } from "react";
import { View, Text, LogBox, Image } from "react-native";
import _ from "lodash";

import * as firebase from "firebase";

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import SaveScreen from "./components/main/add/Save";
import PostScreen from "./components/main/feed/Post";
import CommentScreen from "./components/main/Comment";

import { container } from './components/styles';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const logo = require('./assets/logo.png');

LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyCjWH3tOz-2RdKBBz5pUXKNCgma7SNSnX8",
  authDomain: "instagramclone-ca188.firebaseapp.com",
  projectId: "instagramclone-ca188",
  storageBucket: "instagramclone-ca188.appspot.com",
  messagingSenderId: "181751008126",
  appId: "1:181751008126:web:257f3b12b52afa39ae812f",
  measurementId: "G-R2S7LW71JL",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <Image style={container.splash} source={logo} />
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              key={Date.now()}
              name="Main"
              component={MainScreen}
              navigation={this.props.navigation}
              options={({ route }) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

                switch (routeName) {
                  case "Camera": {
                    return {
                      headerTitle: "Camera",
                    };
                  }
                  case "Profile": {
                    return {
                      headerTitle: "Profile",
                    };
                  }
                  case "Search": {
                    return {
                      headerTitle: "Search",
                    };
                  }
                  case "Feed":
                  default: {
                    return {
                      headerTitle: "Instagram",
                    };
                  }
                }
              }}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="video"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Post"
              component={PostScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
