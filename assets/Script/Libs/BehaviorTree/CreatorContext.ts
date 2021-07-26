// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Clock } from "./Clock";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreatorContext extends cc.Component {
    private static instance: CreatorContext = null;
    private static GetInstance(): CreatorContext {
        if (CreatorContext.instance == null) {
            let gameObject = new cc.Node();
            gameObject.name = "~Context";
            CreatorContext.instance = gameObject.addComponent(CreatorContext);
            cc.director.getScene().addChild(gameObject);
        }
        return CreatorContext.instance;
    }
    public static GetClock(): Clock {
        return CreatorContext.GetInstance().clock;
    }
    // LIFE-CYCLE CALLBACKS:
    private clock: Clock = new Clock();

    // onLoad () {}

    start() {

    }

    update(dt) {
        this.clock.Update(dt);
    }

}
