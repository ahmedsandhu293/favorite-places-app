import { useState, useEffect } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";

import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    const checkPermission = async () => {
      if (
        !cameraPermissionInformation ||
        cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
      ) {
        await requestPermission();
      }
    };

    checkPermission();
  }, [cameraPermissionInformation, requestPermission]);

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permission to use this app."
      );
      return false;
    }
    return cameraPermissionInformation?.status === PermissionStatus.GRANTED;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setPickedImage(imageUri);
      onTakeImage(imageUri);
    } else if (result.uri) {
      setPickedImage(result.uri);
      onTakeImage(result.uri);
    } else {
      console.log("No image selected or camera cancelled.");
    }
  };

  let imagePreview = <Text>No image selected yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
