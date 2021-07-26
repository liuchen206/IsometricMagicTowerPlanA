import { ActionFun, ActionFun2, ActionFun3, Result } from "../BtConst";
import { Task } from "./Task";

export class ActionMultiFrame extends Task {
    private multiFrameFunc: ActionFun3 = null;
    private bWasBlocked = false;
    constructor(action3: ActionFun3 = null) {
        super('ActionMultiFrame');
        this.multiFrameFunc = action3;
    }
    override DoStart() {
        let result = this.multiFrameFunc(false);
        if (result == Result.PROGRESS) {
            this.RootNode.Clock.AddUpdateObserver(this.OnUpdateFunc);
        }
        else if (result == Result.BLOCKED) {
            this.bWasBlocked = true;
            this.RootNode.Clock.AddUpdateObserver(this.OnUpdateFunc);
        }
        else {
            this.Stopped(result == Result.SUCCESS);
        }
    }
    protected override  DoStop() {
        if (this.multiFrameFunc != null) {
            let result = this.multiFrameFunc(true);
            this.RootNode.Clock.RemoveUpdateObserver(this.OnUpdateFunc);
            this.Stopped(result == Result.SUCCESS);
        }
        else {
            throw new alert("DoStop called for a single frame ActionMultiFrame on ");
        }
    }
    private OnUpdateFunc() {
        let result = this.multiFrameFunc(false);
        if (result != Result.PROGRESS && result != Result.BLOCKED) {
            this.RootNode.Clock.RemoveUpdateObserver(this.OnUpdateFunc);
            this.Stopped(result == Result.SUCCESS);
        }
    }

}