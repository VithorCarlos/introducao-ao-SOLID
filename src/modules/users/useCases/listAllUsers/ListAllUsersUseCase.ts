import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const lisAllUsers = this.usersRepository.list();
    const userAlreadyExists = this.usersRepository.findById(user_id);

    const isAdmin = lisAllUsers.some(
      (user) => user.id === user_id && user.admin === true
    );

    if (!userAlreadyExists) {
      throw new Error("User Not Exists");
    }

    if (!isAdmin) {
      throw new Error("User is Not Admin");
    } else {
      return lisAllUsers;
    }
  }
}

export { ListAllUsersUseCase };
