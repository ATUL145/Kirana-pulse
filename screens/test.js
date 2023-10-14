import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Clipboard from "expo-clipboard";
import * as Share from "expo-sharing";

const storage = getStorage();

const TestScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (result && !result.error) {
        uploadImageAsync(result.path);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageAsync = async (uri) => {
    try {
      setUploading(true);

      const imageRef = ref(storage, "images/" + generateUUID());

      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      setImage(downloadURL);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {image ? null : (
        <Text style={styles.titleText}>Example: Upload an Image</Text>
      )}

      <Button title="Pick an image" onPress={pickImage} />

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text
            onPress={() => Clipboard.setString(image)}
            onLongPress={() => Share.share({ message: image })}
            style={styles.imageText}
          >
            {image}
          </Text>
        </View>
      ) : null}

      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 15,
  },
  imageContainer: {
    marginTop: 30,
    width: 250,
    borderRadius: 3,
    elevation: 2,
  },
  image: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    overflow: "hidden",
    width: 250,
    height: 250,
  },
  imageText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  uploadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TestScreen;
