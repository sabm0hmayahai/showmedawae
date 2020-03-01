import React, { Component, useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "./key";
import { Accelerometer, Gyroscope } from "expo-sensors";
var finalVal = "";
var SDx = "0.0",
  SDy = "0.0",
  SDz = "0.0";
const Tab = createBottomTabNavigator();
var AccX = [];
var AccY = [];
var AccZ = [];

var gX = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var graphX = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var AccXG = [];

var gY = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var graphY = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var AccYG = [];

var gZ = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var graphZ = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var AccZG = [];

//var x = 1;
export class Maps extends React.Component {
  state = {
    paddingTop: 0,
    latitude: null,
    longitude: null,
    markerFlag: false,
    currLatitude: null,
    currLongitude: null,
    errorMessage: null
  };

  renderMarker = () => (
    <Marker
      coordinate={{
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }}
    />
  );
  renderDirectionGood = () => (
    <MapViewDirections
      origin={{
        latitude: this.state.currLatitude,
        longitude: this.state.currLongitude
      }}
      destination={{
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="green"
      mode="WALKING"
    />
  );
  renderDirectionMedium = () => (
    <MapViewDirections
      origin={{
        latitude: this.state.currLatitude,
        longitude: this.state.currLongitude
      }}
      destination={{
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="orange"
      mode="TRANSIT"
    />
  );
  renderDirectionBad = () => (
    <MapViewDirections
      origin={{
        latitude: this.state.currLatitude,
        longitude: this.state.currLongitude
      }}
      destination={{
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="red"
      mode="DRIVING"
    />
  );
  renderVVCE1 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.336671,
        longitude: 76.620317
      }}
      destination={{
        latitude: 12.336497,
        longitude: 76.620286
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="green"
      mode="WALKING"
    />
  );
  renderVVCE2 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.336497,
        longitude: 76.620286
      }}
      destination={{
        latitude: 12.336404,
        longitude: 76.620286
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="red"
      mode="WALKING"
    />
  );
  renderVVCE3 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.336404,
        longitude: 76.620286
      }}
      destination={{
        latitude: 12.335763,
        longitude: 76.620151
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="orange"
      mode="WALKING"
    />
  );
  renderVVCE4 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.335763,
        longitude: 76.620151
      }}
      destination={{
        latitude: 12.335284,
        longitude: 76.619218
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="green"
      mode="WALKING"
    />
  );

  renderVVCE5 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.335284,
        longitude: 76.619218
      }}
      destination={{
        latitude: 12.335487,
        longitude: 76.619162
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="orange"
      mode="WALKING"
    />
  );
  renderVVCE6 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.335487,
        longitude: 76.619162
      }}
      destination={{
        latitude: 12.336206,
        longitude: 76.619109
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="green"
      mode="WALKING"
    />
  );
  renderVVCE7 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.336206,
        longitude: 76.619109
      }}
      destination={{
        latitude: 12.336267,
        longitude: 76.6191
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="orange"
      mode="WALKING"
    />
  );
  renderVVCE8 = () => (
    <MapViewDirections
      origin={{
        latitude: 12.336267,
        longitude: 76.6191
      }}
      destination={{
        latitude: 12.336754,
        longitude: 76.618705
      }}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={6}
      strokeColor="green"
      mode="WALKING"
    />
  );
  onLongPressHandler = result => {
    const { longitude, latitude } = result.nativeEvent.coordinate;
    this.setState({
      markerFlag: true,
      latitude,
      longitude
    });
  };
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      currLatitude: location.coords.latitude,
      currLongitude: location.coords.longitude
    });
  };

  render() {
    return (
      <View style={[styles.container, { paddingTop: this.state.paddingTop }]}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 12.3360584,
            longitude: 76.6188186,
            latitudeDelta: 0.009,
            longitudeDelta: 0.003
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onMapReady={() => this.setState({ paddingTop: 1 })}
          onLongPress={this.onLongPressHandler}
        >
          {this.state.markerFlag ? this.renderMarker() : null}
          {this.state.markerFlag ? this.renderDirectionGood() : null}
          {this.state.markerFlag ? this.renderDirectionMedium() : null}
          {this.state.markerFlag ? this.renderDirectionBad() : null}
          {this.renderVVCE1()}
          {this.renderVVCE2()}
          {this.renderVVCE3()}
          {this.renderVVCE4()}
          {this.renderVVCE5()}
          {this.renderVVCE6()}
          {this.renderVVCE7()}
          {this.renderVVCE8()}
        </MapView>
      </View>
    );
  }
}



