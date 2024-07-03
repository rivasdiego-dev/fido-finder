import { AxiosError } from "axios";
import axiosInstance from ".";

export async function getPostById(id: string): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("posts/" + id)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

export async function getPostSeenReports(id: string): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("posts/" + id + "/seen-reports")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

export async function getAllPosts(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("posts")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}