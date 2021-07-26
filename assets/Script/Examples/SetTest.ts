// import { Assert } from "../Libs/HelpTool/Assert";
// import CustomSet from "../Libs/HelpTool/CustomSet";

// const set = new CustomSet();
// set.add(11);
// set.add(12);
// set.add(13);
// set.delete(11);
// Assert.AreEqual(set.size(), 2);
// set.clear()
// Assert.AreEqual(set.size(), 0);
// // 集合运算
// const A = new CustomSet();
// A.add(10);
// A.add(11);
// A.add(12);
// A.add(13);
// A.add(1);
// A.add(2);
// const B = new CustomSet();
// B.add(1);
// B.add(2);
// B.add(3);
// // 求A和B的并集
// cc.log("A和B的并集", A.union(B).values());
// // 求A和B的交集
// cc.log("A和B的交集", A.intersection(B).values());
// //求A和B的差集
// cc.log("A和B的差集", A.difference(B).values());
// // 求C是否为D的子集
// const C = new CustomSet();
// C.add(1);
// C.add(2);
// C.add(3);
// C.add(4);
// C.add(5);
// const D = new CustomSet();
// D.add(1);
// D.add(2);
// D.add(3);
// D.add(9)
// cc.log('D 是不是 C 的子集', D.isSubsetOf(C));