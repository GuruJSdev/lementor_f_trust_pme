export declare class AuthService {
    static login(email?: string, password?: string): Promise<any>;
    static register(userData: any): Promise<any>;
    static getAccount(): Promise<any>;
}
