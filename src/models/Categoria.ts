export default class Categoria {
  public id: number;
  public descricao: string;

  constructor() {
    this.id = -1;
    this.descricao = '';
  }  

  public static descricaoRule(value: string): boolean | string {
    if(!value) {
      return 'Descrição deve ser informada';
    }

    if(value.length > 30) {
      return 'Descrição deve conter até 30 caracteres';
    }

    return true;
  }
}