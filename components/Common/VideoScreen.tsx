import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const videoSource = require("@/assets/images/currentAccountkotak.mp4");
const thumbnailSource = require("@/assets/images/thumbnailImage.png");
const pause = require("@/assets/images/pasue.png");

export default function VideoScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  const handlePlay = () => {
    player.play();

    setIsPlaying(true);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        {!isPlaying ? (
          <TouchableOpacity onPress={handlePlay} style={styles.overlay}>
            <Image source={thumbnailSource} style={styles.thumbnail} />
            <View style={styles.iconContainer}>
              <Image source={pause} style={styles.pauseIcon} />
            </View>
          </TouchableOpacity>
        ) : (
          <VideoView
            style={styles.overlay}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="cover"
          />
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
    height: 200,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center the icon
    zIndex: 2,
  },
  pauseIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

// const videoSource = "https://www.youtube.com/watch?v=q1_OKLs3QL8&t=17s";

// redirect youtube
// useEffect(() => {
//   return () => {
//     setIsPlaying(false);
//   };
// }, [isPlaying]);

// const handlePlay = () => {
//   setIsPlaying(true);
//   Linking.openURL(videoSource);
// };

// retuen
// <View style={styles.contentContainer}>
//   <View style={styles.videoContainer}>
//     {!isPlaying && (
//       <TouchableOpacity onPress={handlePlay} style={styles.overlay}>
//         <Image source={thumbnailSource} style={styles.thumbnail} />
//         <View style={styles.iconContainer}>
//           <Image source={pause} style={styles.pauseIcon} />
//         </View>
//       </TouchableOpacity>
//     )}
//   </View>
// </View>
