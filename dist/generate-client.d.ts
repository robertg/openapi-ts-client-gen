import * as Swagger from './swagger';
export interface IGenerateParams {
    type: 'url' | 'file';
    srcPath: string;
    destPath: string;
    namespace: string;
    baseUrl?: string;
    spec?: Swagger.ISpec;
}
export declare const generate: ({ type, srcPath, destPath, baseUrl, namespace, spec }: IGenerateParams) => Promise<void>;
