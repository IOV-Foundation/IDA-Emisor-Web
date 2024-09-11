import axios from './axios';
import {CredentialStatus} from "@/@types/credential";
import {Dayjs} from "dayjs";
import {isAxiosError} from 'axios';

type IdentifiableData = {
  name: string,
  lastname: string,
  category: string,
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ErrorResponse {
  message: string;
}

export default {
  getCredentials: async (status: CredentialStatus) => {
    try {
      const response: ApiResponse<any> = await axios.get('/requests', {
        params: { status },
      });
      return response?.data?.data;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        //Axios specific errors
        const error: ErrorResponse = e.response?.data;
        console.error('API Error:', error.message);
        throw new Error(error.message || 'An unexpected error occurred.');
      } else {
        //unexpected errors
        console.error('Unexpected Error:', e);
        throw new Error('An unexpected error occurred.');
      }
    }
  },
  manageCredential: async ({id, action, exp_date, identifiable_data}: { id: string, action: 'approve' | 'reject', exp_date?: Dayjs, identifiable_data?: IdentifiableData}) => {
    try {
      const response: ApiResponse<any> = await axios.post(
        `/requests/${id}/action`,
        {
          action,
          identifiable_data,
          exp_date,
        }
      );
      return response?.data;
    } catch (e: unknown) {
      // @ts-ignore
      if (isAxiosError(e)) {
        //Axios specific errors
        const error: ErrorResponse = e.response?.data;
        console.error('API Error:', error.message);
        throw new Error(error.message || 'An unexpected error occurred.');
      } else {
        //unexpected errors
        console.error('Unexpected Error:', e);
        throw new Error('An unexpected error occurred.');
      }
    }
  },
};
