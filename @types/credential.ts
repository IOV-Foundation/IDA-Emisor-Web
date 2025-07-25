export enum CredentialStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'
}

export type RequestCredential = {
  document_url: string
  id: string
  code: string
  schema_id: string
  status: CredentialStatus
  subject_did: string
  created_at: string
}
