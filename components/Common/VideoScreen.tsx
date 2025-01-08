// local video

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

const videoSource = "https://www.youtube.com/watch?v=q1_OKLs3QL8&t=17s";
const thumbnailSource = require("@/assets/images/thumbnailImage.png");
export default function VideoScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    Linking.openURL(videoSource);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        {!isPlaying && (
          <TouchableOpacity onPress={handlePlay} style={styles.overlay}>
            <Image source={thumbnailSource} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    zIndex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
    opacity: 0.7,
  },
  thumbnail: {
    width: "100%",
  },
});
