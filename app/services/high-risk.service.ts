import axios from "axios";
import { Supplier } from "../models/supplier";

export class HighRiskService {
    private static readonly url = process.env.NEXT_PUBLIC_HIGH_RISK_API_URL;

    public static async getAllFromWorldBank(): Promise<any[]> {
        const response = await axios.get<any[]>(`${this.url}/debarred-firms`);
        return response.data;
    }

    public static async getByNameFromWorldBank(name: string): Promise<any[]> {
        const response = await axios.get<any[]>(`${this.url}/debarred-firms/${name}`);
        return response.data;
    }

    public static async getByNameFromOffshoreLeaks(name: string): Promise<any[]> {
        const response = await axios.get<any[]>(`${this.url}/offshore-leaks/${name}`);
        return response.data;
    }
}
