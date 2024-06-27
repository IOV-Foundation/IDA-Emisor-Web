import {SubmitHandler, useForm} from "react-hook-form";
import {useCredentialMutation} from "@/hooks/mutations/credential";
import {Box, Button, Grid, TextField} from "@mui/material";
import {BaseSyntheticEvent, Dispatch, SetStateAction} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useSnackbar} from "@/context/SnackbarContext";

type FormData = {
  [key: `${string}_${'firstName'}`]: string
  [key: `${string}_${'lastName'}`]: string
  [key: `${string}_${'licenseCategory'}`]: string
}

type CredentialFormType = {
  id: string
  showForm: boolean
  setShowForm: Dispatch<SetStateAction<boolean>>
  schemaId: string
}

const CredentialForm = ({ id, showForm, setShowForm, schemaId }: CredentialFormType) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { manageCredential, isPending } = useCredentialMutation();
  const { showSnackbar } = useSnackbar();

  const acceptCredential: SubmitHandler<FormData> = (values: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    manageCredential({
      id,
      action: 'approve',
      identifiable_data: {
        name: values[`${id}_firstName`],
        lastname: values[`${id}_lastName`],
        category: values[`${id}_licenseCategory`],
      }
    }, {
      onSuccess: (data) => {
        showSnackbar("La solicitud ha sido aprobada y se emitió la credencial verificable al usuario solicitante.");
      },
      onError: () => {
        showSnackbar("No se pudo aceptar la credencial.");
      }
    });
  };

  const rejectCredential = () => {
    manageCredential({
      id,
      action: 'reject',
    }, {
      onSuccess: (data) => {
        showSnackbar("La solicitud ha sido rechazada. El usuario verá este estado en la solicitud realizada.");
      },
      onError: () => {
        showSnackbar("No se pudo rechazar la credencial.");
      }
    });
  }

  return (
    <>
      {showForm && !isPending && (
        <Box component="form" onSubmit={handleSubmit((values, event) => acceptCredential(values, event))} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Categoría"
                {...register(`${id}_licenseCategory`)}
                error={!!errors[`${id}_licenseCategory`]}
                helperText={errors[`${id}_licenseCategory`] ? 'Este campo es obligatorio' : ''}
              />
            </Grid>
          </Grid>
          <Button variant="contained" className="!my-3 w-full" type="submit">Aprobar</Button>
        </Box>
      )}
      {!showForm && !isPending && <Button variant="contained" className="!mb-3 !bg-green-700" onClick={() => setShowForm(true)}>Aprobar</Button>}
      {!isPending && <Button variant="contained" className="!bg-orange-700 hover:bg-grey-700" onClick={rejectCredential}>Rechazar</Button>}
      {isPending && <CircularProgress sx={{ margin: '0 auto' }} />}
    </>
  );
}

export { CredentialForm }
