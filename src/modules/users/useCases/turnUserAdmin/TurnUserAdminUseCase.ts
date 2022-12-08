import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const findUserById = this.usersRepository.findById(user_id);

    const convertToAdmin = this.usersRepository.turnAdmin(findUserById);

    if (!findUserById) {
      throw new Error("User Not Exists");
    }

    return convertToAdmin;
  }
}

export { TurnUserAdminUseCase };
