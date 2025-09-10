export declare class PmeService {
    static baseUrl: string;
    static fetchPmes(userId: string, filters?: any): Promise<any>;
    static createPme(pmeData: any): Promise<any>;
    static updatePme(pmeId: string, pmeData: any): Promise<any>;
    static deletePme(pmeId: string): Promise<any>;
}
