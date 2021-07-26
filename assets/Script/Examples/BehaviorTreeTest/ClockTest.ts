import { Clock } from "../../Libs/BehaviorTree/Clock";
import { Assert } from "../../Libs/HelpTool/Assert";

export class ClockTest {
    private sut: Clock;
    constructor() {
        this.sut = new Clock();
    }
    public ShouldUpdateObserversInOrder() {
        let currentAction = 0;
        let action0 = () => { Assert.AreEqual(0, currentAction++, 0 + '!=' + currentAction); };
        let action1 = () => { Assert.AreEqual(1, currentAction++, 1 + '!=' + currentAction); };
        let action2 = () => { Assert.AreEqual(2, currentAction++, 2 + '!=' + currentAction); };
        let action3 = () => { Assert.AreEqual(3, currentAction++, 3 + '!=' + currentAction); };
        let action4 = () => { Assert.AreEqual(4, currentAction++, 4 + '!=' + currentAction); };

        this.sut.AddUpdateObserver(action4);
        this.sut.AddUpdateObserver(action0); 
        this.sut.AddUpdateObserver(action1);
        this.sut.AddUpdateObserver(action2);
        this.sut.AddUpdateObserver(action3);
        this.sut.RemoveUpdateObserver(action4);
        this.sut.AddUpdateObserver(action4);

        this.sut.Update(0);
        Assert.AreEqual(5, currentAction, 5 + '!=' + currentAction);

        this.sut = new Clock();
    }
    public ShouldNotUpdateObserver_WhenRemovedDuringUpdate() {
        let action2Invoked = false;
        let action2 = () => {
            action2Invoked = true;
        };
        let action1 = () => {
            Assert.IsFalse(action2Invoked);
            this.sut.RemoveUpdateObserver(action2);
        };

        this.sut.AddUpdateObserver(action1);
        this.sut.AddUpdateObserver(action2);
        this.sut.Update(0);
        Assert.IsFalse(action2Invoked);

        this.sut = new Clock();
    }
    public ShouldNotUpdateTimer_WhenRemovedDuringUpdate() {
        let timer2Invoked = false;
        let timer2 = () => {
            timer2Invoked = true;
        };
        let action1 = () => {
            Assert.IsFalse(timer2Invoked);
            this.sut.RemoveTimer(timer2);
        };

        this.sut.AddUpdateObserver(action1);
        this.sut.AddTimer(0, 0, 0, timer2);
        this.sut.Update(1);
        Assert.IsFalse(timer2Invoked);

        this.sut = new Clock();
    }
    public ShouldNotUpdateTimer_WhenRemovedDuringTimer() {
        // TODO: as it's a dictionary, the order of events could not always be correct...
        let timer2Invoked = false;
        let timer2 = () => {
            timer2Invoked = true;
        };
        let timer1 = () => {
            Assert.IsFalse(timer2Invoked);
            this.sut.RemoveTimer(timer2);
        };

        this.sut.AddTimer(0, 0, 0, timer1);
        this.sut.AddTimer(0, 0, 0, timer2);
        this.sut.Update(1);
        Assert.IsFalse(timer2Invoked);

        this.sut = new Clock();
    }
}

let testIns = new ClockTest()
testIns.ShouldUpdateObserversInOrder();
testIns.ShouldNotUpdateObserver_WhenRemovedDuringUpdate();
testIns.ShouldNotUpdateTimer_WhenRemovedDuringUpdate();
testIns.ShouldNotUpdateTimer_WhenRemovedDuringTimer();
