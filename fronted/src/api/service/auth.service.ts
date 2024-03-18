import { AxiosError } from "axios";
import { axiosInstance } from "../config/axiosInstance";
import { LoginResponse, Profile } from "../../interfaces/auth.interface";

export class AuthService {
  static login = async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>("/login", {
        username,
        password,
      });
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to login");
    }
  };

  static profile = async (): Promise<Profile> => {
    try {
      const { data } = await axiosInstance.get<Profile>("/profile");
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to login");
    }
  };

  static logoutUser = async () => {
    try {
      const { data } = await axiosInstance.post("/logout", null);
      return data;
    } catch (error) {
      throw new Error("Unable to get data unauthorized");
    }
  };
}
