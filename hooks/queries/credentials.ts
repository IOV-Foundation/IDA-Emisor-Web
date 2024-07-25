import {CREDENTIAL_QUERY_KEYS} from '@/constants/queryKeys/credential';
import credential from '@/services/credential';
import {useQuery} from '@tanstack/react-query';
import {CredentialSchemaId, CredentialStatus} from "@/@types/credential";

const useCredentialsQuery = ({status, schema_id}: {status: CredentialStatus, schema_id: CredentialSchemaId}
) => {
  const credentials = useQuery({
    queryKey: [CREDENTIAL_QUERY_KEYS.GET_CREDENTIALS, status, schema_id],
    queryFn: () => credential.getCredentials(status, schema_id),
  });

  return { ...credentials, credentials: credentials.data };
};

export { useCredentialsQuery };
