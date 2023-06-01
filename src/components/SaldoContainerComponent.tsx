import React from "react";
import { Text, View } from "react-native";
import { styles } from "../views/Home/HomeStyles";
import { Icon } from "@rneui/base";

class SaldoContainerComponent extends React.Component<any, any> {

  render() {
    return (
      <View style={styles.saldoContainer}>
        <Text style={styles.txt}>Saldo do mês</Text>

        <Text style={styles.txtSaldo}>{this.props.getSaldo()}</Text>

        <View style={[{
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: 20
        }, styles.rowDirection]}>
          <View style={styles.rowDirection}>
            <Icon name={"north"}
                  color={"#fff"}
                  style={{
                    backgroundColor: "rgb(36,171,64)",
                    padding: 6,
                    borderRadius: 50
                  }} />

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.txtSm}>Receitas</Text>

              <Text style={[{
                color: "rgb(36,171,64)"
              }, styles.txtSaldoSm]}>{this.props.getSaldoReceitas()}</Text>
            </View>
          </View>

          <View style={styles.rowDirection}>
            <Icon name={"south"}
                  color={"#fff"}
                  style={{
                    backgroundColor: "#e01717",
                    padding: 6,
                    borderRadius: 50
                  }} />

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.txtSm}>Despesas</Text>

              <Text style={[{
                color: "#e01717"
              }, styles.txtSaldoSm]}>{this.props.getSaldoDespesas()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SaldoContainerComponent;
