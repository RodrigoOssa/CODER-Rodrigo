import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { createHashPass } from 'src/utils/utils';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserInterface> {
        createUserDto.password = await createHashPass(createUserDto.password);
        const newProduct = new this.userModel(createUserDto);
        try {
            return await newProduct.save()
        } catch (e) {
            throw new ConflictException(e.errmsg)
        }
    }

    async findAll(): Promise<UserInterface[]> {
        try {
            return this.userModel.find()
        } catch (e) {
            throw new NotFoundException(e.errmsg)
        }
    }

    async findOne(id: String): Promise<UserInterface> {
        try {
            const findUser = await this.userModel.findById(id);
            if (findUser) {
                return findUser
            } else {
                throw new NotFoundException(`User with ID ${id} not found`)
            }
        } catch {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
    }

    async update(id: String, updateUserDto: UpdateUserDto): Promise<UserInterface> {
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            if (updateUser) {
                return updateUser
            } else {
                throw new NotFoundException(`User with ID ${id} not found`)
            }
        } catch (e) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
    }

    async partialUpdate(id: String, updateUserDto: UpdateUserDto): Promise<UserInterface> {
        try {
            const updateUser = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true });
            if (updateUser) {
                return updateUser
            } else {
                throw new NotFoundException(`User with ID ${id} not found`)
            }
        } catch (e) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
    }

    async remove(id: String): Promise<UserInterface> {
        const deleteUser = await this.userModel.findByIdAndDelete(id).exec()
        if (deleteUser) {
            return deleteUser
        } else {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
    }
}
