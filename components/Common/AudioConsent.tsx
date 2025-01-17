import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Button from "./Button";

export default function ConsentModal({
  visible,
  onClose,
  consentData,
  onAccecpt,
}: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<Audio.Sound | null>(null);

  const playAudio = async (audioUrl: any) => {
    try {
      if (audioPlayer) {
        await audioPlayer.stopAsync();
        await audioPlayer.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setAudioPlayer(sound);
      setIsPlaying(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  const pauseAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.stopAsync();
      await audioPlayer.unloadAsync();
      setAudioPlayer(null);
      setIsPlaying(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.languageName}>
            {consentData.languageDisplayName}
          </Text>
          <Text style={styles.message}>{consentData.consentMessage}</Text>
          <View style={styles.audioControls}>
            <Button
              title={
                isPlaying
                  ? consentData.audioControlPauseLabel
                  : consentData.audioControlPlayLabel
              }
              onPress={() =>
                isPlaying ? pauseAudio() : playAudio(consentData.consentAudio)
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Close"
              onPress={() => {
                stopAudio();
                onClose();
              }}
              style={{ flex: 1 }}
            />
            <Button
              title="Accept"
              onPress={() => {
                stopAudio();
                onAccecpt();
              }}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  languageName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
  },
  audioControls: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },
});
