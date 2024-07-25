import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useCredentialMutation} from "@/hooks/mutations/credential";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";
import {BaseSyntheticEvent, Dispatch, SetStateAction} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useSnackbar} from "@/context/SnackbarContext";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from "dayjs";

type FormData = {
  [key: `${string}_${'firstName'}`]: string
  [key: `${string}_${'lastName'}`]: string
  [key: `${string}_${'licenseCategory'}`]: string
  [key: `${string}_${'expirationDate'}`]: Dayjs
}

type CredentialFormType = {
  id: string
  showForm: boolean
  setShowForm: Dispatch<SetStateAction<boolean>>
  schemaId: string
}

const textValidation = {
  required: 'Este campo es obligatorio',
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: 'Solo se permiten letras y espacios',
  },
  maxLength: {
    value: 40,
    message: 'No puede exceder los 40 caracteres',
  },
}

const CredentialForm = ({ id, showForm, setShowForm, schemaId }: CredentialFormType) => {
  const { control, register, handleSubmit, formState: { errors , isValid} } = useForm<FormData>();
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
      },
      exp_date: values[`${id}_expirationDate`],
    }, {
      onSuccess: (data) => {
        showSnackbar("La solicitud ha sido aprobada y se emitió la credencial verificable al usuario solicitante.");
      },
      onError: (error) => {
        if (typeof error === "string") {
          showSnackbar(error);
        }
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
                {...register(`${id}_firstName`, textValidation)}
                error={!!errors[`${id}_firstName`]}
                helperText={errors[`${id}_firstName`] ? errors[`${id}_firstName`]?.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                {...register(`${id}_lastName`, textValidation)}
                error={!!errors[`${id}_lastName`]}
                helperText={errors[`${id}_lastName`] ? errors[`${id}_lastName`]?.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Categoría"
                {...register(`${id}_licenseCategory`, { required: 'Este campo es obligatorio' })}
                error={!!errors[`${id}_licenseCategory`]}
                helperText={errors[`${id}_licenseCategory`] ? errors[`${id}_licenseCategory`]?.message : ''}
              >
                <MenuItem value="Ciclomotores y motocicletas">Ciclomotores y motocicletas</MenuItem>
                <MenuItem value="Automóviles">Automóviles</MenuItem>
                <MenuItem value="Camiones">Camiones</MenuItem>
                <MenuItem value="Automóviles para transporte de pasajeros">Automóviles para transporte de pasajeros</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  rules={{required: {value: true, message: 'Este campo es obligatorio'}}}
                  name={`${id}_expirationDate`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="Fecha de Expiración"
                      {...field}
                      inputRef={field.ref}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="w-full"
                      slotProps={{
                        textField: {
                          error: !!errors[`${id}_expirationDate`],
                          helperText: errors[`${id}_expirationDate`]?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button variant="contained" className="!my-3 w-full" type="submit" disabled={!isValid}>Aprobar</Button>
        </Box>
      )}
      {!showForm && !isPending && <Button variant="contained" className="!mb-3 !bg-green-700" onClick={() => setShowForm(true)}>Aprobar</Button>}
      {!isPending && <Button variant="contained" className="!bg-orange-700 hover:bg-grey-700" onClick={rejectCredential}>Rechazar</Button>}
      {isPending && <CircularProgress sx={{ margin: '0 auto' }} />}
    </>
  );
}

export { CredentialForm }
