import { StyleSheet } from "react-native";

import { insertPlace } from "../util/database";

import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
