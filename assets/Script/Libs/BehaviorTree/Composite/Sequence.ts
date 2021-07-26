import { BtNode } from "../BtNode";
import { Composite } from "./Composite";

export class Sequence extends Composite {
    private currentIndex: number = -1;
    constructor(children: BtNode[]) {
        super('Sequence', children);
    }
    protected override  DoStart() {
        this.currentIndex = -1;
        this.ProcessChildren();
    }

    protected override  DoStop() {
        this.Children[this.currentIndex].Stop();
    }

    protected override DoChildStopped(child: BtNode, result: boolean) {
        if (result) {
            this.ProcessChildren();
        }
        else {
            this.Stopped(false);
        }
    }
    private ProcessChildren() {
        if (++this.currentIndex < this.Children.length) {
            if (this.IsStopRequested) {
                this.Stopped(false);
            }
            else {
                this.Children[this.currentIndex].Start();
            }
        }
        else {
            this.Stopped(true);
        }
    }
    public override StopLowerPriorityChildrenForChild(abortForChild: BtNode, immediateRestart: boolean) {
        let indexForChild = 0;
        let found = false;
        for (let index = 0; index < this.Children.length; index++) {
            let currentChild = this.Children[index];
            if (currentChild == abortForChild) {
                found = true;
            }
            else if (!found) {
                indexForChild++;
            }
            else if (found && currentChild.IsActive) {
                if (immediateRestart) {
                    this.currentIndex = indexForChild - 1;
                }
                else {
                    this.currentIndex = this.Children.length;
                }
                currentChild.Stop();
                break;
            }
        }
    }

}