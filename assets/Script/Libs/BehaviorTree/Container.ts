import { BtNode } from "./BtNode";

export abstract class Container extends BtNode {
    constructor(name: string) {
        super(name);

    }
    public ChildStopped(child: BtNode, succeeded: boolean) {
        this.DoChildStopped(child, succeeded);
    }
    protected abstract DoChildStopped(child: BtNode, succeeded: boolean): void;
}