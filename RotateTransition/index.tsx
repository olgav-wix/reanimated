import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Card, { CARD_WIDTH, cards } from "../components/Card/Card";
import Animated, { interpolate, multiply, not } from "react-native-reanimated";
import { useTransition } from "react-native-redash";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RotateTransition: React.FC<{}> = () => {
  const [reset, setReset] = useState<0 | 1>(0);
  const transition = useTransition(reset);
  return (
    <>
      <View style={styles.container}>
        {cards.map((card, index) => {
          // const direction = card.id === 1 ? -1 : card.id === 2 ? 0 : 1;
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1]
          });
          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6]
            })
          );
          return (
            <Animated.View
              key={card.id}
              style={[
                styles.overlay,
                {
                  transform: [
                    { translateX: -CARD_WIDTH / 2 },
                    { rotate },
                    { translateX: CARD_WIDTH / 2 }
                  ]
                }
              ]}
            >
              <Card card={card} />
            </Animated.View>
          );
        })}
      </View>
      <View style={styles.button}>
        <Button
          title={reset ? "Reset" : "Start"}
          onPress={() => setReset(reset ^ 1)} // reset ? 0 : 1
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  button: {
    marginBottom: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default RotateTransition;
