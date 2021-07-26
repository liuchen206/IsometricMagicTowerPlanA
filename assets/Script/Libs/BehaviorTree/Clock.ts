import { ArraySet, List } from "../HelpTool/SomeDataStruct";
import { ActionFun } from "./BtConst";
import { Action } from "./Task/Action";

class Timer {
    public absoluteTime: number = 0;
    public repeat: number = 0;
    public used: boolean = false;
}
export class Clock {
    private isInUpdate: boolean = false;
    private elapsedTime: number = 0;

    private timers: Map<ActionFun, Timer> = new Map<ActionFun, Timer>();
    private addTimers: Map<ActionFun, Timer> = new Map<ActionFun, Timer>();
    private removeTimers: Map<ActionFun, Timer> = new Map<ActionFun, Timer>();
    private timerPool: List<Timer> = new List<Timer>();
    private currentTimerPoolIndex: number = 0;

    private updateObservers: List<ActionFun> = new List<ActionFun>();
    private removeObservers: ArraySet<ActionFun> = new ArraySet<ActionFun>();
    private addObservers: ArraySet<ActionFun> = new ArraySet<ActionFun>();

    public AddTimer(time: number, randomVariance: number = 0, repeat: number, action: ActionFun) {
        time = time - randomVariance * 0.5 + randomVariance * Math.random();
        if (!this.isInUpdate) {
            if (this.timers.has(action)) {
                this.timers.get(action).absoluteTime = this.elapsedTime + time;
                this.timers.get(action).repeat = repeat;
            }
            else {
                this.timers.set(action, this.getTimerFromPool(this.elapsedTime + time, repeat));
            }
        }
        else {
            if (!this.addTimers.has(action)) {
                this.addTimers.set(action, this.getTimerFromPool(this.elapsedTime + time, repeat));
            }
            else {
                this.addTimers.get(action).repeat = repeat;
                this.addTimers.get(action).absoluteTime = this.elapsedTime + time;
            }

            if (this.removeTimers.has(action)) {
                this.removeTimers.delete(action);
            }
        }
    }
    public RemoveTimer(action: ActionFun) {
        if (!this.isInUpdate) {
            if (this.timers.has(action)) {
                this.timers.get(action).used = false;
                this.timers.delete(action);
            }
        }
        else {
            if (this.timers.has(action)) {
                this.removeTimers.set(action, null);
            }
            if (this.addTimers.has(action)) {
                this.addTimers.get(action).used = false;
                this.addTimers.delete(action);
            }
        }
    }

    public HasTimer(action: ActionFun): boolean {
        if (!this.isInUpdate) {
            return this.timers.has(action);
        }
        else {
            if (this.removeTimers.has(action)) {
                return false;
            }
            else if (this.addTimers.has(action)) {
                return true;
            }
            else {
                return this.timers.has(action);
            }
        }
    }
    private getTimerFromPool(absoluteTime: number, repeat: number): Timer {
        let i = 0;
        let l = this.timerPool.Count;
        let timer: Timer = null;
        while (i < l) {
            let timerIndex = (i + this.currentTimerPoolIndex) % l;
            if (!this.timerPool.Get(timerIndex).used) {
                this.currentTimerPoolIndex = timerIndex;
                timer = this.timerPool.Get(timerIndex);
                break;
            }
            i++;
        }

        if (timer == null) {
            timer = new Timer();
            this.currentTimerPoolIndex = 0;
            this.timerPool.Add(timer);
        }

        timer.used = true;
        timer.absoluteTime = absoluteTime;
        timer.repeat = repeat;
        return timer;
    }
    public AddUpdateObserver(action: ActionFun) {
        if (!this.isInUpdate) {
            this.updateObservers.Add(action);
        }
        else {
            if (!this.updateObservers.Contains(action)) {
                this.addObservers.add(action);
            }
            if (this.removeObservers.has(action)) {
                this.removeObservers.remove(action);
            }
        }
    }

    public RemoveUpdateObserver(action: ActionFun) {
        if (!this.isInUpdate) {
            this.updateObservers.Remove(action);
        }
        else {
            if (this.updateObservers.Contains(action)) {
                this.removeObservers.add(action);
            }
            if (this.addObservers.has(action)) {
                this.addObservers.remove(action);
            }
        }
    }

    public HasUpdateObserver(action: ActionFun) {
        if (!this.isInUpdate) {
            return this.updateObservers.Contains(action);
        }
        else {
            if (this.removeObservers.has(action)) {
                return false;
            }
            else if (this.addObservers.has(action)) {
                return true;
            }
            else {
                return this.updateObservers.Contains(action);
            }
        }
    }
    public Update(deltaTime) {
        this.elapsedTime += deltaTime;
        this.isInUpdate = true;

        this.updateObservers.ToArray().forEach((action) => {
            if (!this.removeObservers.has(action)) {
                action();
            }
        })

        this.timers.forEach((val: Timer, key: ActionFun) => {
            if (this.removeTimers.has(key)) {
                return;
            }

            let time: Timer = this.timers.get(key);
            if (time.absoluteTime <= this.elapsedTime) {
                if (time.repeat == 0) {
                    this.RemoveTimer(key);
                }
                else if (time.repeat >= 0) {
                    time.repeat--;
                }
                key();
            }
        })
        this.addObservers.toArray().forEach((action) => {
            this.updateObservers.Add(action);
        })
        this.removeObservers.toArray().forEach((action) => {
            this.updateObservers.Remove(action);

        })

        this.addTimers.forEach((val: Timer, action: ActionFun) => {
            if (this.timers.has(action)) {
                this.timers.get(action).used = false;
            }
            this.timers.set(action, this.addTimers.get(action));
        })
        this.removeTimers.forEach((val: Timer, action: ActionFun) => {
            this.timers.get(action).used = false;
            this.timers.delete(action);
        })
        this.addObservers.clear();
        this.removeObservers.clear();
        this.addTimers.clear();
        this.removeTimers.clear();
        this.isInUpdate = false;
    }
}