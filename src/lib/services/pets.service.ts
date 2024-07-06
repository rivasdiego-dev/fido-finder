import { AxiosError } from 'axios';
import axiosInstance from '.';

export async function CreatePet(
  formData: FormData
): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.post('pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}
export async function editPet(
  id: string,
  formData: FormData
): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.patch('pets/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}

export async function getOwnedPets(): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.get('pets/own');
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}

export async function getOnePet(id: string): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.get('pets/' + id);
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}
