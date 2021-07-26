import { VM } from "../Libs/Mvvm/ViewModel";

export class GameSettingData {
    testNumber: number = 0;

}


//原始数据
export let GameSetting: GameSettingData = new GameSettingData();


//数据模型绑定,定义后不能修改顺序
VM.add(GameSetting, 'GameSetting');    //定义全局tag