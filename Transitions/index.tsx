import React, { useRef, useState } from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import Card, { CARD_ASPECT_RATIO, cards } from "../components/Card/Card";
import Selection from "../components/Selection";
import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import StyleGuide from "../components/StyleGuide";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const column: Layout = {
  id: "column",
  name: "Column",
  layout: {
    container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }
};

const row: Layout = {
  id: "row",
  name: "Row",
  layout: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    child: {
      width: width / 3 - StyleGuide.spacing * 3,
      height: (width / 3 - StyleGuide.spacing * 3) / CARD_ASPECT_RATIO
    }
  }
};

const wrap: Layout = {
  id: "wrap",
  name: "Wrap",
  layout: {
    container: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    child: {
      flex: 0,
      width: width / 2 - StyleGuide.spacing * 2,
      height: (width / 2 - StyleGuide.spacing * 2) / CARD_ASPECT_RATIO
    }
  }
};

const layouts = [column, row, wrap];
const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);

const Transitions: React.FC<{}> = () => {
  const ref = useRef<TransitioningView>(null);
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
  return (
    <>
      <Transitioning.View
        style={[styles.container, currentLayout.container]}
        {...{ ref, transition }}
      >
        {cards.map(card => (
          <Card key={card.id} style={currentLayout.child} card={card} />
        ))}
      </Transitioning.View>
      {layouts.map(layout => (
        <Selection
          name={layout.name}
          key={layout.id}
          isSelected={layout.layout === currentLayout}
          onPress={() => {
            if (ref.current) ref.current.animateNextTransition();
            setCurrentLayout(layout.layout);
          }}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
    // marginBottom: 150
  }
});

export default Transitions;
