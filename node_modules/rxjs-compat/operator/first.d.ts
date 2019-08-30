import { Observable } from 'rxjs';
export declare function first<T>(this: Observable<T>, predicate?: null, defaultValue?: T): Observable<T>;
export declare function first<T, S extends T>(this: Observable<T>, predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: T): Observable<S>;
export declare function first<T>(this: Observable<T>, predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: T): Observable<T>;
