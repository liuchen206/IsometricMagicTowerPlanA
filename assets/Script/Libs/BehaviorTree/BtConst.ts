export type ActionFun = () => void;
export type ActionFun2 = () => boolean;
export type ActionFun3 = (bool: boolean) => Result;


export enum State {
    INACTIVE,
    ACTIVE,
    STOP_REQUESTED,
}
export enum Result {
    SUCCESS,
    FAILED,
    BLOCKED,
    PROGRESS
}
export enum Policy {
    ONE,
    ALL,
}