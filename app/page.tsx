'use client'
import {useState} from "react";
import Image from "next/image";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography} from '@mui/material';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SubmitHandler, useForm} from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  licenseCategory: string;
  expirationDate: string;
}

export default function Home() {
  const { register, handleSubmit,  formState: { errors } } = useForm<FormData>();
  const [showForm, setShowForm] = useState(false);
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

  const onSubmit: SubmitHandler<FormData> = data => {
    // mutation.mutate(data);
    console.log('submit', data);
  };


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
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon/>}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Solicitud 1</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col max-w-xl">
              <Typography variant="h5">
                Detalle de la Solicitud
              </Typography>
              <Typography variant="h6">
                Usuario: John Doe
              </Typography>
              <Image src="/images/id.png" width={500} height={320} alt="document" className="my-4"/>
              {showForm && <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de Pila"
                      {...register('firstName', { required: true })}
                      error={!!errors.firstName}
                      helperText={errors.firstName ? 'Este campo es obligatorio' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      {...register('lastName', { required: true })}
                      error={!!errors.lastName}
                      helperText={errors.lastName ? 'Este campo es obligatorio' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Categoría de Licencia"
                      {...register('licenseCategory', { required: true })}
                      error={!!errors.licenseCategory}
                      helperText={errors.licenseCategory ? 'Este campo es obligatorio' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha de Caducidad"
                      InputLabelProps={{ shrink: true }}
                      {...register('expirationDate', { required: true })}
                      error={!!errors.expirationDate}
                      helperText={errors.expirationDate ? 'Este campo es obligatorio' : ''}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" className="my-3 w-full" type="submit">Entregar</Button>
              </Box>}
              {!showForm && <Button variant="contained" className="mb-3" onClick={() => setShowForm(true)}>Ok</Button>}
              <Button variant="contained" className="bg-red-500 hover:bg-red-500">Rechazar</Button>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
    </QueryClientProvider>
  );
}
