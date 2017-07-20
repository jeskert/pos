
"use strict";
class Promotion {
  constructor(type, barcode = []) {
    this.type = type;
    this.barcode = barcode;
  }

  static all() {
    return [
      new Promotion('BUY_TWO_GET_ONE_FREE', [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ])
    ];
  }
}
class Item {

  constructor(barcode, name, unit, price = 0.00) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
  }

  static all() {
    return [
      new Item('ITEM000000', '可口可乐', '瓶', 3.00),
      new Item('ITEM000001', '雪碧', '瓶', 3.00),
      new Item('ITEM000002', '苹果', '斤', 5.50),
      new Item('ITEM000003', '荔枝', '斤', 15.00),
      new Item('ITEM000004', '电池', '个', 2.00),
      new Item('ITEM000005', '方便面', '袋', 4.50)
    ];
  }
}
let allItem=Item.all();
let allPromotion=Promotion.all();
let tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];
function  createShoppingList(inputs) {
  let barcode=[];
  let count=[];
  let newTags=[];
  barcode[0]=inputs[0];
  count[0]=0;
  let t=0;
  for(let i=0;i<inputs.length;i++){
    if(inputs[i].length===10){
      if(inputs[i]===barcode[t]){
        count[t]++;
      }else{
        barcode[++t]=inputs[i];
        count[t]=1;
      }
    }else{
      let shortArray=inputs[i].split("-");
      if(barcode[t]===shortArray[0]){
        count[t]+=parseFloat(shortArray[1]);
      }else{
        barcode[++t]=shortArray[0];
        count[t]=parseFloat(shortArray[1]);
      }

    }
  }
  for(let j=0;j<barcode.length;j++){
    newTags.push({
      barcode:barcode[j],
      count:count[j]
    });
  }
  return newTags;
}
function  saveList(inputs) {
  for(let i=0;i<inputs.length;i++){
    if(inputs[i].barcode===allPromotion[0].barcode||allPromotion[1].barcode||allPromotion[2].barcode){
      if(inputs[i].count>=2){
        inputs[i].count-=1;
      }
    }
  }
  return inputs;
}
function getPrintMenu(inputs) {
  let total=0;
  let save=0;
  let printList=[];
  for(let i=0;i<=inputs.length;i++){
    for(let j=0; j<=allItem.length; j++){
      if(inputs[i].barcode===allItem[j].barcode){
        printList.push('名称：'+allItem[j].name+'，数量：'+inputs[i].count+allItem[j].unit+'，单价：'+allItem[j].price.toFixed(2)+'(元)，小计：'+(inputs[i].count*allItem[j].price).toFixed(2)+'(元)\n');
        total += inputs[i].count*allItem[j].price;
        save += allItem[j].price;
      }
    }
  }
  return printList;
}
function  printReceipt(tags) {
  let newTags=createShoppingList(tags);
  let newTagsList=saveList(newTags);
  console.log(getPrintMenu(newTagsList));
}
console.log(allItem);

