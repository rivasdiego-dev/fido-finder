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

export async function getMyPosts(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("posts/own")
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

type createPostBody = {
    pet_id: string;
    details: string;
    lost_in: {
        lat: number;
        lon: number;
    };
}

export async function getPostsAround(lat: number, lon: number): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.post("posts/around-me", { lat, lon })
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

export async function createPost(data: createPostBody): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.post("posts", data)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

export async function createSeenReport(postId: string, data: { lat: number, lon: number }): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.post("posts/" + postId + "/seen-reports", data)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}