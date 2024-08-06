import {
  Box,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useCredentialsQuery} from "@/hooks/queries/credentials";
import {CredentialSchemaId, CredentialStatus, RequestCredential} from "@/@types/credential";
import {CredentialForm} from "@/app/credenciales/components/CredentialForm";
import Image from "next/image";
import dayjs from "dayjs";
import {useSnackbar} from "@/context/SnackbarContext";

const STATUSES = {
  [CredentialStatus.pending]: 'Pendiente',
  [CredentialStatus.approved]: 'Aprobada',
  [CredentialStatus.rejected]: 'Rechazada',
};

const Schemas = {
  [CredentialSchemaId.drivers_license]: 'Driver license'
};

function Row({ credential }: { credential: RequestCredential }) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{dayjs(credential.created_at).format('DD/MM/YYYY')}</TableCell>
        <TableCell>{`#${credential.code}`}</TableCell>
        <TableCell>{STATUSES[credential.status]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Image src={`https://identity-api.mangofield-2f4eea69.brazilsouth.azurecontainerapps.io/${credential.document_url}`} width={500} height={320} alt="Imagen de la prueba de identidad" className="my-4" />
              {credential.status === CredentialStatus.pending && <CredentialForm id={credential.id} schemaId={credential.schema_id} showForm={showForm} setShowForm={setShowForm} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CredentialsList() {
  const [selectedStatus, setSelectedStatus] = useState<CredentialStatus>(CredentialStatus.pending);
  const [selectedSchemaId, setSelectedSchemaId] = useState<CredentialSchemaId>(CredentialSchemaId.drivers_license);
  const { credentials, error } = useCredentialsQuery({ status: selectedStatus, schema_id: selectedSchemaId });
  const { showSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (error && typeof error === 'string') {
      showSnackbar(error);
    }
  }, [error]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as CredentialStatus);
  };

  const handleSchemaIdChange = (event: SelectChangeEvent<string>) => {
    setSelectedSchemaId(event.target.value as CredentialSchemaId);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedCredentials = credentials?.sort((a: RequestCredential, b: RequestCredential) =>
    dayjs(b.created_at).unix() - dayjs(a.created_at).unix()
  );

  const paginatedCredentials = sortedCredentials?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: '250px 250px' }}>
        <FormControl fullWidth className="flex mb-10" variant="outlined" margin="normal">
          <InputLabel id="status-filter-label">Filtrar por Estado</InputLabel>
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
        <FormControl fullWidth className="flex mb-10" variant="outlined" margin="normal">
          <InputLabel id="type-filter-label">Filtrar por Tipo</InputLabel>
          <Select
            className="w-52"
            labelId="type-filter-label"
            value={selectedSchemaId}
            onChange={handleSchemaIdChange}
            label="Filtrar por tipo"
          >
            <MenuItem value={CredentialSchemaId.drivers_license}>{Schemas[CredentialSchemaId.drivers_license]}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {sortedCredentials?.length === 0 && <Typography variant="h5" className="text-black">No se encontraron credenciales.</Typography>}
      <TableContainer component={Paper} className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Creado en</TableCell>
              <TableCell>Solicitud de Credencial</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCredentials?.map((credential: RequestCredential) => (
              <Row key={credential.id} credential={credential} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedCredentials?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
