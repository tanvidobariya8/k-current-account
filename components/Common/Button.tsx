import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

// Define the prop types
type ButtonProps = {
  icon: any;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

// Define the Button component
const Button: React.FC<ButtonProps> = ({
  icon,
  size = 28,
  color = "#f1f1f1",
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {/* <MaterialIcons name={icon} size={size} color={color} /> */}
      icon
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
