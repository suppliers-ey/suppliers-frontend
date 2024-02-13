import axios from "axios";
import { Supplier } from "../models/supplier";

export class SuppliersService {
    private static readonly url = "http://191.233.26.17:5112/api/Suppliers";

    public static async getAll(): Promise<Supplier[]> {
        const response = await axios.get<Supplier[]>(this.url);
        return response.data;
    }

    public static async getById(id: number): Promise<Supplier> {
        const response = await axios.get<Supplier>(`${this.url}/${id}`);
        return response.data;
    }

    public static async create(supplier: Supplier): Promise<Supplier> {
        const response = await axios.post<Supplier>(this.url, supplier);
        return response.data;
    }

    public static async update(supplier: Supplier): Promise<void> {
        await axios.put<Supplier>(`${this.url}/${supplier.id}`, supplier);
        console.log(supplier);
    }

    public static async delete(id: number): Promise<void> {
        await axios.delete(`${this.url}/${id}`);
    }
}
