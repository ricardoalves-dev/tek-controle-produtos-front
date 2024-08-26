import Categoria from "./Categoria";

export default class Produto {
  public id: number;
  public nome: string;
  public descricao?: string;
  public preco: number;
  public imagem?: string;
  public categoria: Categoria;

  constructor() {
    this.id = -1;
    this.nome = '';
    this.descricao = '';
    this.preco = 0;
    this.imagem = '';
    this.categoria = new Categoria();
  }

  public static nomeRule(value: string): boolean | string {
    if(!value) {
      return 'Nome deve ser informado';
    }

    if(value.length > 30) {
      return 'Nome deve conter até 30 caracteres';
    }

    return true;
  }

  public static descricaoRule(value: string): boolean | string {
    
    if(value?.length > 100) {
      return 'Descrição deve conter até 100 caracteres';
    }

    return true;
  }

  public static precoRule(value: number): boolean | string {
    if(!value) {
      return 'Preco deve ser informado';
    }

    if(value <= 0) {
      return 'Preço deve ser um valor maior que zero';
    }

    return true;
  }

  public static imagemRule(value: string): boolean | string {
    
    if(value?.length > 100) {
      return 'URL da imagem deve conter até 100 caracteres';
    }

    return true;
  }
}