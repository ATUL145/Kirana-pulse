import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import StoreCard from "../components/StoreCard";
const { width, height } = Dimensions.get("window");

const StoreScreen = ({ route, navigation }) => {
  const { name, type, address } = route.params;
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

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
  const openCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
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
      const imageRef = ref(storage, "stores/" + generateUUID());

      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      setImages([...images, { uri: downloadURL }]);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StoreCard
          name={name}
          type={type}
          address={address}
          navigation={navigation}
        />
      </View>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.post}>
            <Image
              source={{ uri: item.uri }}
              style={styles.postImage}
              onError={(e) => console.log("Image error:", e.nativeEvent.error)}
            />
          </View>
        )}
      />
      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Entypo name="image" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
          <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  post: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  postImage: {
    width: width,
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 0.02 * height,
  },
  iconButton: {
    backgroundColor: "purple",
    padding: 0.03 * height,
    borderRadius: 50,
  },
  uploadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StoreScreen;
