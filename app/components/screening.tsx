'use client'

import { useRef, useState } from "react";
import { Supplier } from "../models/supplier";
import { useEffect } from "react";
import { Toast } from "primereact/toast";
import { HighRiskService } from "../services/high-risk.service";
import { Card } from "primereact/card";
import Link from "next/link";
import { Checkbox } from "primereact/checkbox";

export default function Screening({ supplier, callback }: Readonly<{ supplier?: Supplier, callback: (success: boolean) => void }>) {
    const toast = useRef<Toast>(null);

    const [highRiskWorldBank, setHighRiskWorldBank] = useState<any[]>([]);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);

    useEffect(() => {
        if (supplier) {
            HighRiskService.getByNameFromWorldBank(supplier.legalName).then((risks) => {
                setHighRiskWorldBank(risks);
                setCheckboxStates(new Array(risks.length).fill(false));
            });
        }
    }, [supplier]);

    const handleCheck = (index: number) => (event: any) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = event.checked;
        setCheckboxStates(newCheckboxStates);
    };

    return (
        <>
            <Toast ref={toast} />
            {highRiskWorldBank.length > 0 && (
                <>
                    <Link href="https://projects.worldbank.org/en/projects-operations/procurement/debarred-firms">
                        <h3 className="h2 font-bold">World Bank Listing of Ineligible Firms and Individuals</h3>
                    </Link>
                </>
            )}
            {highRiskWorldBank.map((risk, index) => (
                <Card className="my-3" key={index}>
                    <div className="p-grid">
                        <div className="p-col">
                            <Checkbox
                                inputId={`cb${index}`}
                                onChange={handleCheck(index)} 
                                checked={checkboxStates[index]}
                            />
                        </div>
                        <div className="p-col">
                            <p>Firm Name: {risk.firm_name}</p>
                            <p>Address: {risk.address}</p>
                            <p>Country: {risk.country}</p>
                            <p>
                                Ineligibility Period: {risk.ineligibility_period.from_date} -{' '}
                                {risk.ineligibility_period.to_date}
                            </p>
                            <p>Grounds: {risk.grounds}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </>
    );
}
