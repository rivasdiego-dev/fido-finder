import { AxiosError } from "axios";
import axiosInstance from ".";

// Chart
export async function getLostPetAmountsByDepartments(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("stats/lost-pets/departments")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

// Map
export async function getLostPetsByOneDepartment(departmentId: string): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get(`stats/lost-pets/departments/${departmentId}`)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

// Chart
export async function getLostPetAmountsByMunicipalities(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("stats/lost-pets/municipalities")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

// Map
export async function getLostPetsByOneMunicipality(municipalityId: string): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get(`stats/lost-pets/municipalities/${municipalityId}`)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}

// Chart
export async function getLostPetAmountsByCommunities(): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.get("stats/lost-pets/communities")
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}