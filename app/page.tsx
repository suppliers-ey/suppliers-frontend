"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import SuppliersTable from "./components/suppliers-table";
import { logoutFirebase } from "./firebase/providers";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login", undefined);
    }
  }, []);

  const handleLogout = async () => {
    logoutFirebase();
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <>
      <div className="flex w-full justify-end mt-10">
        <Button label="Logout" onClick={handleLogout} />
      </div>
      <h1 className="h1 text-center  font-bold text-xl">Suppliers</h1>
      <SuppliersTable />
    </>
  );
}
