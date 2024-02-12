'use client'

import { InputText } from "primereact/inputtext"
import { Button } from 'primereact/button';
import { useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";
import { SuppliersService } from "../services/suppliers.service";
import { Supplier } from "../models/supplier";
import { useEffect } from "react";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";

export default function Screening({ supplier, callback }: Readonly<{ supplier?: Supplier, callback: (success: boolean) => void }>) {

    const toast = useRef<Toast>(null);

    const [highRisks, setHighRisks] = useState<string[]>(supplier?.highRisks.split(';') || []);

    const updateSupplier = () => {
        const newSupplier: Supplier = { ...supplier!, highRisks: highRisks.join(';') };
        SuppliersService.update(newSupplier).then(() => {
            callback(true);
        }
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setHighRisks([...highRisks, name]);
        } else {
            setHighRisks(highRisks.filter(risk => risk !== name));
        }
    }



    return (<>
        <Toast ref={toast} />
        {
            (highRisks.length > 1) && highRisks.map((risk, index) => {
                return <div key={index} className="p-field">
                    <h1>ola</h1>
                    <Checkbox inputId={risk} name="category" value={risk} checked={highRisks.includes(risk)} />
                    <label htmlFor={risk} className="ml-2">{risk}</label>
                </div>
            }
            )
        }
    </>);
}
