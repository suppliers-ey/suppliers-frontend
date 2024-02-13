import axios from "axios";
import { Supplier } from "../models/supplier";

export class HighRiskService {
    private static readonly url = process.env.NEXT_PUBLIC_HIGH_RISK_API_URL;

    public static async getAllFromWorldBank(): Promise<any[]> {
        const response = await axios.get<any[]>(`${this.url}/debarred-firms`);
        return response.data;
    }
    public static async getByNameFromWorldBank(name: string): Promise<any[]> {
        const response = await axios.get<HighRiskProps>(`${this.url}/worldbank/${name}`);
        if (response.data.results) {
            return response.data.results;
        }
        return [];
    }

    public static async getByNameFromOffshoreLeaks(name: string): Promise<any[]> {
        const response = await axios.get<any[]>(`${this.url}/offshore-leaks/${name}`);
        return response.data;
    }
}
