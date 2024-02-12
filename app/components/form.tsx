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

// supplier is optional, callback is called with the new supplier data
export default function Form({ supplier, callback }: Readonly<{ supplier?: Supplier, callback: (success: boolean) => void }>) {
    const [formData, setFormData] = useState({
        legalName: '',
        tradeName: '',
        taxId: '',
        phoneNumber: '',
        email: '',
        website: '',
        address: '',
        country: '',
        annualRevenue: 0,
        highRisks: '',
    });

    const toast = useRef<Toast>(null);

    // if supplier is passed, set the form data
    useEffect(() => {
        if (supplier) {
            setFormData(supplier);
        }
    }, [supplier]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRevenueChange = (e: { value: Nullable<number> }) => { // Adjusted event type
        setFormData(prevState => ({
            ...prevState,
            annualRevenue: e.value || 0 // Handle nullable value
        }));
    };

    const saveSupplier = () => {
        const newSupplier: Supplier = { "id": 0, ...formData, "lastEdited": new Date(), "highRisks": "" };
        SuppliersService.create(newSupplier).then(() => {
            callback(true);
        }
        );
    }

    const updateSupplier = () => {
        const updatedSupplier: Supplier = { "id": supplier?.id!, ...supplier, ...formData, "lastEdited": new Date(), "highRisks": "" };
        SuppliersService.update(updatedSupplier).then(() => {
            callback(true);
        }
        );
    }

    const handleSubmit = () => {
        if (!formData.legalName || !formData.tradeName || !formData.taxId || !formData.phoneNumber || !formData.email || !formData.website || !formData.address || !formData.country || !formData.annualRevenue) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields' });
            return;
        }
        if (supplier) {
            updateSupplier();
        } else {
            saveSupplier();
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-col gap-3 mb-5">
                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="legalName">Legal Name</label>
                    <InputText className="w-full" id="legalName" name="legalName" value={formData.legalName} onChange={handleInputChange} />
                </div>
                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="tradeName">Trade Name</label>
                    <InputText className="w-full" id="tradeName" name="tradeName" value={formData.tradeName} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="taxId">Tax ID</label>
                    <InputText className="w-full" id="taxId" name="taxId" value={formData.taxId} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="phoneNumber">Phone Number</label>
                    <InputText className="w-full" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="email">Email</label>
                    <InputText className="w-full" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="website">Website</label>
                    <InputText className="w-full" id="website" name="website" value={formData.website} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="address">Address</label>
                    <InputText className="w-full" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="country">Country</label>
                    <InputText className="w-full" id="country" name="country" value={formData.country} onChange={handleInputChange} />
                </div>

                <div className="flex flex-column gap-2">
                    <label className="w-1/4" htmlFor="annualRevenue">Annual Revenue</label>
                    <InputNumber className="w-full" id="annualRevenue" name="annualRevenue" value={formData.annualRevenue} onValueChange={handleRevenueChange} />
                </div>

            </div>



            <div className="flex justify-center">
                <Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </>
    );
}
