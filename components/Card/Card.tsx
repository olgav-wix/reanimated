import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import Animated from "react-native-reanimated";
import StyleGuide from "../StyleGuide";

// export const CARD_HEIGHT = 189;
// export const CARD_WIDTH = 300;
const { width } = Dimensions.get("window");
export const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - StyleGuide.spacing * 20;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

interface ICard {
  id: number;
  source: ImageSourcePropType;
}

export const cards: ICard[] = [
  { id: 1, source: require("./card_1.png") },
  { id: 2, source: require("./card_2.png") },
  { id: 3, source: require("./card_3.png") }
];

interface FlexibleCardProps {
  card: ICard;
  style?: Animated.AnimateStyle<ImageStyle>;
}

export const FlexibleCard: React.FC<FlexibleCardProps> = ({ card, style }) => (
  <Animated.Image
    style={[styles.flexibleContainer, style]}
    source={card.source}
  />
);

interface CardProps {
  card: ICard;
  style?: ImageStyle;
}

const Card: React.FC<CardProps> = ({ card, style }) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={[styles.image, style]} source={card.source} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: StyleGuide.spacing,
    margin: StyleGuide.spacing
  },
  flexibleContainer: {
    flex: 1,
    maxWidth: "100%",
    aspectRatio: CARD_ASPECT_RATIO,
    margin: StyleGuide.spacing,
    borderRadius: 18,
    resizeMode: "contain"
  }
});

export default Card;
