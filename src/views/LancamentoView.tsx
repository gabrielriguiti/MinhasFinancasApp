import React from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, Stack, Switch, TextInput } from "@react-native-material/core";
import Moment from "moment";

import { Icon } from "@rneui/base";
import { createLancamento, findLancamentosFixos } from "../database/lancamento-service";
import { getDBConnection } from "../database/db-service";

import { Categoria } from "../model/entities/Categoria";
import { Lancamento } from "../model/types/Lancamento";

import { InputValorLancamentoComponent } from "../components/InputValorLancamentoComponent";
import CategoriasComponent from "../components/CategoriasComponent";
import DatePickerComponent from "../components/DatePickerComponent";

class LancamentoView extends React.Component<any, any> {
  state = {
    topContainerCol: "rgba(224,23,23,0.93)",
    backColor1: "rgba(255,255,255,1)",
    backColor2: "rgba(255,255,255,0)",
    date: new Date(),
    vlrLanc: "0,00",
    categoria: new Categoria(0, "Selecione", "", "category", []),
    recDesp: -1,
    showDate: false,
    showCategory: false
  };

  onChangeVlr = (vlrLanc: String) => {
    this.setState({ vlrLanc });
  };

  onSelectDate = (event: any, selectedDate: any) => {
    this.setState({ date: selectedDate, showDate: false });
  };

  onSelectCategory = (categoria: Categoria) => {
    this.setState({
      categoria: categoria,
      showCategory: false
    });
  };

  save = async () => {
    const db = await getDBConnection();
    const { date, vlrLanc, categoria } = this.state;

    const lancamento: Lancamento = {
      data: date,
      valor: Number.parseFloat(vlrLanc.replace(",", ".")),
      categoria: categoria.id,
      recDesp: this.state.recDesp
    };

    await createLancamento(db, lancamento);

    this.setState({
      date: new Date(),
      vlrLanc: "0,00",
      categoria: new Categoria(0, "Selecione", "", "category", []),
      recDesp: -1
    });

    this.props.navigation.navigate("Lancamentos");
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
            showSoftInputOnFocus={false}
            color={"#2c2c2c"}
            style={styles.textInput}
            label="Data"
            leading={props => <Icon name="calendar-today" {...props} />}
            value={Moment(this.state.date).format("DD/MM/YYYY")}
            onPressIn={() => this.setState({ showDate: true })}
            editable={false}
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

        <Modal visible={this.state.showDate}
               transparent={true}
               animationType={"slide"}>
          <DatePickerComponent value={this.state.date} styles={styles.textInput} onChage={this.onSelectDate} />
        </Modal>

        <Modal visible={this.state.showCategory}
               transparent={true}
               animationType={"slide"}>
          <CategoriasComponent onClick={this.onSelectCategory} />
        </Modal>
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

export default LancamentoView;
