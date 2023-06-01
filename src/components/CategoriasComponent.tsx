import React from "react";
import { Dimensions, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";

import { getCategorias } from "../model/entities/Categoria";

class CategoriasComponent extends React.Component<any, any> {

  renderCategorias = () => {
    return getCategorias().map(c => {
      return (
        <TouchableOpacity onPress={() => this.props.onClick(c)}
                          key={c.id}>
          <View style={{
            flexDirection: "row",
            marginTop: 14,
            alignItems: "center"
          }}>
            <Icon name={c.icone}
                  color={"#fff"}
                  borderRadius={50}
                  style={{
                    backgroundColor: c.color,
                    padding: 10
                  }}
            />

            <Text style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "500"
            }}>
              {c.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View style={{
        flexGrow: 1,
        justifyContent: "flex-end",
        width: Dimensions.get("window").width
      }}>
        <View style={{
          minHeight: Dimensions.get("window").height * 0.9,
          backgroundColor: "#fafafa",
          padding: 20,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3
        }}>
          {this.renderCategorias()}
        </View>
      </View>);
  }
}

export default CategoriasComponent;
