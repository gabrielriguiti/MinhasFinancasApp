import { Provisao } from "../model/types/Provisao";
import { getCategoriaById } from "../model/entities/Categoria";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import { formatCurrency } from "../utils/NumberUtils";
import React from "react";
import { excluirLancamento } from "../api/lancamento-service";
import HomeView from "../views/Home/HomeView";
import { ParamListBase, RouteProp } from "@react-navigation/native";

export function renderPrevisoes(view: HomeView, props: {
  route: RouteProp<ParamListBase, "StackHome">;
  navigation: any;
}) {
  const lancamentos: Provisao[] = view.state.previsoes;

  return lancamentos.map(l => {
    const categoria = getCategoriaById(l.categoria);

    return (
      <TouchableOpacity key={l.id}
                        onLongPress={() => {
                          confirmarExclusao(l);
                        }}
                        onPress={() => props.navigation.navigate("AddFixo", {
                          updateView: () => view.loadData(),
                          lancamento: l
                        })}>
        <View style={{
          flexDirection: "row",
          padding: 8,
          paddingLeft: 16,
          alignItems: "center"
        }}>
          <Icon name={categoria.icone}
                color={"#fff"}
                borderRadius={50}
                style={{
                  backgroundColor: categoria.color,
                  padding: 6
                }}
          />

          <View style={{ marginStart: 4, marginTop: 3 }}>
            <Text style={{ fontWeight: "500" }}> {l.descricao}</Text>

            <Text style={{
              paddingStart: 4,
              color: l.recDesp == -1 ? "rgba(224,23,23,0.93)" : "rgb(36,171,64)"
            }}>
              {formatCurrency(l.valor)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  function confirmarExclusao(lancamento: Provisao) {
    Alert.alert(
      "Confirmar exclusão",
      `Desejar realmente excluir o lançamento ${lancamento.descricao} ?`,
      [
        {
          text: "Confirmar",
          onPress: () => {
            excluirLancamento(lancamento.id)
              .then(() => view.loadData());
          },
          style: "default"
        },
        {
          text: "Cancelar",
          onPress: () => {
          },
          style: "cancel"
        }
      ]
    );
  }
}
