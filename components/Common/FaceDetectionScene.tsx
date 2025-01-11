// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import * as FaceDetector from "expo-face-detector";

// import CameraComponent from "./CameraComponent";
// import FaceOverlay from "./FaceOverlay";

// const FaceDetectionScene: React.FC = () => {
//   const [faces, setFaces] = useState<FaceDetector.Face[]>([]);

//   const handleFacesDetected = ({ faces }: FaceDetectionResult) => {
//     setFaces(faces);
//   };

//   return (
//     <View style={styles.container}>
//       <CameraComponent onFacesDetected={handleFacesDetected}>
//         {faces.map((face, index) => (
//           <FaceOverlay key={`face_${index}`} face={face} />
//         ))}
//       </CameraComponent>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default FaceDetectionScene;
