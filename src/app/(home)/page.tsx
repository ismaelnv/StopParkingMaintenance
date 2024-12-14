'use client'

import { Login } from "@/components/home/Login";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user'); // Verifica si hay un token en localStorage

    if (isAuthenticated) {
      router.replace('/general'); // Redirige al home si ya está autenticado
    }
  }, []);
  
  return (
    <main >
      <Login/>
    </main>
  );
}