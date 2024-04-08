import crypto from 'crypto';

const getId = () => {
    return crypto.randomBytes(8).toString('hex')
}

export { getId };