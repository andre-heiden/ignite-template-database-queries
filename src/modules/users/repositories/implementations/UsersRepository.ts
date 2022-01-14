import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({ 
      relations: ["games"], 
      where: {
        id: user_id
      }, });
    return user!;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw Query
    return this.repository.query("Select * from users order by first_name ASC"); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return this.repository.query(`Select * from users where LOWER(first_name) = '${first_name.toLowerCase()}' and LOWER(last_name) = '${last_name.toLowerCase()}'` ); 
  }
}
