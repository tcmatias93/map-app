import {
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconName: keyof typeof Ionicons.glyphMap;
}

const FAB = ({ onPress, style, iconName }: Props) => {
  return (
    <View style={[styles.btn, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName} color={"white"} size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
    elevation: 5,
  },
});
