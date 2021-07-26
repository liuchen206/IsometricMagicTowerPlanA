export class Stack<T>{

    private arr: Array<T> = [];

    public get Count(): number {
        return this.arr.length;
    }

    public Clear() {
        this.arr = [];
    }

    public Contains(item: T): boolean {
        return this.arr.indexOf(item) >= 0;
    }

    public Peek(): T {
        if (this.arr.length <= 0)
            return null;
        return this.arr[0];
    }

    public Pop(): T {
        if (this.arr.length <= 0)
            return null;
        return this.arr.pop();
    }

    public Push(item: T) {
        this.arr.push(item);
    }

    public ToArray(): T[] {
        let result: Array<T> = [];
        result = result.concat(this.arr);
        return result;
    }

    public ToString(): string {
        let result: string = "";
        for (let item of this.arr) {
            result += item + "";
        }
        return result;
    }
}


export class Queue<T> {
    private arr: Array<T> = [];

    public get Count(): number {
        return this.arr.length;
    }

    public Clear() {
        this.arr = [];
    }

    public Contains(item: T): boolean {
        return this.arr.indexOf(item) >= 0;
    }

    public Dequeue(): T {
        if (this.arr.length <= 0)
            return null;
        let result: T = this.arr[0];
        this.arr.splice(0, 1);
        return result;
    }

    public Enquque(item: T) {
        this.arr.push(item);
    }

    public Peek(): T {
        if (this.arr.length <= 0)
            return null;
        let result: T = this.arr[0];
        return result;
    }

    public ToArray(): T[] {
        let result: Array<T> = [];
        result = result.concat(this.arr);
        return result;
    }

    public ToString(): string {
        let result: string = "";
        for (let item of this.arr) {
            result += item + " ";
        }
        return result;
    }
}


export class List<T>{
    private arr: Array<T> = [];

    public constructor(arr?: Array<T>) {
        if (arr) {
            this.arr = arr;
        }
    }

    public Get(index: number): T {
        return this.arr[index];
    }

    public get Count(): number {
        return this.arr.length;
    }

    public Add(data: T) {
        if (data)
            this.arr.push(data);
    }

    public AddRange(arr: Array<T>) {
        if (arr)
            this.arr = this.arr.concat(arr);
    }

    public Clear() {
        while (this.arr.length > 0) {
            this.arr.pop();
        }
    }

    public Remove(data: T): boolean {
        if (data) {
            let index = this.arr.indexOf(data);
            if (index >= 0)
                this.arr.splice(index, 1);
        }
        return false;
    }

    public RemoveAt(index: number): boolean {
        if (index < 0 || index >= this.arr.length)
            return false;
        this.arr.splice(index, 1);
    }

    public Insert(index: number, item: T) {
        this.arr.splice(index, 0, item);
    }

    public Sort() {
        this.arr.sort();
    }

    public Reverse() {
        this.arr.reverse();
    }

    public ToArray(): T[] {
        let result: Array<T> = [];
        result = result.concat(this.arr);
        return result;
    }

    public Contains(item: T): boolean {
        return this.arr.indexOf(item) >= 0;
    }

    public IndexOf(item: T): number {
        return this.arr.indexOf(item);
    }

    public LastIndexOf(item: T): number {
        return this.arr.lastIndexOf(item);
    }

    public ToString(): string {
        let result: string = "";
        for (let item of this.arr) {
            result += item + " ";
        }
        return result;
    }
}
export interface Set<T> {
    add(t: T);
    remove(t: T);
    indexOf(t: T): number;
    has(t: T): boolean;
    size(): number;
    clear();
    toArray(): T[];
}

export class ArraySet<T> implements Set<T>{
    private arr: Array<T> = [];

    public add(t: T) {
        this.indexOf(t) < 0 && this.arr.push(t);
    }

    public remove(t: T) {
        var i = this.indexOf(t);
        if (i >= 0) {
            delete this.arr[i];
        }
    }

    public indexOf(t: T): number {
        return this.arr.indexOf(t);
    }
    public has(t: T): boolean {
        return this.indexOf(t) >= 0;
    }
    public size(): number {
        return Object.keys(this.arr).length;
    }

    public clear() {
        delete this.arr;
        this.arr = [];
    }

    public toArray(): T[] {
        var arr = new Array<T>();
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i] && arr.push(this.arr[i]);
        }
        return arr;
    }
}

interface setItemsType<T> {
    [propName: string]: T;
}
export default class CustomSet<T>{
    private items: setItemsType<T>;
    constructor() {
        this.items = {};
    }
    has(element: any) {
        // Object原型有hasOwnProperty方法用于判断对象是否有特定属性
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element: any) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element: any) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
    }
    size() {
        let count = 0;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }
    values() {
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key);
            }
        }
        return values;
    }
    union(otherSet: CustomSet<T>) {
        // 声明并集变量
        const unionSet = new CustomSet();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    intersection(otherSet: CustomSet<T>) {
        // 声明交集变量
        const intersectionSet = new CustomSet();
        // 获取当前实例集合中的元素
        const values = this.values();
        // 获取另一个集合中的元素
        const otherValues = otherSet.values();
        // 假设当前实例集合中的元素最多
        let biggerSet = values;
        // 假设另一个元素集合中的元素最少
        let smallerSet = otherValues;
        // 如果另一个集合中的元素个数比当前元素集合中的个数多，则交换变量
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        // 遍历元素最少的集合数组，节约性能开销
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value);
            }
        });
        // 返回交集集合
        return intersectionSet;
    }
    difference(otherSet: CustomSet<T>) {
        // 声明差集变量
        const differenceSet = new CustomSet();
        // 遍历当前实例中的集合
        this.values().forEach(value => {
            // 如果当前遍历到元素不存在与另一个集合中，则将档当前元素添加进差集变量里
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        });
        // 返回差集变量
        return differenceSet;
    }
    // 是否子集
    isSubsetOf(otherSet: CustomSet<T>) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}