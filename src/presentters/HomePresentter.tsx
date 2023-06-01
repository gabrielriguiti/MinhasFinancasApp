import { Provisao } from "../model/types/Provisao";
import { getCategoriaById } from "../model/entities/Categoria";
import { Text, View } from "react-native";
import { Icon } from "@rneui/base";
import { formatCurrency } from "../utils/NumberUtils";
import React from "react";

export function renderPrevisoes(lancamentos: Provisao[]) {
  return lancamentos.map(l => {
    const categoria = getCategoriaById(l.categoria);

    return (
      <View style={{
        flexDirection: "row",
        padding: 8,
        paddingLeft: 16,
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
          <Text style={{ fontWeight: "500" }}> {l.descricao}</Text>

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
