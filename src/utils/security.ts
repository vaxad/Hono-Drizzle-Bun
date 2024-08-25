import * as argon2 from "argon2"

export const hash = async (text: string) => {
    try {
        const hash = await argon2.hash(text);
        return hash;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const checkHash = async (hashedText: string, text: string) => {
    try {
        const verified = await argon2.verify(hashedText, text);
        return verified;
    } catch (error) {
        console.error(error)
        return false;
    }
}