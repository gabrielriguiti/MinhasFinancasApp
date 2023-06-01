import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Dimensions, View } from "react-native";

class DatePickerComponent extends React.Component<any, any> {
  render() {
    return (
      <View style={{
        flexGrow: 1,
        justifyContent: "flex-end",
        width: Dimensions.get("window").width
      }}>
        <View style={{
          backgroundColor: "#fafafa",
          padding: 20,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}>
          <DateTimePicker value={this.props.value}
                          display="inline"
                          themeVariant={"light"}
                          locale="pt-BR"
                          onChange={this.props.onChage}
          />
        </View>
      </View>
    );
  }
}

export default DatePickerComponent;
