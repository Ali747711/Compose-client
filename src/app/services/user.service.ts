import { serverURL } from "../../libs/configs";
import type {
  User,
  UserInput,
  UserLoginInput,
  UserUpdateInput,
} from "../../libs/data/types/user";
import { apiClient } from "../../libs/api/axios.config";

class UserService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public signup = async (input: UserInput): Promise<User> => {
    const url = this.path + "/user/signup";
    const result = await apiClient.post(url, input);
    // console.log("User signup result : ", result.data);
    const user: User = result.data.user;
    localStorage.setItem("token", result.data.accessToken);
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  };

  public login = async (input: UserLoginInput): Promise<User> => {
    // console.log("User service, [login] incoming input: ", input);
    const url = this.path + "/user/login";

    const result = await apiClient.post(url, input);
    // console.log("User service, [login] incoming data: ", result.data);

    const user: User = result.data.user;

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("token", result.data.accessToken);
    return user;
  };

  public logout = async (): Promise<void> => {
    // console.log("User service, [logout] ------");
    const url = this.path + "/user/logout";
    const result = await apiClient.get(url);
    console.log("User service, [logout] result: ", result);
  };

  public getTopUsers = async (): Promise<User[]> => {
    // console.log("User service, [getTopUsers] ------");
    const url = this.path + "/user/top-users";
    const result = await apiClient.get(url);
    // console.log("User service, [getTopUsers] incoming data: ", result.data);

    return result.data.users;
  };

  public updateUser = async (input: UserUpdateInput): Promise<User> => {
    try {
      const url = `${this.path}/user/updateUser`;
      const result = await apiClient.post(url, input, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("userData", JSON.stringify(result?.data?.user));
      return result.data.user as User;
    } catch (error) {
      console.log("User Service, [updateUser] Error: ", error);
      throw error;
    }
  };

  public getUserDetails = async (): Promise<User> => {
    try {
      const url = `${this.path}/user/user-details`;
      const result = await apiClient.get(url);
      // console.log(result);
      return result.data;
    } catch (error) {
      console.log("User Service, [getUserDetails] Error: ", error);
      throw error;
    }
  };
}

export default UserService;
