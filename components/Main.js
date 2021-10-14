import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reload } from "../redux/actions";

import FeedScreen from "./main/feed/Feed";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";
import CameraScreen from "./main/add/Camera";

const Tab = createMaterialBottomTabNavigator();

function Main(props) {
  const [unreadChats, setUnreadChats] = useState(false);
  const [lastNot, setLastNot] = useState(false);

  useEffect(() => {
    props.reload();
  }, []);

  if (props.currentUser == null) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          indicatorStyle: {
            opacity: 0,
          },
        }}
        barStyle={{ backgroundColor: "#ffffff" }}
      >
        <Tab.Screen
          key={Date.now()}
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          key={Date.now()}
          name="Search"
          component={SearchScreen}
          navigation={props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          key={Date.now()}
          name="Camera"
          component={CameraScreen}
          navigation={props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  friendsRequestsReceived: store.userState.friendsRequestsReceived,
});

const mapDispatchProps = (dispatch) => bindActionCreators({ reload }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
