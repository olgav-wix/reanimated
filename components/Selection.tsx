import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import StyleGuide from "./StyleGuide";
import CheckBox from "@react-native-community/checkbox";

interface Props {
  name: string;
  onPress: () => void;
  isSelected: boolean;
}

const Selection: React.FC<Props> = ({ name, onPress, isSelected }) => {
  return (
    <SafeAreaView>
      <RectButton
        {...{ onPress }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: StyleGuide.spacing * 2
        }}
      >
        <View style={styles.button} accessible>
          <Text>{name}</Text>
        </View>
        <CheckBox value={isSelected} style={{ height: 20 }} />
      </RectButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderBottomWidth: 1,
    borderColor: "#f4f6f3"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: StyleGuide.spacing * 2 + 20,
    padding: StyleGuide.spacing
  }
});

export default Selection;
