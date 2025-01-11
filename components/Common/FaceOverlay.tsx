// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { Face } from "expo-face-detector";

// interface FaceOverlayProps {
//   face: Face;
// }

// const FaceOverlay: React.FC<FaceOverlayProps> = ({ face }) => {
//   const { bounds } = face;

//   return (
//     <View
//       style={[
//         styles.faceOverlay,
//         {
//           width: bounds.size.width,
//           height: bounds.size.height,
//           left: bounds.origin.x,
//           top: bounds.origin.y,
//         },
//       ]}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   faceOverlay: {
//     position: "absolute",
//     borderWidth: 2,
//     borderColor: "red",
//     zIndex: 10,
//   },
// });

// export default FaceOverlay;
