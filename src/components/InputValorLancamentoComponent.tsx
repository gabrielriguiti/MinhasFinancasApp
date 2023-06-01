import React from "react";
import { StyleSheet, TextInput } from "react-native";

export class InputValorLancamentoComponent extends React.Component<any, any> {

  render() {
    return (
      <TextInput style={styles.style}
                 onChangeText={(txt) => {
                   this.props.onChangeVlr(txt);
                 }}
                 value={this.props.vlrLanc}
                 keyboardType={"numeric"}>
      </TextInput>
    );
  }
}

const styles = StyleSheet.create(
  {
    style: {
      fontSize: 50,
      paddingTop: 20,
      color: "#fff",
      fontWeight: "500",
      letterSpacing: 2,
      borderWidth: 0
    }
  }
);
