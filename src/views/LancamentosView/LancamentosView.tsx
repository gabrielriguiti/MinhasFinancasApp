import React from "react";
import { ScrollView, Text, View } from "react-native";

import SaldoContainerComponent from "../../components/SaldoContainerComponent";

import { createTables, getDBConnection } from "../../database/db-service";
import { findLancamentos } from "../../database/lancamento-service";
import { Provisao } from "../../model/types/Provisao";
import { getCategoriaById } from "../../model/entities/Categoria";
import { Icon } from "@rneui/base";
import { formatCurrency } from "../../utils/NumberUtils";

class LancamentosView extends React.Component<any, any> {

  state = {
    lancamentos: []
  };

  async componentDidMount(): Promise<void> {
    const { navigation } = this.props;
    const db = await getDBConnection();

    await createTables();

    const lancamentos = await findLancamentos(db);
    console.log(lancamentos);
    this.setState({ lancamentos: lancamentos });

    navigation.addListener("focus", async () => {
      const lancamentos = await findLancamentos(db);

      this.setState({ lancamentos: lancamentos });
    });
  }

  getSaldo = () => {
    let saldo = 0;

    this.state.lancamentos.map(l => {
      const lancamento: Provisao = l;

      saldo = saldo + (lancamento.valor * lancamento.recDesp);
    });

    return formatCurrency(saldo);
  };

  getSaldoReceitas = () => {
    let saldo = 0;

    this.state.lancamentos.map(l => {
      const lancamento: Provisao = l;

      if (lancamento.recDesp == 1) {
        saldo = saldo + lancamento.valor;
      }
    });

    return formatCurrency(saldo);
  };

  getSaldoDespesas = () => {
    let saldo = 0;

    this.state.lancamentos.map(l => {
      const lancamento: Provisao = l;

      if (lancamento.recDesp == -1) {
        saldo = saldo + lancamento.valor;
      }
    });

    return formatCurrency(saldo);
  };

  render() {
    return (
      <View style={{ flexGrow: 1, marginBottom: 200 }}>
        <SaldoContainerComponent getSaldo={() => this.getSaldo()}
                                 getSaldoDespesas={() => this.getSaldoDespesas()}
                                 getSaldoReceitas={() => this.getSaldoReceitas()} />

        <ScrollView>
          <View style={{
            backgroundColor: "#fff",
            flexGrow: 1,
            marginTop: 10,
            borderRadius: 20,
            padding: 10
          }}>
            {
              renderLancamentos(this.state.lancamentos)
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

function renderLancamentos(lancamentos: Provisao[]) {
  return lancamentos.map(l => {
    const categoria = getCategoriaById(l.categoria);

    return (
      <View style={{
        flexDirection: "row",
        padding: 8,
        alignItems: "center"
      }}
            key={l.id}>
        <Icon name={categoria.icone}
              color={"#fff"}
              borderRadius={50}
              style={{
                backgroundColor: categoria.color,
                padding: 6
              }}
        />

        <View style={{ marginStart: 4, marginTop: 3 }}>
          <Text style={{ fontWeight: "500" }}> {categoria.name}</Text>

          <Text style={{
            paddingStart: 4,
            color: l.recDesp == -1 ? "rgba(224,23,23,0.93)" : "rgb(36,171,64)"
          }}>
            {formatCurrency(l.valor)}
          </Text>
        </View>
      </View>
    );
  });
}

export default LancamentosView;
