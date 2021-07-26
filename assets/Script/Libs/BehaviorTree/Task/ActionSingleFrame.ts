import { ActionFun, ActionFun2, ActionFun3, Result } from "../BtConst";
import { Task } from "./Task";

export class ActionSingleFrame extends Task {
    private singleFrameFunc: ActionFun2 = null;
    constructor(action2: ActionFun2) {
        super('ActionSingleFrame');
        this.singleFrameFunc = action2;
    }
    override DoStart() {
        this.Stopped(this.singleFrameFunc());
    }
    // protected override  DoStop() {

    // }
}