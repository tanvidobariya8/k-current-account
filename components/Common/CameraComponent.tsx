// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera, CameraType, CameraView, FaceDetectionResult } from "expo-camera";
// import * as FaceDetector from "expo-face-detector";

// interface CameraComponentProps {
//   onFacesDetected: (faces: FaceDetectionResult) => void;
// }

// const CameraComponent: React.FC<CameraComponentProps> = ({
//   onFacesDetected,
// }) => {
//   const [type, setType] = useState(CameraType.front);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity style={styles.button} onPress={requestPermission}>
//           <Text style={styles.text}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const toggleCameraType = () => {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView
//         style={styles.camera}
//         type={type}
//         onFacesDetected={onFacesDetected}
//         faceDetectorSettings={{
//           mode: FaceDetector.FaceDetectorMode.fast,
//           detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
//           runClassifications: FaceDetector.FaceDetectorClassifications.none,
//           minDetectionInterval: 100,
//           tracking: true,
//         }}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "white",
//   },
// });

// export default CameraComponent;
