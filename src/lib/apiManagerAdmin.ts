import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface UserData {
    access_token: string;
    refreshToken: string;
    // Add other user data properties if they exist
}

interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
}

interface RequestOptions {
    method: string;
    path: string;
    requestBody?: any;
    header?: Record<string, string>;
    hideUserId?: boolean;
    isFormData?: boolean;
}

const baseUrl: string = import.meta.env.VITE_BASE_URL as string;

const api = axios.create({
    baseURL: baseUrl,
});

const refreshToken = async (): Promise<string | null> => {
    try {
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
            return null;
        }

        const userData: UserData = JSON.parse(userDataString);
        const response = await api.post("/RefreshToken", {
            Token: userData.refreshToken,
        });

        if (response.status === 200) {
            const newToken = response.data.data.token; // Assuming the new token is in the response
            const newRefreshToken = response.data.data.refreshToken;
            const updatedUserData: UserData = {
                ...userData,
                token: newToken,
                refreshToken: newRefreshToken,
            };
            localStorage.setItem("userData", JSON.stringify(updatedUserData));
            return newToken;
        }
        return null;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// Request interceptor to add Authorization header
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
        const profileDataString = localStorage.getItem("adminToken");
        if (profileDataString) {
            const profileData: UserData = JSON.parse(profileDataString);
            const token = profileData?.access_token;
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and retry request
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin";
        }
        return Promise.reject(error);
    }
);

export const request = async <T = any>({
                                           method,
                                           path,
                                           requestBody = {},
                                           header = {},
                                       }: RequestOptions): Promise<ApiResponse<T>> => {
    try {
        let response;
        const headers = {
            "Content-Type": "application/json",
            ...header,
        };

        switch (method) {
            case "get":
                response = await api.get(path, {
                    headers: headers,
                });
                break;
            case "post":
                response = await api.post(
                    path,
                    requestBody,
                    {
                        headers: headers,
                    }
                );
                break;
            case "put":
                response = await api.put(path, requestBody, {
                    headers: headers,
                });
                break;
            case "delete":
                response = await api.delete(path, {
                    headers: headers,
                });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        console.log(response?.data);
        return response?.data;
    } catch (error) {
        let errorMessage = "";
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            console.log("Error data:", axiosError.response.data);
            const responseData = axiosError.response.data as { status?: number; message?: string };
            errorMessage =  responseData.message || "An error occurred";
        } else if (axiosError.request) {
            console.log("Error request:", axiosError.request);
        } else {
            console.log("Error message:", axiosError.message);
        }

        throw new Error(errorMessage);
    }
};

