import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { fetchPlaces } from "../util/database";

import PlacesList from "../components/Places/PlacesList";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces(curPlaces => [...curPlaces, route.params.place])
      console.log(loadedPlaces);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
