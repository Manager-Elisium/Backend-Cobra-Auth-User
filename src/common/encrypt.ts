import * as crypto from 'crypto';
import StandardError from './standard-error';
import { ErrorCodes } from './error-type';
import { error, info, success } from './logger';

const algorithm = 'aes-256-cbc';
const secretKey = process?.env?.SECRET_KEY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
const iv = crypto.randomBytes(16);

async function encrypt(text: string): Promise<{ public_key: string, content: string }> {
    try {
        info(`******************************************`);
        success(`Response : ${text}`);
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return {
            public_key: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    } catch (error) {
        throw new StandardError(
            ErrorCodes.FORM_VALIDATION_ERROR,
            "Don't try to hack. It's impossible."
        );
    }
}

async function decrypt(data: { public_key: string, content: string }): Promise<string | { public_key: string, content: string }> {
    try {
        const { public_key, content } = data;
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(public_key, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
        info(`******************************************`);
        error(`Request : ${decrpyted.toString()}`);
        return decrpyted.toString();
    } catch (error) {
        throw new StandardError(
            ErrorCodes.FORM_VALIDATION_ERROR,
            "Don't try to hack. It's impossible."
        );
    }
}

export { encrypt, decrypt };
