import { AxiosError } from 'axios';
import axiosInstance from '.';

export async function getOneUser(id: string): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.get('users/find/' + id);
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}
