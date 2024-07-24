import React from "react"
import {View, StyleSheet, Text} from "react-native"
import LottieView from "lottie-react-native"

const animation = require("../assets/no_data_animation.json")

export default NoDataScreen = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{message}</Text>
      <LottieView
      style={styles.lottieView}
      source={animation}
      loop
      autoPlay
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  lottieView: {
    height: 400,
    width: 400
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
  },
})
