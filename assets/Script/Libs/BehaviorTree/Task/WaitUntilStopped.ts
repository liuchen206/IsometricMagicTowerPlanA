import { Task } from "./Task";

export class WaitUntilStopped extends Task {
    private retValWhenStoped: boolean;
    constructor(retValWhenStoped: boolean = false) {
        super("WaitUntilStopped");
        this.retValWhenStoped = retValWhenStoped;
    }
    protected override DoStop() {
        this.Stopped(this.retValWhenStoped);
    }
}