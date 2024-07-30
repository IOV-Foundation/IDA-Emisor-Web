'use client'
import {useState} from "react";
import Image from "next/image";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CredentialsList from "@/app/credenciales/components/CredentialsList";
import {SnackbarProvider} from "@/context/SnackbarContext";
import {Sidebar} from "@/app/credenciales/components/Sidebar";

export default function Home() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Sidebar>
          <div className="flex flex-col min-h-screen pt-32">
            <main className="flex-grow bg-gray-50 flex flex-col items-center">
              <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-6">Listado de Licencias de Conducir pendientes de revisar</h2>
                <CredentialsList />
              </div>
            </main>
            <footer className="w-full bg-gray-500 text-white py-4 flex justify-center items-center">
              <p className="text-sm font-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>Powered By</p>
              <div className="ml-2">
                <Image
                  src="/images/logo-iovf-white.png"
                  alt="IOVF Logo"
                  width={100}
                  height={56}
                  priority
                />
              </div>
            </footer>
          </div>
        </Sidebar>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
