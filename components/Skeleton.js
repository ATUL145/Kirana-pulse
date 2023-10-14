import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoader = () => {
  const animatedStyle = {
    opacity: new Animated.Value(0.5),
  };

  const shimmer = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedStyle.opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedStyle.opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  shimmer();

  return (
    <View>
      <Animated.View style={[styles.placeholder, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    height: 100,
    backgroundColor: "#c0c0c0",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default SkeletonLoader;
