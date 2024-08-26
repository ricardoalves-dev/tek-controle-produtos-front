import ApiResponse from "@/models/ApiResponse";
import Produto from "@/models/Produto";

export default class ProdutoController {
  private url: string;

  constructor() {
    this.url = 'http://localhost:9000/produto';
  }

  public async create(body: Omit<Produto, 'id'>): Promise<Produto> {    
    body.preco = Number(body.preco);
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json: ApiResponse<Produto> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

  public async update(body: Produto): Promise<Produto> {
    body.preco = Number(body.preco);
    const response = await fetch(`${this.url}/${body.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json: ApiResponse<Produto> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

  public async find(): Promise<Produto[]> {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: ApiResponse<Produto[]> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

  public async findById(id: number): Promise<Produto> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: ApiResponse<Produto> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

  public async delete(id: number): Promise<Produto> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: ApiResponse<Produto> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

}