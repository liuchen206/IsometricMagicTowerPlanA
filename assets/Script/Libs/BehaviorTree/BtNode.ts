import { State } from "./BtConst";
import { Composite } from "./Composite/Composite";
import { Container } from "./Container";
import { Root } from "./Decorator/Root";

export abstract class BtNode {
    protected currentState: State;
    public RootNode: Root;
    private parentNode: Container;
    private label: string;
    private name: string
    constructor(name: string) {
        this.name = name;
    }
    public get ParentNode() {
        return this.parentNode
    }
    public get IsStopRequested(): boolean {
        return this.currentState == State.STOP_REQUESTED;
    }
    public get IsActive(): boolean {
        return this.currentState == State.ACTIVE;
    }
    // virtual
    public SetRoot(rootNode: Root) {
        this.RootNode = rootNode;
    }
    public SetParent(parent: Container) {
        this.parentNode = parent;
    }
    public Start() {
        this.currentState = State.ACTIVE;
        this.DoStart();
    }
    public Stop() {
        this.currentState = State.STOP_REQUESTED;
        this.DoStop();
    }
    // virtual
    /// THIS ABSOLUTLY HAS TO BE THE LAST CALL IN YOUR FUNCTION, NEVER MODIFY
    /// ANY STATE AFTER CALLING Stopped !!!!
    protected Stopped(success: boolean) {
        this.currentState = State.INACTIVE;
        if (this.ParentNode != null) {
            this.ParentNode.ChildStopped(this, success);
        }
    }
    // virtual
    protected DoStart() {

    }
    // virtual
    protected DoStop() {

    }
    // virtual
    public ParentCompositeStopped(composite: Composite) {
        this.DoParentCompositeStopped(composite);
    }
    // virtual
    /// THIS IS CALLED WHILE YOU ARE INACTIVE, IT's MEANT FOR DECORATORS TO REMOVE ANY PENDING
    /// OBSERVERS
    protected DoParentCompositeStopped(composite: Composite) {
        /// be careful with this!
    }
}