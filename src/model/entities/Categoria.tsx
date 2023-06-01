import { Despesa } from "./Despesa";
import { formatCurrency } from "../../utils/NumberUtils";

export class Categoria {

  id: number;
  name: string;
  color: string;
  icone: string;
  total?: number = 0.0;
  totalPattern?: String = formatCurrency(0);
  despesas: Array<Despesa>;

  legendFontColor?: String = "#7F7F7F";
  legendFontSize?: Number = 14;


  constructor(id: number, name: string, color: string, icone: string, despesas: Array<Despesa>) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icone = icone;
    this.despesas = despesas;
  }
}

export function getCategoriaById(id: number) {
  const categorias = getCategorias();

  return categorias.filter(c => c.id == id)[0];
}

export function getCategorias() {
  const cat1 = new Categoria(1, "Uber", "#e01717", "local-taxi", []);
  const cat2 = new Categoria(2, "Mercado", "rgb(36,171,64)", "shopping-cart", []);
  const cat3 = new Categoria(3, "Diversão", "rgb(52,93,201)", "liquor", []);
  const cat4 = new Categoria(4, "Cartao de Crédito", "#d2d01d", "credit-card", []);
  const cat5 = new Categoria(5, "Prestação de Serviço", "#620fc9", "work", []);
  const cat6 = new Categoria(6, "Investimentos", "#3b5c98", "bar-chart", []);
  const cat7 = new Categoria(7, "Depesas Casa", "#c54410", "home", []);
  const cat8 = new Categoria(8, "Outros", "#4d7dff", "language", []);
  const cat9 = new Categoria(9, "Estudos", "#a8cf45", "school", []);
  const cat10 = new Categoria(10, "Aposta", "#983b3b", "casino", []);
  const cat11 = new Categoria(11, "Custo Empresa", "#a3b1be", "work", []);

  return [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11];
}
