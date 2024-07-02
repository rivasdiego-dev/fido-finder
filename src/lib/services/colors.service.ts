import { AxiosError } from "axios";
import axiosInstance from ".";

export async function getAllColors(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("colors")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}