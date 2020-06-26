import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  TouchableOpacity
} from "react-native";

const images = [
  {color: '#17c829'},
  {color: '#45abc3'},
  {color: '#c34f3e'},
  {color: '#4d45c3'},
  {color: '#a1c345'},
  {color: '#8445c3'},
  {color: '#8b9473'},
  {color: '#a1c345'},
  {color: '#17c829'},
  {color: '#45abc3'},
  {color: '#c34f3e'},
  {color: '#4d45c3'},
  {color: '#a1c345'},
  {color: '#8445c3'},
  {color: '#8b9473'},
  {color: '#a1c345'},
];

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [screen, setScreen] = useState(0)
  let scroll = useRef(null)
  useEffect(() => {
    scroll.current.scrollTo({x: screen * windowWidth, y: 0, animated: true})
  }, [screen]);

  const {width: windowWidth} = useWindowDimensions();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          ref={scroll}
          horizontal={true}
          style={{flex: 1}}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map(( image, imageIndex ) => {
            return (
              <View
                style={{width: windowWidth, flex: 1, backgroundColor: image.color}}
                key={imageIndex}
              >
                <View style={{flex: 1, margin: 10}}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={{position: 'absolute', bottom: 10, alignItems: 'center', width: windowWidth}}>
          <View style={[styles.indicatorContainer]}>
            {images.map(( image, imageIndex ) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1)
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp"
              });
              return (
                <TouchableOpacity onPress={() => {
                  setScreen(imageIndex)
                }}>
                  <Animated.View

                    key={imageIndex}
                    style={[styles.normalDot, {width}]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4
  },
  indicatorContainer: {
    alignSelf: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
