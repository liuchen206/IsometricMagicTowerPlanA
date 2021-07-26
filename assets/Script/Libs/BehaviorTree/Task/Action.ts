import { ActionFun, ActionFun2, ActionFun3, Result } from "../BtConst";
import { Task } from "./Task";

export class Action extends Task {
    private action: ActionFun;
    constructor(action1: ActionFun) {
        super('Action');
        this.action = action1;
    }
    override DoStart() {
        this.action();
        this.Stopped(true);
    }
    // protected override  DoStop() {

    // }
}