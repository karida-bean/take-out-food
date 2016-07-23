function bestCharge(selectedItems) {
  return
}
  let allItems = loadAllItems();
  let promation = loadPromotions();

  function getItemCount(tags){
    let itemCounts =  tags.map(function(tag){
      let exist = tag.split(' x ');
      return{
        id:exist[0],
        count:parseInt(exist[1])
      }
    });
    return itemCounts;
  }

  function getCartItemCount(itemCounts){
    let cartItemCounts = itemCounts.reduce(function(cur,old){
      let exist = cur.find(function(item){
        return item.id === old.id;
      })
      if(exist){
        exist.count += old.count;
      }else{
        cur.push(old);
      }
      return cur;
    },[]);
    return cartItemCounts;
  }

  function getCartItems(cartItemCount,allItems){
    let cartItems = [];
    for(let i = 0; i<cartItemCount.length; i++){
      for(let j = 0; j<allItems.length; j++){
        if(cartItemCount[i].id === allItems[j].id){
          cartItems.push(Object.assign({},allItems[j],{count:cartItemCount[j].count}));
        }
      }
    }
    return cartItems;
  }

  function getCartItemPromotion(cartItems,promotion){
    let promotionTypes = [];
    for(let m = 0; m<cartItems.length; m++) {
      promotionTypes.push(Object.assign({},cartItems[m],{type: "满30减6元"}))
    }
    for(let i = 0;i<promotion.length; i++){
      let exist = promotion[i].items
      if(exist){
        for(let j = 0; j<exist.length; j++){
          for(let n = 0; n<promotionTypes.length; n++){
            if(exist[j] === promotionTypes[n].id){
              promotionTypes[n].type = "指定菜品半价"
            }
          }
        }
      }
    }
    return promotionTypes;
  }

  function getPromotionMoney(promotionTypes){
    let promotionMoneys = [];
    let proMoney = 0;
    for(let i = 0; i<promotionTypes.length; i++){
      if(promotionTypes[i].type === "指定菜品半价"){
        proMoney = parseFloat(promotionTypes[i].price / 2)* promotionTypes[i].count;
      }
      promotionMoneys.push(Object.assign({},promotionTypes[i],{promotion:proMoney}))
    }
    return promotionMoneys;
  }

  function calculateSubtotal(promotionMoneys){
    let subTotals = [];
    for(let i = 0; i<promotionMoneys.length; i++){
      let subMoney = promotionMoneys[i].price * promotionMoneys[i].count;
      subTotals.push(Object.assign({},promotionMoneys[i],{subTotal:subMoney}));
    }
    return subTotals;
  }

  function calculateProSubTotal(subTotals) {
    let sub = 0;
    let proSubTotals = [];
    for (let i = 0; i < subTotals.length; i++) {
      if (subTotals[i].type === "指定菜品半价") {
        sub = subTotals[i].subTotal - subTotals[i].promotion;
      } else {
        sub = subTotals[i].subTotal
      }
      proSubTotals.push(Object.assign({}, {subMoney: sub}))
    }
  }

function calculateTotal(proSubTotals) {
  let total1= 0;
  let total2 = 0;
  let total = 0;
  for (let i = 0; i < proSubTotals.length; i++) {
    total1 += proSubTotals[i].subMoney;
  }
  for(let j = 0; j<proSubTotals.length; j++){
    total2 += proSubTotals[j].subTotal;
    if(total2 > 30){
      total2 -= 6;
    }
  }
  if(total1<total2){
    total = total1;
  }else{
    total = total2;
  }
  return total;
}

function calculateProTotal(proSubTotals,total){
  let money = 0;
  for(let i = 0; i<proSubTotals.length; i++){
    money = proSubTotals[i].price * proSubTotals[i].count;
  }
  let proMoneys = (money - total);
  return proMoneys;
}


