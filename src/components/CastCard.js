import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getPoster } from "../services/Movieservices";

const CastCard = ({ originalName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: getPoster(image) } :''}
        resizeMode={image ? "cover" : "contain"}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  originalName: {
    width: 80,
    color:"#000",

    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: "#969696",

    fontSize: 10,
  },
});

export default CastCard;