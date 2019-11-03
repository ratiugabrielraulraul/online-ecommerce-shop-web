window.Cart = {

    API_BASE_URL: "http://localhost:8084",


    getProducts: function () {
        $.ajax({
            url:Cart.API_BASE_URL + "/carts/" + 15,
            method:"GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products);
        })

    },
    displayProducts: function (products) {
        var allProductsHtml = "";

        products.forEach(product => allProductsHtml += Cart.getProductHtml(product));
        allProductsHtml += Cart.addcheckout();
        $(".shop_table.cart tbody").html(allProductsHtml);
    },


    getProductHtml: function (product) {
        return `<tr class="cart_item id-${product.id}">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">£${product.price}</span> 
                                            </td>

                                            <td class="product-quantity-${product.id}">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-" onclick="Cart.addMinusButton(${product.id}); return false;">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
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
    addcheckout: function () {
        return ` <tr>
                                            <td class="actions" colspan="6">
                                                <div class="coupon">
                                                    <label for="coupon_code">Coupon:</label>
                                                    <input type="text" placeholder="Coupon code" value="" id="coupon_code" class="input-text" name="coupon_code">
                                                    <input type="submit" value="Apply Coupon" name="apply_coupon" class="button">
                                                </div>
                                                <input type="submit" value="Update Cart" name="update_cart" class="button">
                                                <input type="submit" value="Proceed to Checkout" name="proceed" class="checkout-button button alt wc-forward">
                                            </td>
                                        </tr>`;
    }







};
Cart.getProducts();
