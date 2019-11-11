window.Cart = {

    API_BASE_URL: "http://localhost:8084",


    getProducts: function () {
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + 15,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products);
        })

    },
    displayProducts: function (products) {
        var allProductsHtml = "";

        products.forEach(product => allProductsHtml += Cart.getProductHtml(product));
        allProductsHtml += Cart.addcheckout(5);
        $(".shop_table.cart tbody").html(allProductsHtml);
    },


    getProductHtml: function (product) {
        return `<tr class="cart_item id-${product.id} ${product.id}">
                                            <td class="product-remove">
                                            <input class="itemId" type="hidden" value="${product.id}">
                                                <a title="Remove this item" class="remove" data-product_id="${product.id}" onclick="Cart.deleteProduct(${product.id}); return false;" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${product.imagePath}"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">${product.price} Lei</span> 
                                            </td>

                                            <td class="product-quantity-${product.id}">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-" onclick="Cart.addMinusButton(${product.id}); return false;">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="${product.quanitity}" min="0" step="1">
                                                    <input type="button" class="plus" value="+" onclick="Cart.addPlusButton(${product.id}); return false;">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">£${product.price}</span> 
                                            </td>
                                        </tr>`;
    },
    addPlusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue) + 1;
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    addMinusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue - 1);
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    deleteProduct: function (productId) {
        console.log(productId);
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/remove/15/" + productId,
            method: "DELETE"
        }).done(function (response) {
            $(`.${productId}`).html('');
            // Cart.displayProducts(response.products);
        })
    },
    updateProductCount: function () {
        let items = $('.cart_item');
        items.each(function () {
            var id = $(this).find('.itemId').val(),
                count = $(this).find('.qty').val();
            Cart.updateSingleProduct(id, count);
        })
    },
    updateSingleProduct: (productId, count) => {
        var reqBody = {
            productId: productId,
            count: count,
        };

        $.ajax({
            url: Cart.API_BASE_URL + "/carts/update/count/15",
            method: "PUT",
            data: JSON.stringify(reqBody),
            contentType: "application/json",
        }).done(function (response) {
            console.log(response);
        })
    },
    addcheckout: function () {
        return ` <tr>
                                            <td class="actions" colspan="6">
                                                <div class="coupon">
                                                    <label for="coupon_code">Coupon:</label>
                                                    <input type="text" placeholder="Coupon code" value="" id="coupon_code" class="input-text" name="coupon_code">
                                                    <input type="submit" value="Apply Coupon" name="apply_coupon" class="button">
                                                </div>
                                                <button type="button" onclick="Cart.updateProductCount();" class="add_to_cart_button" style="padding: 11px 20px;margin-right: 10px">Update</button>
                                                <input type="submit" onclick="Cart.proceedToCheckout(); return false;" value="Proceed to Checkout" name="proceed"  id="4" class="checkout-button button alt wc-forward">
                                            </td>
                                        </tr>`;
    },

    proceedToCheckout: function () {
        location.href = ("http://localhost:63342/online-ecommerce-shop-web/checkout.html");

    }


};
Cart.getProducts();
