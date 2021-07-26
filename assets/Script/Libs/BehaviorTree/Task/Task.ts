import { BtNode } from "../BtNode";

export abstract class Task extends BtNode {
    constructor(name: string) {
        super(name);
    }
}