'use client'
import {useState} from "react";
import Image from "next/image";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CredentialsForm from "@/app/credenciales/page";

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
      <main className="bg-white min-h-screen">
        <header className="z-10 h-[73px]">
          <div className="fixed left-0 top-0 w-full flex justify-center border-b border-gray-300 bg-white z-50">
            <Image
              src="/images/logo-iovf.png"
              alt="Vercel Logo"
              width={128}
              height={72}
              priority
            />
          </div>
        </header>
        <div className="w-full mt-10 px-3">
          <CredentialsForm />
        </div>
      </main>
    </QueryClientProvider>
  );
}
