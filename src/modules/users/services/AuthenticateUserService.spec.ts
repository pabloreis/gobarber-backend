import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AuthanticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthanticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authUser = new AuthanticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authanticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authanticate with non existing user', async () => {
    await expect(
      authUser.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authanticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
