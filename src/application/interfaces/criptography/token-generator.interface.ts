export interface TokenGenerator {
    generate(data: any): Promise<{ token: string }>
}