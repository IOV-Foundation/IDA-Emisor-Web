'use client'
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useState} from "react";
import {useCredentialsQuery} from "@/hooks/queries/credentials";
import {CredentialStatus, RequestCredential} from "@/@types/credential";
import {CredentialForm} from "@/app/credenciales/components/CredentialForm";
import Image from "next/image";

const STATUSES = {
  [CredentialStatus.pending] : 'Pendiente',
  [CredentialStatus.approved] : 'Aprobada',
  [CredentialStatus.rejected] : 'Rechazada',
}

export default function CredentialsForm() {
  const { credentials } = useCredentialsQuery();
  const [showForm, setShowForm] = useState(false);

  return credentials?.map(({ id, status, document_url, schema_id }: RequestCredential, index: number) => (
    <Accordion className="mb-3" key={id}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Solicitud de Credencial  #{index + 1}</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col max-w-xl">
        <Typography variant="h6">
          Estado: {STATUSES[status]}
        </Typography>
        <Image src={`https://identity-api.mangofield-2f4eea69.brazilsouth.azurecontainerapps.io/${document_url}`} width={500} height={320} alt="Imagen de la prueba de identidad" className="my-4"/>
        <CredentialForm id={id} schemaId={schema_id} showForm={showForm} setShowForm={setShowForm} />
      </AccordionDetails>
    </Accordion>
  ));
}
