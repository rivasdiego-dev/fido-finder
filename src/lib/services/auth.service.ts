import { AxiosError } from "axios";
import axiosInstance from ".";

export async function WhoAmI(token: string): Promise<AxiosCustomResponse> {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
        const response = await axiosInstance.get("/users/me")
        return { response, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}