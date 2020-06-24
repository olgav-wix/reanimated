import React, { useState } from "react";
import Card, { cards } from "../components/Card/Card";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  add,
  Clock,
  cond,
  eq,
  Extrapolate,
  interpolate,
  not,
  proc,
  set,
  startClock,
  useCode,
  Value
} from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

const duration = 1000;

const runAnimation = proc(
  (
    startAnimation: Animated.Value<number>,
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    opacity: Animated.Node<number>
  ) =>
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(to)),
      set(startTime, clock),
      set(startAnimation, 0)
    ])
);

const HideShow = () => {
  const [show, setShow] = useState(true);
  const clock = new Clock();
  // const [startTime, from, to] = useValues([0, 0, 0], []);
  const startTime = new Value(0);
  const from = new Value(0);
  const to = new Value(0);
  const startAnimation = new Value(1);
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP
  });
  useCode(
    () => runAnimation(startAnimation, clock, from, to, startTime, opacity),
    [clock, from, startAnimation, startTime, to]
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <View style={styles.button}>
        <Button
          title={show ? "Hide" : "Show"}
          onPress={() => {
            // startAnimation.setValue(0);
            setShow(!show);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: 100
  }
});

export default HideShow;
