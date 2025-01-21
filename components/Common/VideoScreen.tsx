import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const videoSource = require("@/assets/images/currentAccountkotak.mp4");
const thumbnailSource = require("@/assets/images/thumbnailImage.png");
const pause = require("@/assets/images/pause.png");

export default function VideoScreen({ isPlaying, setIsPlaying }: any) {
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.duration && player.currentTime >= player.duration) {
        setIsVideoComplete(true);
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [player]);

  const handlePlay = () => {
    player.play();
    setIsPlaying(true);
  };

  const handleSeeMoreVideos = () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=q1_OKLs3QL8&t=17s";
    Linking.openURL(youtubeUrl);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        {!isPlaying ? (
          <TouchableOpacity onPress={handlePlay} style={styles.overlay}>
            <Image source={thumbnailSource} style={styles.thumbnail} />
            {isVideoComplete ? (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={handleSeeMoreVideos}
              >
                <Text style={styles.seeMoreText}>See More Video</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.iconContainer}>
                <Image source={pause} style={styles.pauseIcon} />
              </View>
            )}
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
    opacity: 0.6,
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 2,
  },
  pauseIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  seeMoreButton: {
    marginTop: 20,
    backgroundColor: "rgb(94 89 89)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -66 }, { translateY: -34 }],
  },
  seeMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
