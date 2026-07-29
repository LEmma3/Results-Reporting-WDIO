class CheckoutPageComponents {
        get HammerProductQuantity() {
        return $('[data-test="product-quantity"]');
    }

    get HammerTotalPrice() {
        return $('[data-test="line-price"]');
    }

    get cartCount() {
        return $('#lblCartCount');
    }
}

module.exports = new CheckoutPageComponents();