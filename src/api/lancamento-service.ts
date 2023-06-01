import axios from "axios";
import Toast from "react-native-toast-message";
import { Lancamento } from "../model/types/Lancamento";
import { Provisao } from "../model/types/Provisao";

const instance = axios.create({
  baseURL: "http://macbook-air-de-gabriel.local:8080/api/lancamento",
  timeout: 5000
});

export async function getPrevisoes(): Promise<Array<Lancamento>> {
  let previsoes: Array<Lancamento> = [];

  await instance.get("/previsoes")
    .then(res => {
      previsoes = res.data;
    })
    .catch(err => {
      console.log(err);
      Toast.show({
        type: "error",
        text1: err.message
      });
    });

  return previsoes;
}

export async function createLancamento(lancamento: Provisao) {
  await instance.post("", lancamento)
}
