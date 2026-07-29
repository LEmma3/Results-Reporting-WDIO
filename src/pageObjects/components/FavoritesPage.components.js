class FavoritesPageComponents{

    get favoriteProductName() { return $('[data-test="product-name"]'); }

}

module.exports = new FavoritesPageComponents();