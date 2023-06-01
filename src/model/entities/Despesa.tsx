export class Despesa {
  data: Date
  valor: number

  constructor(data: Date, valor: number, categoria: Number) {
    this.data = data;
    this.valor = valor;
  }
}
