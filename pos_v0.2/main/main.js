'use strict';

function printReceipt(inputs) {
  let itemStrings = "";
  let receiptMap = processInput(inputs);
  let total = 0;
  for (let key of receiptMap.keys()) {
    itemStrings += buildSingleItem(receiptMap.get(key)) + '\n';
    total += receiptMap.get(key).subTotal;
  }
  console.log( `***<没钱赚商店>收据***
${itemStrings}----------------------
总计：${total.toFixed(2)}(元)
**********************`);
}

function initDictionary() {
  let allItems = loadAllItems();
  let dict = new Map();
  for (let item of allItems) {
    dict.set(item.barcode, {
      name : item.name,
      unit : item.unit,
      price : item.price
    })
  }
  return dict;
}

function processInput(inputs) {
  let inputMap = new Map();
  let dict = initDictionary();
  for (let input of inputs) {
    let item = dict.get(input);
    if (!inputMap.has(input)) {
       inputMap.set(input, {
         name : item.name,
         unit : item.unit,
         price : item.price,
         count : 1,
         subTotal : item.price
       })
     } else {
        inputMap.set(input, {
          name : item.name,
          unit : item.unit,
          price : item.price,
          count : inputMap.get(input).count + 1,
          subTotal: inputMap.get(input).subTotal + item.price
        })
     }
  }
  return inputMap;
}

function buildSingleItem(receiptItem) {
  return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}


