'use client'

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Footer from "./components/footer";
import SuppliersTable from "./components/suppliers-table";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import Form from "./components/form";
import { Toast } from "primereact/toast";

export default function Home() {



  return (
    <>
      <h1 className="h1 text-center m-10 font-bold text-xl">Suppliers</h1>

      <SuppliersTable />
    </>
  );
}
