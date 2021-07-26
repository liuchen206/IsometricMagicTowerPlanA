import { BtNode } from "../BtNode";
import { Container } from "../Container";
import { Root } from "../Decorator/Root";

export abstract class Composite extends Container {
    protected Children: BtNode[];
    constructor(name: string, children: BtNode[]) {
        super(name);
        this.Children = children;
        this.Children.forEach((val, index) => {
            val.SetParent(this);
        })
    }
    override SetRoot(rootNode: Root) {
        super.SetRoot(rootNode);
        this.Children.forEach((val, index) => {
            val.SetRoot(rootNode);
        })
    }
    protected override Stopped(success: boolean) {
        this.Children.forEach((val, index) => {
            val.ParentCompositeStopped(this);
        })
        super.Stopped(success);
    }

    public abstract StopLowerPriorityChildrenForChild(child: BtNode, immediateRestart: boolean);
}