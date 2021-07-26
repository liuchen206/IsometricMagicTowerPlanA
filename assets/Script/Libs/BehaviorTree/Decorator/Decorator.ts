import { BtNode } from "../BtNode";
import { Container } from "../Container";

export abstract class Decorator extends Container {
    protected Decoratee: BtNode;
    constructor(name: string, decoratee: BtNode) {
        super(name);
        this.Decoratee = decoratee;
        this.Decoratee.SetParent(this);
    }
}