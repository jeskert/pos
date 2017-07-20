function printInventory(inputs) {
  var bill = billingCart(inputs);
  var outputString = formatOutput(bill);

  console.log(outputString);
}

function billingCart(inputs) {
  var bill = new Map();
  inputs.forEach(function (
    element) {
    if (bill[element.barcode]) {
      bill[element.barcode].count++;
      bill[element.barcode].sumPrice += bill[element.barcode].price;
      bill[element.barcode].sumPriceFormat = bill[element.barcode].sumPrice.toFixed(2);
    }else {
      bill[element.barcode]= {
        name: element.name,
        sumPrice: element.price,
        price: element.price,
        count: 1,
        unit: element.unit,
        sumPriceFormat: element.price.toFixed(2),
        priceFormat: element.price.toFixed(2)
      };
    }
  });
  return bill;
}
function formatOutput(bill) {
  var subTotal = 0;
  var result = "***<没钱赚商店>购物清单***\n";
  var keys=Object.keys(bill);
  keys.forEach(function(element) {
    result += "名称：" + bill[element].name + "，";
    result += "数量：" + bill[element].count + bill[element].unit + "，";
    result += "单价：" + bill[element].priceFormat + "(元)，"
    result += "小计：" + bill[element].sumPriceFormat + "(元)\n";

    subTotal += bill[element].count * bill[element].price;
  }, this);

  result += "----------------------\n总计：";
  result += subTotal.toFixed(2);
  result += "(元)\n**********************";
  return result;
}
