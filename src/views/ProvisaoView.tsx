import React from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, TextInput } from "@react-native-material/core";

import { Icon } from "@rneui/base";

import { Categoria, getCategoriaById } from "../model/entities/Categoria";

import { InputValorLancamentoComponent } from "../components/InputValorLancamentoComponent";
import CategoriasComponent from "../components/CategoriasComponent";
import { Provisao } from "../model/types/Provisao";
import { save } from "../api/lancamento-service";
import Toast from "react-native-toast-message";
import { formatFloat } from "../utils/NumberUtils";

class ProvisaoView extends React.Component<any, any> {
  state = {
    topContainerCol: "rgba(224,23,23,0.93)",
    backColor1: "rgba(255,255,255,1)",
    backColor2: "rgba(255,255,255,0)",
    id: undefined,
    recDesp: -1,
    descricao: "",
    diaVenc: "",
    vlrLanc: "0,00",
    showCategory: false,
    categoria: new Categoria(0, "Selecione", "", "category", [])
  };

  componentDidMount() {
    const lancamento: Provisao = this.props.route.params.lancamento;

    if (lancamento) {
      this.setState({
        id: lancamento.id,
        recDesp: lancamento.recDesp,
        descricao: lancamento.descricao,
        diaVenc: lancamento.diaVenc,
        vlrLanc: formatFloat(lancamento.valor),
        categoria: getCategoriaById(lancamento.categoria),
        topContainerCol: lancamento.recDesp == -1 ? "rgba(224,23,23,0.93)" : "rgb(36,171,64)",
        backColor1: lancamento.recDesp == -1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        backColor2: lancamento.recDesp == -1 ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)"
      });
    }
  }

  onChangeVlr = (vlrLanc: String) => {
    this.setState({ vlrLanc });
  };

  onSelectCategory = (categoria: Categoria) => {
    this.setState({
      categoria: categoria,
      showCategory: false
    });
  };

  save = async () => {
    const { descricao, vlrLanc } = this.state;

    const lancamento: Provisao = {
      id: this.state.id,
      descricao: descricao,
      valor: Number.parseFloat(vlrLanc.replace(",", ".")),
      diaVenc: Number.parseInt(this.state.diaVenc),
      categoria: this.state.categoria.id,
      recDesp: this.state.recDesp,
      provisao: true
    };

    save(lancamento)
      .then(res => {
        this.props.route.params.updateView();
        this.props.navigation.goBack();
      })
      .catch(err => {
        let msg;

        if (err.response) {
          msg = err.response.data.message;
        } else {
          msg = err.message;
        }

        Toast.show({
          type: "error",
          text1: msg
        });
      });
  };

  render() {
    return (
      <View style={{ flexGrow: 1 }}>

        <View style={{
          backgroundColor: this.state.topContainerCol,
          height: 240,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.52)",
            width: 240,
            height: 46,
            borderRadius: 50,
            justifyContent: "center"
          }}>
            <View style={{ flexDirection: "row", flexGrow: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({
                  topContainerCol: "rgba(224,23,23,0.93)",
                  backColor1: "rgba(255,255,255,1)",
                  backColor2: "rgba(255,255,255,0)",
                  recDesp: -1
                })}>
                <View
                  style={[styles.btnRecDesp, { backgroundColor: this.state.backColor1 }]}>
                  <Text>Despesa</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => this.setState({
                  topContainerCol: "rgb(36,171,64)",
                  backColor1: "rgba(255,255,255,0)",
                  backColor2: "rgba(255,255,255,1)",
                  recDesp: 1
                })}>
                <View
                  style={[styles.btnRecDesp, { backgroundColor: this.state.backColor2 }]}>
                  <Text>Receita</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <InputValorLancamentoComponent onChangeVlr={this.onChangeVlr} vlrLanc={this.state.vlrLanc} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            color={"#2c2c2c"}
            style={styles.textInput}
            label="Descrição"
            leading={props => <Icon name="description" {...props} />}
            value={this.state.descricao}
            onChangeText={(txt) => this.setState({ descricao: txt })}
          >
          </TextInput>

          <TextInput
            color={"#2c2c2c"}
            style={styles.textInput}
            label="Dia Vencimento"
            leading={props => <Icon name="today" {...props} />}
            value={this.state.diaVenc}
            onChangeText={(txt) => this.setState({ diaVenc: txt })}
            keyboardType={"numeric"}
          >
          </TextInput>

          <TextInput
            showSoftInputOnFocus={false}
            color={"#000"}
            style={styles.textInput}
            label="Categoria"
            value={this.state.categoria.name.toString()}
            leading={props => <Icon name={this.state.categoria.icone} {...props} />}
            editable={false}
            onPressIn={() => this.setState({ showCategory: true })}
          />


          <Button title="Salvar"
                  tintColor={"#fff"}
                  color={this.state.topContainerCol}
                  style={styles.textInput}
                  onPress={() => this.save()}
          />
        </View>

        <Modal visible={this.state.showCategory}
               transparent={true}
               animationType={"slide"}>
          <CategoriasComponent onClick={this.onSelectCategory} />
        </Modal>

        <Toast />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30
  },
  btnRecDesp: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  formContainer: {
    marginTop: -36,
    paddingTop: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#f1f1f1",
    height: "100%"
  }
});

export default ProvisaoView;
