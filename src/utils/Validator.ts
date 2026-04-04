export class Validator {
    static notNullOrEmpty(error: string, value: any): string | null {
        if(value === null || value === '' || value === undefined) {
            return error;
        }
        return null;
    }

    static isEmail(error: string, value: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)) {
            return error;
        }
        return null;
    }

    static strongPassword(error: string, value: string): string | null {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(value)) {
            return error;
        }
        return null;
    }
}