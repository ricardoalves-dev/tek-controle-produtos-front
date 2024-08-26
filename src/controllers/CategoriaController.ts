import ApiResponse from "@/models/ApiResponse";
import Categoria from "@/models/Categoria";

export default class CategoriaController {
  private url: string;

  constructor() {
    this.url = 'http://localhost:9000/categoria';
  }


  public async create(body: Omit<Categoria, 'id'>): Promise<Categoria> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });    
    
    const json: ApiResponse<Categoria> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    }    
  }

  public async update(body: Categoria): Promise<Categoria> {
    const response = await fetch(`${this.url}/${body.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json: ApiResponse<Categoria> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    }     
  }

  public async find(): Promise<Categoria[]> {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });    

    const json: ApiResponse<Categoria[]> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    } 
  }

  public async findById(id: number): Promise<Categoria> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: ApiResponse<Categoria> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    }  
  }

  public async delete(id: number): Promise<Categoria> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json: ApiResponse<Categoria> = await response.json();

    if(response.ok) {      
      return (json.data);
    }
    else {      
      throw new Error(json.error);
    }   
  }
}