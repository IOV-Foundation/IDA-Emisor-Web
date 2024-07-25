import axios from './axios';
import {CredentialSchemaId, CredentialStatus} from "@/@types/credential";
import {Dayjs} from "dayjs";

type IdentifiableData = {
  name: string,
  lastname: string,
  category: string,
}

export default {
  getCredentials: async (status: CredentialStatus, schema_id: CredentialSchemaId) => {
    try {
      const response = await axios.get(
        '/requests',
        {
          params: {
            status,
            schema_id
          }
        }
      );
      return response?.data?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
  manageCredential: async ({id, action, exp_date, identifiable_data}: { id: string, action: 'approve' | 'reject', exp_date?: Dayjs, identifiable_data?: IdentifiableData}) => {
    try {
      const response = await axios.post(
        `/requests/${id}/action`,
        {
          action,
          identifiable_data,
          exp_date
        }
      );
      return response?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
};
