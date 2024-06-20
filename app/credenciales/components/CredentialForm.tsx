import {SubmitHandler, useForm} from "react-hook-form";
import {useCredentialMutation} from "@/hooks/mutations/credential";
import {Box, Button, Grid, TextField} from "@mui/material";
import {BaseSyntheticEvent, Dispatch, SetStateAction} from "react";
import CircularProgress from '@mui/material/CircularProgress';

type FormData = {
  [key: `${string}_${'firstName'}`]: string
  [key: `${string}_${'lastName'}`]: string
  [key: `${string}_${'licenseCategory'}`]: string
}

type CredentialFormType = {
  id: string
  showForm: boolean
  setShowForm:  Dispatch<SetStateAction<boolean>>
  schemaId: string
}

const CredentialForm = ({ id, showForm, setShowForm, schemaId }: CredentialFormType) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { manageCredential, isPending } = useCredentialMutation();

  const acceptCredential: SubmitHandler<FormData> = (values: FormData, event:  BaseSyntheticEvent<object, any, any> | undefined) => {
    manageCredential({
      id,
      action: 'approve',
      identifiable_data: {
        name: values[`${id}_firstName`],
        lastname: values[`${id}_lastName`],
        category: schemaId,
      }
    })
  };

  const rejectCredential: SubmitHandler<FormData> = (values: FormData) => {
    manageCredential({
      id,
      action: 'reject',
    })
  }

  return (
    <>
      {showForm && !isPending && (
        <Box component="form" onSubmit={handleSubmit((values, event) => acceptCredential(values, event))} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de Pila"
                {...register(`${id}_firstName`)}
                error={!!errors[`${id}_firstName`]}
                helperText={errors[`${id}_firstName`] ? 'Este campo es obligatorio' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                {...register(`${id}_lastName`)}
                error={!!errors[`${id}_lastName`]}
                helperText={errors[`${id}_lastName`] ? 'Este campo es obligatorio' : ''}
              />
            </Grid>
          </Grid>
          <Button variant="contained" className="!my-3 w-full" type="submit">Entregar</Button>
        </Box>
      )}
      {!showForm && !isPending &&<Button variant="contained" className="!mb-3" onClick={() => setShowForm(true)}>Ok</Button>}
      {!isPending && <Button variant="contained" className="!bg-red-500 hover:bg-red-500" onClick={rejectCredential}>Rechazar</Button>}
      {isPending && <CircularProgress sx={{margin: '0 auto'}} />}
    </>
  );
}

export {CredentialForm}
