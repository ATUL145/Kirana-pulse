import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { cleanUpName } from "../utils/format";
import {
  FontAwesome,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const StoreCard = ({ name, type, address, navigation }) => {
  const [liked, setLiked] = useState(false);
  const [phoneClicked, setPhoneClicked] = useState(true);
  const [whatsappClicked, setWhatsappClicked] = useState(true);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const togglePhone = () => {
    setPhoneClicked(!phoneClicked);
  };

  const toggleWhatsapp = () => {
    setWhatsappClicked(!whatsappClicked);
  };

  return (
    <View style={styles.headerCard}>
      <Text style={styles.headerText}>{cleanUpName(name)}</Text>
      <Text style={styles.headerType}>{type}</Text>

      <LottieView
        source={require("../assets/Store.json")}
        style={{
          width: 0.5 * width,
          height: 0.5 * width,
          marginTop: -30,
        }}
        autoPlay
      />
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={toggleLike}>
          {liked ? (
            <FontAwesome name="heart" size={28} color="red" />
          ) : (
            <FontAwesome name="heart-o" size={28} color="red" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePhone}>
          {phoneClicked ? (
            <Feather name="phone" size={28} color="purple" />
          ) : (
            <MaterialIcons name="phone-in-talk" size={28} color="purple" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleWhatsapp}>
          {whatsappClicked ? (
            <FontAwesome name="whatsapp" size={28} color="green" />
          ) : (
            <FontAwesome5 name="whatsapp-square" size={28} color="green" />
          )}
        </TouchableOpacity>
        <MaterialIcons name="store-mall-directory" size={28} color="orange" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 0.06 * width,
    marginBottom: 0.001 * height,
  },
  headerType: {
    fontSize: 0.04 * width,
    marginBottom: 0.01 * height,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: height * 0.01,
    width: width,
  },
  headerCard: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StoreCard;