function SensorData() {
  const [data, setData] = useState({});
  // Acc
  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    //acc
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  //console.log(JSON.stringify(data))
  let { x, y, z } = data;

  //setting graphX
  for (var i = 8; i >= 0; i--) {
    gX[i] = gX[i - 1];
  }
  gX[0] = graphX[0];

  if (AccXG.length < 2) {
  } else {
    for (var i = 0; i < 1; i++) {
      graphX[i] = AccXG[AccXG.length - 1 - i];
    }
    AccXG.shift();
  }

  //setting graphY
  for (var i = 8; i >= 0; i--) {
    gY[i] = gY[i - 1];
  }
  gY[0] = graphY[0];

  if (AccYG.length < 2) {
  } else {
    for (var i = 0; i < 1; i++) {
      graphY[i] = AccYG[AccYG.length - 1 - i];
    }
    AccYG.shift();
  }

  //setting graphZ
  for (var i = 8; i >= 0; i--) {
    gZ[i] = gZ[i - 1];
  }
  gZ[0] = graphZ[0];

  if (AccZG.length < 2) {
  } else {
    for (var i = 0; i < 1; i++) {
      graphZ[i] = AccZG[AccZG.length - 1 - i];
    }
    AccZG.shift();
  }

  if (AccX.length < 50) {
    AccX.push(x);
    AccXG.push(x);
  } else {
    //send
    fetch("http://192.168.43.206:8080/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ AccX })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson[0][0]);
        finalVal = responseJson[0][0];
      })
      .catch(error => {
        console.error(error);
      });
    SDx = StandardDeviation(AccX);
    AccX = [];
  }
  if (AccY.length < 50) {
    AccY.push(y);
    AccYG.push(y);
  } else {
    SDy = StandardDeviation(AccY);
    AccY = [];
  }
  if (AccZ.length < 50) {
    AccZ.push(z);
    AccZG.push(z);
  } else {
    SDx = StandardDeviation(AccZ);
    ArrZ = [];
  }
  return (
    <View style={styles.sensor}>
      <Text style={styles.text}>
        Accelerometer X Y Z values len: {AccX.length}{" "}
      </Text>
      <LineChart
        data={{
          labels: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100"
          ],
          datasets: [
            {
              data: [
                gX[8],
                gX[7],
                gX[6],
                gX[5],
                gX[4],
                gX[3],
                gX[2],
                gX[1],
                gX[0],
                graphX[0]
              ]
            },
            {
              data: [
                gY[8],
                gY[7],
                gY[6],
                gY[5],
                gY[4],
                gY[3],
                gY[2],
                gY[1],
                gY[0],
                graphY[0]
              ]
            },
            {
              data: [
                gZ[8],
                gZ[7],
                gZ[6],
                gZ[5],
                gZ[4],
                gZ[3],
                gZ[2],
                gZ[1],
                gZ[0],
                graphZ[0]
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#000000",
          backgroundGradientFrom: "#000000",
          backgroundGradientTo: "#000000",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 4) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#39ff14"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Text>
        SDx: {SDx} SDy: {SDy} SDz: {SDz}
      </Text>ss
    </View>
  );
}

export class MyTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Maps"
        tabBarOptions={{
          activeTintColor: "#242424"
        }}
      >
        <Tab.Screen
          name="Maps"
          component={Maps}
          options={{
            tabBarLabel: "Maps",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="SensorData"
          component={SensorData}
          options={{
            tabBarLabel: "SensorData",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="database"
                color={color}
                size={size}
              />
            )
          }}
        />
      </Tab.Navigator>
    );
  }
}

class App extends React.Component {
  state = {
    paddingTop: 0,
    latitude: null,
    longitude: null,
    markerFlag: false,
    currLatitude: null,
    currLongitude: null,
    errorMessage: null
  };
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      currLatitude: location.coords.latitude,
      currLongitude: location.coords.longitude
    });
  };
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 0,
    position: "absolute"
  },
  mapStyle: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height,
    bottom: 0
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc"
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center"
  }
});

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}
export default App;

function StandardDeviation(numbersArr) {
  //--CALCULATE AVAREGE--
  var total = 0;
  for (var key in numbersArr) total += numbersArr[key];
  var meanVal = total / numbersArr.length;
  //--CALCULATE AVAREGE--

  //--CALCULATE STANDARD DEVIATION--
  var SDprep = 0;
  for (var key in numbersArr)
    SDprep += Math.pow(parseFloat(numbersArr[key]) - meanVal, 2);
  var SDresult = Math.sqrt(SDprep / numbersArr.length);
  return SDresult;
}
