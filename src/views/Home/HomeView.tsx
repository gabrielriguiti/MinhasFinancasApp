import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Icon } from "@rneui/base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Categoria } from "../../model/entities/Categoria";

import CardComponent from "../../components/CardComponent";
import ProvisaoView from "../ProvisaoView";

import { renderPrevisoes } from "../../presentters/HomePresentter";
import { formatCurrency } from "../../utils/NumberUtils";

import { styles } from "./HomeStyles";
import { Provisao } from "../../model/types/Provisao";
import SaldoContainerComponent from "../../components/SaldoContainerComponent";
import { getPrevisoes } from "../../api/lancamento-service";
import Toast from "react-native-toast-message";


const Stack = createNativeStackNavigator();

class HomeView extends React.Component<any, any> {
  state = {
    data: {
      vlrDespesas: 0,
      despCateg: Array<Categoria>
    },
    loading: false,
    previsoes: []
  };

  async componentDidMount(): Promise<void> {
    this.loadData();
  }

  loadData = () => {
    getPrevisoes()
      .then(res => {
        this.setState({ previsoes: res });
      });
  };

  getSaldo = () => {
    let saldo = 0;

    this.state.previsoes.map(l => {
      const lancamento: Provisao = l;

      saldo = saldo + (lancamento.valor * lancamento.recDesp);
    });

    return formatCurrency(saldo);
  };

  getSaldoReceitas = () => {
    let saldo = 0;

    this.state.previsoes.map(l => {
      const lancamento: Provisao = l;

      if (lancamento.recDesp == 1) {
        saldo = saldo + lancamento.valor;
      }
    });

    return formatCurrency(saldo);
  };

  getSaldoDespesas = () => {
    let saldo = 0;

    this.state.previsoes.map(l => {
      const lancamento: Provisao = l;

      if (lancamento.recDesp == -1) {
        saldo = saldo + lancamento.valor;
      }
    });

    return formatCurrency(saldo);
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"StackHome"}
                      options={{ headerShown: false }}>
          {props => (
            <View>
              <SaldoContainerComponent getSaldo={() => this.getSaldo()}
                                       getSaldoReceitas={() => this.getSaldoReceitas()}
                                       getSaldoDespesas={() => this.getSaldoDespesas()} />

              <CardComponent styles={{ alignItems: "flex-start", marginTop: 20 }}>
                <View style={{ width: "100%", height: Dimensions.get("window").height * 0.7 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={[styles.txtLg, { marginLeft: 18, marginTop: 24, marginBottom: 16 }]}>
                      Lançamentos
                    </Text>

                    <Icon style={{ marginRight: 20, marginTop: 8 }}
                          name={"add"}
                          size={32}
                          color={styles.txtLg.color}
                          onPress={() => props.navigation.navigate("AddFixo", { updateView: () => this.loadData() })} />
                  </View>

                  <ScrollView>
                    {
                      renderPrevisoes(this, props)
                    }
                  </ScrollView>
                </View>
              </CardComponent>

              <Toast />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name={"AddFixo"}
                      component={ProvisaoView}
                      options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}


export default HomeView;
