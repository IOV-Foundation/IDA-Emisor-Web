export enum CredentialStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'
}

export enum CredentialSchemaId {
  drivers_license = 'drivers_license'
}

export type RequestCredential = {
  document_url: string
  id: string
  code: string
  schema_id: CredentialSchemaId
  status: CredentialStatus
  subject_did: string
  created_at: string
}
