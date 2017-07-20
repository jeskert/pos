'use strict';

function printReceipt(inputs) {
  let itemStrings = "";
  let receiptMap = processInput(inputs);
  let calculatedPromotionMap = calculatePromotion(receiptMap);
  let total = 0;
  for (let key of calculatedPromotionMap.inputMap.keys()) {
    itemStrings += buildSingleItem(receiptMap.get(key)) + '\n';
    total += receiptMap.get(key).subTotal;
  }
  console.log( `***<没钱赚商店>收据***
${itemStrings}----------------------
总计：${total.toFixed(2)}(元)
节省：${calculatedPromotionMap.savedPrice.toFixed(2)}(元)
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

function calculatePromotion(inputMap) {
  let promotions = loadPromotions();
  let savedPrice = 0;
  for (let promotion of promotions) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      let promotionRange = promotion.barcodes;
      for (let promotionItem of promotionRange) {
        if (inputMap.has(promotionItem)) {

          if (inputMap.get(promotionItem).count >= 2) {

            inputMap.set(promotionItem, {
              name: inputMap.get(promotionItem).name,
              unit: inputMap.get(promotionItem).unit,
              price: inputMap.get(promotionItem).price,
              count: inputMap.get(promotionItem).count,
              subTotal: inputMap.get(promotionItem).subTotal - inputMap.get(promotionItem).price
            });
            savedPrice += inputMap.get(promotionItem).price;
          }
        }
      }
    }
  }

  return {
    inputMap,
    savedPrice
  }
}

function processInput(inputs) {
  let inputMap = new Map();
  let dict = initDictionary();
  for (let input of inputs) {
    let splitString = input.split('-')[0];
    let splitCount = input.split('-')[1];
    let item = dict.get(splitString);
    let count = undefined != splitCount ? splitCount : 1;
    if (!inputMap.has(splitString)) {
      inputMap.set(splitString, {
        name : item.name,
        unit : item.unit,
        price : item.price,
        count : count,
        subTotal : item.price * count
      });
    } else {
      inputMap.set(splitString, {
        name : item.name,
        unit : item.unit,
        price : item.price,
        count : inputMap.get(splitString).count + parseFloat(count),
        subTotal: inputMap.get(splitString).subTotal + item.price * parseFloat(count)
      });
    }
  }
  return inputMap;
}

function buildSingleItem(receiptItem) {
  return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}
