'use client'
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { SuppliersService } from "../services/suppliers.service"
import { Supplier } from "../models/supplier"
import { Button } from 'primereact/button'; // Import Button component from PrimeReact
import { useState, useEffect, use, useRef } from "react"
import { Toast } from "primereact/toast"
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import Form from "./form"
import { Dialog } from "primereact/dialog"
import Screening from "./screening"
import Link from "next/link"

export default function SuppliersTable() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [formDialogVisible, setDialogVisible] = useState(false);
    const [screeningDialogVisible, setScreeningDialogVisible] = useState(false);
    const [createDialogVisible, setCreateDialogVisible] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState<Supplier>();


    useEffect(() => {
        SuppliersService.getAll().then(data => {
            setSuppliers(data);
        });
    }, []);

    const toast = useRef<Toast>(null);

    const editSupplier = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setDialogVisible(true);
    }

    const deleteSupplier = (id: number) => {
        SuppliersService.delete(id).then(() => {
            setSuppliers(suppliers.filter(s => s.id !== id)); // Update state after deleting supplier
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Supplier deleted successfully' });
        }
        );
    }

    const openScreening = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setScreeningDialogVisible(true);
    }

    const confirmDelete = (id: number) => {
        console.log(`Delete supplier with id ${id}`);
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => deleteSupplier(id),
            reject: () => {
                toast.current?.show({ severity: 'info', summary: 'Info', detail: 'The record is not deleted' });
            }
        });
    }
    const callback = (success: boolean) => {
        setDialogVisible(false);
        SuppliersService.getAll().then(data => {
            setSuppliers(data);
            console.log(data);
        });
        if (success) {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Operation completed successfully' });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error registering or updating supplier' });
        }
    }


    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog header="Register Supplier" visible={createDialogVisible} style={{ width: '50vw' }} onHide={() => setDialogVisible(false)}>
                <Form callback={callback} />
            </Dialog>
            <Dialog header="Register Supplier" visible={formDialogVisible} style={{ width: '50vw' }} onHide={() => setDialogVisible(false)}>
                <Form callback={callback} supplier={selectedSupplier} />
            </Dialog>

            <Dialog header="Screening" visible={screeningDialogVisible} style={{ width: '50vw' }} onHide={() => setScreeningDialogVisible(false)}>
                <Screening supplier={selectedSupplier} callback={callback} />
            </Dialog>

            <Button className="my-5 mx-3" label="Add supplier" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />

            <DataTable className="mx-3" value={suppliers} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="tradeName" header="Trade Name" ></Column>
                <Column field="phoneNumber" header="Phone Number" ></Column>
                <Column field="email" header="Email" ></Column>
                <Column className="truncate text-ellipsis overflow-hidden  max-w-56"
                    field="website"
                    header="Website"
                    body={(rowData) => <Link href={rowData.website} passHref={true}>{rowData.website}</Link>}
                />
                <Column field="country" header="Country" ></Column>
                <Column field="annualRevenue" header="Annual Revenue"></Column>
                <Column field="lastEdited" header="Last Edited" sortable body={(rowData: any) => (
                    <div>{new Date(rowData.lastEdited).toLocaleDateString()}</div>
                )}></Column>
                <Column field="highRisks" header="Screening" body={(rowData: any) => (
                    <Button icon="pi pi-eye" className="mx-auto p-button-rounded w-8 h-8 p-button-success p-mr-2 bg-blue-950 border-blue-950" onClick={() => openScreening(rowData)} />
                )}></Column>
                <Column header="Actions" headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }} body={(rowData: any) => (
                    <div className="flex gap-2">
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editSupplier(rowData)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData.id)} />
                    </div>
                )}></Column>
            </DataTable>
        </>
    );
}
