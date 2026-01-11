import axios from "axios";
import { serverURL } from "../../libs/configs";
import type {
  User,
  UserInput,
  UserLoginInput,
} from "../../libs/data/types/user";

class UserService {
  private readonly path: string;

  constructor() {
    this.path = serverURL;
  }

  public signup = async (input: UserInput): Promise<User> => {
    const url = this.path + "/user/signup";
    console.log("URL: ", url);
    const result = await axios.post(url, input, { withCredentials: true });
    console.log("User signup result : ", result.data);
    const user: User = result.data.user;
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  };

  public login = async (input: UserLoginInput): Promise<User> => {
    console.log("User service, [login] incoming input: ", input);
    const url = this.path + "/user/login";
    console.log("URL: ", url);

    const result = await axios.post(url, input, { withCredentials: true });
    console.log("User service, [login] incoming data: ", result.data);

    const user: User = result.data.user;

    localStorage.setItem("userData", JSON.stringify(user));

    return user;
  };

  public logout = async (): Promise<void> => {
    console.log("User service, [logout] ------");
    const url = this.path + "/user/logout";
    const result = await axios.get(url, { withCredentials: true });
    console.log("User service, [logout] result: ", result);
  };

  public getTopUsers = async (): Promise<User[]> => {
    console.log("User service, [getTopUsers] ------");
    const url = this.path + "/user/top-users";
    const result = await axios.get(url, { withCredentials: true });
    console.log("User service, [getTopUsers] incoming data: ", result.data);

    return result.data.users;
  };
}

export default UserService;
