'use client'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useState} from "react";
import {useCredentialsQuery} from "@/hooks/queries/credentials";
import {CredentialStatus, RequestCredential} from "@/@types/credential";
import {CredentialForm} from "@/app/credenciales/components/CredentialForm";
import Image from "next/image";
import dayjs from "dayjs";

const STATUSES = {
  [CredentialStatus.pending]: 'Pendiente',
  [CredentialStatus.approved]: 'Aprobada',
  [CredentialStatus.rejected]: 'Rechazada',
}

export default function CredentialsList() {
  const [selectedStatus, setSelectedStatus] = useState<CredentialStatus>(CredentialStatus.pending);
  const { credentials } = useCredentialsQuery({status: selectedStatus});
  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as CredentialStatus);
  };

  const sortedCredentials = credentials?.slice().sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf());


  return (
    <>
      <FormControl fullWidth className="flex mb-10" variant="outlined" margin="normal">
        <InputLabel id="status-filter-label">Filter by Status</InputLabel>
        <Select
          className="w-52"
          labelId="status-filter-label"
          value={selectedStatus}
          onChange={handleStatusChange}
          label="Filtrar por estado"
        >
          <MenuItem value={CredentialStatus.pending}>{STATUSES[CredentialStatus.pending]}</MenuItem>
          <MenuItem value={CredentialStatus.approved}>{STATUSES[CredentialStatus.approved]}</MenuItem>
          <MenuItem value={CredentialStatus.rejected}>{STATUSES[CredentialStatus.rejected]}</MenuItem>
        </Select>
      </FormControl>
      {sortedCredentials?.length === 0 && <Typography variant="h5" className="text-black">No se encontraron credenciales.</Typography>}
      {sortedCredentials?.map(({ id, status, document_url, schema_id, created_at, code }: RequestCredential, index: number) => (
        <Accordion className="mb-3" key={id}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Solicitud de Credencial #{code}</Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col max-w-xl">
            <Typography variant="h6">
              Estado: {STATUSES[status]}
            </Typography>
            <Typography variant="h6">
              Creado en: {dayjs(created_at).format('DD/MM/YYYY')}
            </Typography>
            <Image src={`https://identity-api.mangofield-2f4eea69.brazilsouth.azurecontainerapps.io/${document_url}`} width={500} height={320} alt="Imagen de la prueba de identidad" className="my-4" />
            {status === CredentialStatus.pending && <CredentialForm id={id} schemaId={schema_id} showForm={showForm} setShowForm={setShowForm} />}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
