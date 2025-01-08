import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";
import Button from "./Button";

interface CameraProps {
  zoom: number;
  facing: "front" | "back";
  flash: "on" | "off";
  animateShutter: boolean;
  enableTorch: boolean;
}

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState<CameraProps>({
    zoom: 0,
    facing: "front",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (
      cameraPermission?.granted &&
      mediaLibraryPermissionResponse?.status === "granted"
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleProperty = <T extends keyof CameraProps>(
    prop: T,
    option1: CameraProps[T],
    option2: CameraProps[T]
  ) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1),
    }));
  };

  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0),
    }));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture: any = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log("Error while taking the picture:", err);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        await MediaLibrary.getAssetInfoAsync(asset.id);
        Alert.alert("Photo saved!", image);
        setImage(null);
        getLastSavedImage();
      } catch (err) {
        console.log("Error while saving the picture:", err);
      }
    }
  };

  const getLastSavedImage = async () => {
    if (mediaLibraryPermissionResponse?.status === "granted") {
      const dcimAlbum = await MediaLibrary.getAlbumAsync("DCIM");

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <Button
              icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("flash", "on", "off")}
            />
            <Button
              icon="animation"
              color={cameraProps.animateShutter ? "white" : "#404040"}
              onPress={() => toggleProperty("animateShutter", true, false)}
            />
            <Button
              icon={
                cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"
              }
              onPress={() => toggleProperty("enableTorch", true, false)}
            />
          </View>
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
          <View style={styles.sliderContainer}>
            <Button icon="zoom-out" onPress={zoomOut} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={cameraProps.zoom}
              onValueChange={(value) =>
                setCameraProps((current) => ({ ...current, zoom: value }))
              }
              step={0.1}
            />
            <Button icon="zoom-in" onPress={zoomIn} />
          </View>
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              onPress={() => previousImage && setImage(previousImage)}
            >
              <Image
                source={{ uri: previousImage || undefined }}
                style={styles.previousImage}
              />
            </TouchableOpacity>

            <Button
              icon="camera"
              size={60}
              style={{ height: 60 }}
              onPress={takePicture}
            />
            <Button
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
              size={40}
            />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <Button icon="flip-camera-android" onPress={() => setImage(null)} />
            <Button icon="check" onPress={savePicture} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: "row",
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
