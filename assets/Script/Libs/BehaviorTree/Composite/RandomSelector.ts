import { BtNode } from "../BtNode";
import { Composite } from "./Composite";

export class RandomSelector extends Composite {
    private currentIndex = -1;
    private randomizedOrder: number[];
    constructor(children: BtNode[]) {
        super('RandomSelector', children)
        this.randomizedOrder = [];
        for (let i = 0; i < this.Children.length; i++) {
            this.randomizedOrder[i] = i;
        }
    }
    protected override  DoStart() {
        this.currentIndex = -1;

        // Shuffling
        let n = this.randomizedOrder.length;
        while (n > 1) {
            let k = Math.floor(Math.random() * n--);
            let temp = this.randomizedOrder[n];
            this.randomizedOrder[n] = this.randomizedOrder[k];
            this.randomizedOrder[k] = temp;
        }

        this.ProcessChildren();
    }
    protected override  DoStop() {
        this.Children[this.currentIndex].Stop();
    }
    protected override  DoChildStopped(child: BtNode, result: boolean) {
        if (result) {
            this.Stopped(true);
        }
        else {
            this.ProcessChildren();
        }
    }
    private ProcessChildren() {
        if (++this.currentIndex < this.Children.length) {
            if (this.IsStopRequested) {
                this.Stopped(false);
            }
            else {
                this.Children[this.randomizedOrder[this.currentIndex]].Start();
            }
        }
        else {
            this.Stopped(false);
        }
    }
    public override  StopLowerPriorityChildrenForChild(abortForChild: BtNode, immediateRestart: boolean) {
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