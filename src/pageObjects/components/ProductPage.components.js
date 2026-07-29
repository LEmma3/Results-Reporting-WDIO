class ProductPageComponents {

    get favouriteButton() { return $('[data-test="add-to-favorites"]'); }

    get productTitle() { return $('[data-test="product-name"]'); }

}

module.exports = new ProductPageComponents();