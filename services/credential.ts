import axios from './axios';
import {CredentialStatus} from "@/@types/credential";

type IdentifiableData = {
  name: string,
  lastname: string,
  category: string
}

export default {
  getCredentials: async (status: CredentialStatus) => {
    try {
      const response = await axios.get(
        '/requests',
        {
          params: {
            status
          }
        }
      );
      return response?.data?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
  manageCredential: async ({id, action, identifiable_data}: { id: string, action: 'approve' | 'reject', identifiable_data?: IdentifiableData}) => {
    try {
      const response = await axios.post(
        `/requests/${id}/action`,
        {
          action,
          identifiable_data
        }
      );
      return response?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
};
