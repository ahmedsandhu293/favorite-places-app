import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapPreview = ({ location }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  let region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (location) {
    region = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const selectLocationHandler = (event) => {
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };

  return (
    <View style={styles.mapPreview}>
      {location ? (
        <MapView
          style={styles.map}
          region={region}
          onPress={selectLocationHandler}
        >
          <Marker
            coordinate={{ latitude: location.lat, longitude: location.lng }}
          />
        </MapView>
      ) : (
        <Text>No location chosen yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
