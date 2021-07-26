import { GameSetting } from "./Game/GameGlobalMvvmData";
import { Selector } from "./Libs/BehaviorTree/Composite/Selector";
import { Sequence } from "./Libs/BehaviorTree/Composite/Sequence";
import { Root } from "./Libs/BehaviorTree/Decorator/Root";
import { Action } from "./Libs/BehaviorTree/Task/Action";
import { WaitUntilStopped } from "./Libs/BehaviorTree/Task/WaitUntilStopped";
import { VM } from "./Libs/Mvvm/ViewModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start() {
        // init logic
        this.label.string = this.text;

        // cc.log('MVVM 测试变量', GameSetting.testNumber.toString());
        // VM.bindPath('GameSetting.testNumber', (n, o, pathArr) => {
        //     cc.log('change', n, o);
        //     this.label.string = 'new ' + n, 'old' + o;
        // }, this);

        // this.schedule(() => {
        //     GameSetting.testNumber++;
        // }, 1);

        // let behaviorTree = new Root(
        //     new Sequence([
        //         new Action(() => {
        //             cc.log('Hello Behavior Tree')
        //         }),
        //         new Action(() => {
        //             cc.log('Hello Behavior Tree a2')
        //         }),
        //         new WaitUntilStopped()
        //     ])

        // )
        // behaviorTree.Start();
    }
}
