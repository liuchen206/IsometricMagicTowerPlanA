import { BtNode } from "../BtNode";
import { Clock } from "../Clock";
import CreatorContext from "../CreatorContext";
import { Decorator } from "./Decorator";


export class Root extends Decorator {
    private mainNode: BtNode;
    private clock: Clock;
    public
    public get Clock(): Clock {
        return this.clock;
    }
    constructor(mainNode: BtNode) {
        super('Root', mainNode);
        this.mainNode = mainNode;
        this.clock = CreatorContext.GetClock();
        // this.blackboard = new Blackboard(this.clock);
        this.SetRoot(this);
    }
    protected DoChildStopped(child: BtNode, succeeded: boolean): void {
        if (!this.IsStopRequested) {
            // wait one tick, to prevent endless recursions
            this.clock.AddTimer(0, 0, 0, this.mainNode.Start.bind(this.mainNode));
        }
        else {
            // this.blackboard.Disable();
            this.Stopped(succeeded);
        }
    }
    override SetRoot(rootNode: Root) {
        super.SetRoot(rootNode);
        this.mainNode.SetRoot(rootNode);
    }
    protected override DoStart() {
        // this.blackboard.Enable();
        this.mainNode.Start();
    }
}