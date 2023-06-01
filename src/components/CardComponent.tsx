import React from "react";
import { StyleSheet, View } from "react-native";

class CardComponent extends React.Component<any, any> {
  render() {
    return (
      <View style={[styles.container, this.props.styles]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(69,71,73,0.1)",
    marginLeft: 8,
    marginRight: 8
  },
})

export default CardComponent;
