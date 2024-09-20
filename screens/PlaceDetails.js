import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

import OutlinedButton from "../components/UI/OutlinedButton";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const showOnMapHandler = () => {};
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      console.log(place);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };
    loadPlaceData();
    console.log(fetchedPlace);
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallBack}>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={{ uri: fetchedPlace.imageUri }}
        style={styles.image}
        alt="Place image"
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            Latitude: {fetchedPlace.location.lat}
          </Text>
          <Text style={styles.address}>
            Longitude: {fetchedPlace.location.lng}
          </Text>
        </View>
        {/* <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton> */}
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
