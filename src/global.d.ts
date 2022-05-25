// variables
declare type Nullable<T> = T | null

// functions
declare type GenericFunc<T> = (arg: T) => T
declare type VoidFunc<T> = (...arg: T[]) => void
declare type EventFunc<T> = (event: T) => void
declare type CheckType<T> = (...agr: T[]) => boolean
