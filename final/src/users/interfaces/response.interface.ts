import { User } from "../schemas/user.schema";

export interface UserResponse {
    status: string,
    payload: User | Array<User>
}