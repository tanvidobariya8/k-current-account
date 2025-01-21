import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import tw from "twrnc";

const BiometricCamera: React.FC = () => {
  const [facing, setFacing] = useState<"front" | "back">("front");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<any | null>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-center`}>
          We need your permission to use the camera.
        </Text>
        <Button
          title="Grant Permission"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  const captureImage = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      setFrontImage(photo.uri);
    }
  };

  return (
    <View style={tw`flex-1`}>
      {!frontImage ? (
        <CameraView
          style={tw`flex-1`}
          facing={facing}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={tw`absolute bottom-0 w-full p-4 bg-black bg-opacity-50`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Button title="Flip Camera" onPress={toggleCameraFacing} />

              <Button title="Capture" onPress={captureImage} />
            </View>
          </View>
        </CameraView>
      ) : (
        <>
          <Image
            source={{ uri: frontImage }}
            style={tw`w-auto h-4/5 border-2 border-blue-500 m-5`}
          />
          <Button
            title="Proceed with Biometric"
            onPress={() => router.push("/basic-details")}
          />
        </>
      )}
    </View>
  );
};

export default BiometricCamera;
