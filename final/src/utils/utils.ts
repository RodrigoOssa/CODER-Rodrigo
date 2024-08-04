import * as bcrypt from 'bcrypt';

export const createHashPass = async (plainTextPass: string) => {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(plainTextPass, saltOrRounds);
    return hash
}

export const comapreHash = async (plainTextPass: string, hashPass: string) => {
    const isMatch = await bcrypt.compare(plainTextPass, hashPass);
    return isMatch
}