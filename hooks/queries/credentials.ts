import {CREDENTIAL_QUERY_KEYS} from '@/constants/queryKeys/credential';
import credential from '@/services/credential';
import {useQuery} from '@tanstack/react-query';

const useCredentialsQuery = (
) => {
  const credentials = useQuery({
    queryKey: [CREDENTIAL_QUERY_KEYS.GET_CREDENTIALS],
    queryFn: credential.getCredentials,
  });

  return { ...credentials, credentials: credentials.data };
};

export { useCredentialsQuery };
