import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { createHashPass } from 'src/utils/utils';
import { CartsService } from 'src/carts/carts.service';
import { SUCCESS_MSG } from 'src/constants/statusMessages';
import { UserResponse } from './interfaces/response.interface';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_MODEL') private userModel: Model<User>,
        private cartService: CartsService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserResponse> {
        createUserDto.password = await createHashPass(createUserDto.password);
        try {
            const newUser = await new this.userModel(createUserDto);
            const newCart = await this.cartService.create();
            newUser.cart.push(newCart)
            return {
                status: SUCCESS_MSG.CREATED,
                payload: await newUser.save()
            };
        } catch (e) {
            throw new ConflictException("User already exist")
        }
    }

    async findAll(): Promise<UserResponse> {
        try {
            const users = await this.userModel.find().populate('cart');
            if (!users) throw new NotFoundException("Users Not Found")
            return {
                status: SUCCESS_MSG.OK,
                payload: users
            };
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: String): Promise<UserResponse> {
        try {
            const findUser = await this.userModel.findById(id);
            if (!findUser) throw new NotFoundException(`User with ID ${id} not found`);
            return {
                status: SUCCESS_MSG.OK,
                payload: findUser
            };
        } catch (e) {
            if (e instanceof NotFoundException) throw e
            throw new InternalServerErrorException()
        }
    }

    async findByLogin(userEmail: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ email: userEmail });
            if (!user) {
                return {
                    status: "Error",
                    msg: "User not exist",
                    payload: null
                }
            }
            return {
                status: "Ok",
                payload: user
            }
        } catch {
            throw new NotFoundException(`User not found`)
        }
    }

    async update(id: String, updateUserDto: UpdateUserDto): Promise<UserResponse> {
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            if (!updateUser) throw new NotFoundException(`User with ID ${id} not found`);
            return {
                status: SUCCESS_MSG.OK,
                payload: updateUser
            }
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException();
        }
    }

    async partialUpdate(id: String, updateUserDto: UpdateUserDto): Promise<UserResponse> {
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true });
            if (!updateUser) throw new NotFoundException(`User with ID ${id} not found`);
            return {
                status: SUCCESS_MSG.OK,
                payload: updateUser
            }
        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException()
        }
    }

    async remove(id: String): Promise<UserResponse> {
        try {
            const deleteUser = await this.userModel.findByIdAndDelete(id).exec()
            if (deleteUser) throw new NotFoundException(`User with ID ${id} not found`);
            return {
                status: SUCCESS_MSG.DELETED,
                payload: deleteUser
            }

        } catch (e) {
            if (e instanceof NotFoundException) throw e;
            throw new InternalServerErrorException()
        }
    }

    async upgradePremium(uid: string): Promise<UserResponse> {
        try {
            const user = await this.userModel.findByIdAndUpdate(uid, { role: "Premium" }, { new: true });
            if (!user) throw new NotFoundException(`User with id ${uid} not found.`);
            return {
                status: SUCCESS_MSG.OK,
                payload: user
            }
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
