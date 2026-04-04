import bcrypt from 'bcrypt';
import { CryptoProvider } from '../provider';

export class CryptoProviderAdapter implements CryptoProvider {

    async hash(password:string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    async compare(password:string, hash:string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }

}