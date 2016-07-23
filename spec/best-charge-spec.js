describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
   ============= 订餐明细 =============
   黄焖鸡 x 1 = 18元
   肉夹馍 x 2 = 12元
   凉皮 x 1 = 8元
   -----------------------------------
   使用优惠:
   指定菜品半价(黄焖鸡，凉皮)，省13元
   -----------------------------------
   总计：25元
   ===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
   ============= 订餐明细 =============
   肉夹馍 x 4 = 24元
   凉皮 x 1 = 8元
   -----------------------------------
   使用优惠:
   满30减6元，省6元
   -----------------------------------
   总计：26元
   ===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
   ============= 订餐明细 =============
   肉夹馍 x 4 = 24元
   -----------------------------------
   总计：24元
   ===================================`.trim()
    expect(summary).toEqual(expected)
  })
})

 describe("getItemCount",function(){
    it('should get item count', function () {
      let inputs = ["ITEM0001 x 1", "ITEM00013 x 2", "ITEM00022 x 1"];
      let itemCounts = getItemCount(inputs);
      let expected = [{id: "ITEM0001", count: 1}, {id: "ITEM00013", count: 2}, {id: "ITEM00022", count: 1}];
      expect(itemCounts).toEqual(expected)
    });
})
  describe("getCartItemCounts",function() {
    it('should get cartItems count', function () {
      let inputs = [{id: "ITEM0001", count: 1}, {id: "ITEM0001", count: 2}, {id: "ITEM00022", count: 1}];
      let cartItemsCounts = getCartItemCount(inputs);
      let expected = [{id: "ITEM0001", count: 3}, {id: "ITEM00022", count: 1}];
      expect(cartItemsCounts).toEqual(expected)
    })
  })

describe("getCartItems",function(){
  it('should get cartItems', function () {
    let inputs1 = [{id: "ITEM0001", count: 3}, {id: "ITEM00022", count: 1}];
    let inputs2 = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00}, {
      id: 'ITEM00022',
      name: '凉皮',
      price: 8.00
    }, {id: 'ITEM0003', name: '冰锋', price: 2.00}];
    let cartItems = getCartItems(inputs1, inputs2);
    let expected = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 3}, {
      id: 'ITEM00022',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    expect(cartItems).toEqual(expected)
  });
})

describe("getCartItemPromotion",function() {
  it('should get cartItemPromotion', function () {
    let inputs1 = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 3}, {
      id: 'ITEM00021',
      name: '凉皮',
      price: 8.00,
      count: 1
    }];
    let inputs2 = [{type: '满30减6元'}, {type: '指定菜品半价', items: ['ITEM0001', 'ITEM00022']}];
    let promotionTypes = getCartItemPromotion(inputs1, inputs2);
    let expected = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 3, type: '指定菜品半价'}, {
      id: 'ITEM00021',
      name: '凉皮',
      price: 8.00,
      count: 1,
      type: '满30减6元'
    }];
    expect(promotionTypes).toEqual(expected)
  });
})

describe("getPromotionMoney",function() {
  it('should get promotionMoney', function () {
    let inputs = [{id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 3, type: '满30减6元'}, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      count: 1,
      type: '指定菜品半价'
    }];
    let promotionMoneys = getPromotionMoney(inputs);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      count: 3,
      type: '满30减6元',
      promotion: 0
    }, {id: 'ITEM0022', name: '凉皮', price: 8.00, count: 1, type: '指定菜品半价', promotion: 4}];
    expect(promotionMoneys).toEqual(expected)
  });
})


