/**
 * Root Container
 * @see /dev-docs/IoC 容器、依赖注入与服务说明.md
 */
import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
export declare const container: Container;
interface IBabelPropertyDescriptor extends PropertyDescriptor {
    initializer(): any;
}
export declare const lazyInject: (serviceIdentifier: interfaces.ServiceIdentifier<any>) => (this: any, proto: any, key: string, descriptor?: IBabelPropertyDescriptor | undefined) => void;
export declare const lazyMultiInject: (serviceIdentifier: interfaces.ServiceIdentifier<any>) => (this: any, proto: any, key: string, descriptor?: IBabelPropertyDescriptor | undefined) => void;
export declare function createWorldContainer(): Container;
export {};
