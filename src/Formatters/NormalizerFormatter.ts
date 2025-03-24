export class NormalizerFormatter {
    public normalize(data: any, depth?: number): any {
        if(data instanceof Error) {
            return this.serializeError(data);
        }

        return data;
    }

    protected serializeError(error: unknown): Record<string, any> {
        if (error instanceof Error) {
            return {
                name: error.name,
                message: error.message,
                stack: error.stack,
                ...Object.getOwnPropertyNames(error)
                    .filter((key) => !['name', 'message', 'stack'].includes(key))
                    .reduce((acc, key) => {
                        acc[key] = (error as any)[key];
                        return acc;
                    }, {} as Record<string, any>),
            };
        }
        return { error: String(error) };
    }
}
