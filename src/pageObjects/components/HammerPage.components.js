class HammerPageComponents{
    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get increaseQuantity() {
        return $('[data-test="increase-quantity"]');
    }

    get addToCartButton() {
        return $('[data-test="add-to-cart"]');
    }

    get cartButton() {
        return $('[data-test="nav-cart"]');
    }
}

module.exports = new HammerPageComponents();