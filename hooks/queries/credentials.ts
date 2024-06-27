import {CREDENTIAL_QUERY_KEYS} from '@/constants/queryKeys/credential';
import credential from '@/services/credential';
import {useQuery} from '@tanstack/react-query';
import {CredentialStatus} from "@/@types/credential";

const useCredentialsQuery = ({status}: {status: CredentialStatus}
) => {
  const credentials = useQuery({
    queryKey: [CREDENTIAL_QUERY_KEYS.GET_CREDENTIALS, status],
    queryFn: () => credential.getCredentials(status),
  });

  return { ...credentials, credentials: credentials.data };
};

export { useCredentialsQuery };
