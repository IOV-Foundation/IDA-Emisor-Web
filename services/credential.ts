import axios from './axios';

type IdentifiableData = {
  name: string,
  lastname: string,
  category: string
}

export default {
  getCredentials: async () => {
    try {
      const response = await axios.get(
        '/requests?status=pending',
      );
      return response?.data?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
  manageCredential: async ({id, action, identifiable_data}: { id: string, action: 'approve' | 'reject', identifiable_data: IdentifiableData}) => {
    try {
      const response = await axios.post(
        `/requests/${id}/action`,
        {
          action,
          identifiable_data
        }
      );
      return response?.data?.data;
    } catch (e: unknown) {
      // @ts-ignore
      throw e?.message;
    }
  },
};
