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

export async function updateUser(data: { name: string, lastname: string, dob?: string, phone_number?: string }): Promise<AxiosCustomResponse> {

  let dateOfBirth: Date | undefined;

  if (data.dob) dateOfBirth = new Date(data.dob)

  try {
    const res = await axiosInstance.patch('users', {
      name: data.name,
      lastname: data.lastname,
      dob: dateOfBirth,
      phone_number: data.phone_number
    });
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}

export async function updateUserResidence(data: { lon: number, lat: number }): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.patch('users/residence', data);
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}

export async function deleteUserResidence(): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.delete('users/residence');
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}

export async function setUsersLocation(location: { lon: number, lat: number }): Promise<AxiosCustomResponse> {
  try {
    const res = await axiosInstance.patch('users/location', location);
    return { response: res, isError: false };
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError)
      return { response: error.response, isError: true };
    return { response: error, isError: true };
  }
}
