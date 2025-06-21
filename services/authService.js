import { apiEndpoints, Service } from "../constants/appContants";
import { getApiClient } from "../utils/axiosClient";

export const authenticateUser = async userCred => {
  const apiClient = getApiClient({ auth: false, service: Service.AUTH });
  const response = await apiClient.post(apiEndpoints.LOGIN_URL, userCred);
  return response.data;
};

export const registerUser = async (userDetails) => {
    const apiClient = getApiClient({ auth: false, service: Service.AUTH });
    const response = await apiClient.post(apiEndpoints.REGISTER_URL, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
    });
    return response.data;
};