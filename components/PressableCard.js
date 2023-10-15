import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cleanUpName } from "../utils/format";

const windowWidth = Dimensions.get("window").width;

const PressableCard = ({ name, type, address, onPress, imageUrl }) => {
  const imagePlaceholderSize = windowWidth * 0.2;
  const initialsFontSize = imagePlaceholderSize * 0.4;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View
        style={[
          styles.imagePlaceholder,
          {
            width: imagePlaceholderSize,
            height: imagePlaceholderSize,
            borderRadius: imagePlaceholderSize / 2,
          },
        ]}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={[styles.initials, { fontSize: initialsFontSize }]}>
            {cleanUpName(name).charAt(0)}
          </Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{cleanUpName(name)}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address}</Text>
        <MaterialIcons name="location-on" size={20} color="#555" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    margin: 8,
    elevation: 4,
    borderRadius: 8,
  },
  imagePlaceholder: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  initials: {
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  address: {
    fontSize: 12,
    color: "#555",
  },
});

export default PressableCard;
