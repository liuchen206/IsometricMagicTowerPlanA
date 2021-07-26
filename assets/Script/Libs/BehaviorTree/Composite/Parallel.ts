import { Policy } from "../BtConst";
import { BtNode } from "../BtNode";
import { Decorator } from "../Decorator/Decorator";
import { Composite } from "./Composite";

export class Parallel extends Composite {
    private failurePolicy: Policy;
    private successPolicy: Policy;
    private childrenCount = 0;
    private runningCount = 0;
    private succeededCount = 0;
    private failedCount = 0;
    private childrenResults: Map<BtNode, boolean>;
    private successState: boolean;
    private childrenAborted: boolean;
    constructor(successPolicy: Policy, failurePolicy: Policy, children: BtNode[]) {
        super('Parallel', children)
        this.successPolicy = successPolicy;
        this.failurePolicy = failurePolicy;
        // this.waitForPendingChildrenRule = waitForPendingChildrenRule;
        this.childrenCount = children.length;
        this.childrenResults = new Map<BtNode, boolean>();
    }
    protected override  DoStart() {
        this.childrenAborted = false;
        this.runningCount = 0;
        this.succeededCount = 0;
        this.failedCount = 0;
        this.Children.forEach((child) => {
            this.runningCount++;
            child.Start();
        })
    }

    protected override  DoStop() {
        this.Children.forEach((child) => {
            if (child.IsActive) {
                child.Stop();
            }
        })
    }
    protected override  DoChildStopped(child: BtNode, result: boolean) {
        this.runningCount--;
        if (result) {
            this.succeededCount++;
        }
        else {
            this.failedCount++;
        }
        this.childrenResults.set(child, result);

        let allChildrenStarted = this.runningCount + this.succeededCount + this.failedCount == this.childrenCount;
        if (allChildrenStarted) {
            if (this.runningCount == 0) {
                if (!this.childrenAborted) // if children got aborted because rule was evaluated previously, we don't want to override the successState 
                {
                    if (this.failurePolicy == Policy.ONE && this.failedCount > 0) {
                        this.successState = false;
                    }
                    else if (this.successPolicy == Policy.ONE && this.succeededCount > 0) {
                        this.successState = true;
                    }
                    else if (this.successPolicy == Policy.ALL && this.succeededCount == this.childrenCount) {
                        this.successState = true;
                    }
                    else {
                        this.successState = false;
                    }
                }
                this.Stopped(this.successState);
            }
            else if (!this.childrenAborted) {
                if (this.failurePolicy == Policy.ONE && this.failedCount > 0/* && waitForPendingChildrenRule != Wait.ON_FAILURE && waitForPendingChildrenRule != Wait.BOTH*/) {
                    this.successState = false;
                    this.childrenAborted = true;
                }
                else if (this.successPolicy == Policy.ONE && this.succeededCount > 0/* && waitForPendingChildrenRule != Wait.ON_SUCCESS && waitForPendingChildrenRule != Wait.BOTH*/) {
                    this.successState = true;
                    this.childrenAborted = true;
                }

                if (this.childrenAborted) {
                    this.Children.forEach((currentChild) => {
                        if (currentChild.IsActive) {
                            currentChild.Stop();
                        }
                    })

                }
            }
        }
    }
    public override  StopLowerPriorityChildrenForChild(abortForChild: BtNode, immediateRestart: boolean) {
        if (immediateRestart) {
            if (this.childrenResults.get(abortForChild)) {
                this.succeededCount--;
            }
            else {
                this.failedCount--;
            }
            this.runningCount++;
            abortForChild.Start();
        }
        else {
            throw new alert("On Parallel Nodes all children have the same priority, thus the method does nothing if you pass false to 'immediateRestart'!");
        }
    }
}