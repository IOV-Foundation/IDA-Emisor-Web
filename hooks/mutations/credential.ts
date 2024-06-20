import {useMutation, useQueryClient} from '@tanstack/react-query';
import credentialApi from '@/services/credential';
import {CREDENTIAL_QUERY_KEYS} from "@/constants/queryKeys/credential";

const useCredentialMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: credentialApi.manageCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CREDENTIAL_QUERY_KEYS.GET_CREDENTIALS]
      });
    },
  });

  return { manageCredential: mutate, ...rest };
};

export { useCredentialMutation };
