class HomePageComponents {
    
    get languageDropdown() { return $('#language');}

    get englishLanguage() { return $('[data-test="lang-en"]');}

    get spanishLanguage() { return $('[data-test="lang-es"]');}

    get homeTextTranslate() { return $('a[data-test="nav-home"]');}

    get searchInput() { return $('input[data-test="search-query"]');}

    get searchButton() { return $('button[data-test="search-submit"]');}

    get productTitles() { return $$('.card-title'); }

    get priceFilterMin() { return $('.ngx-slider-pointer-min'); }

    get priceFilterMax() { return $('.ngx-slider-pointer-max'); }

    get productPrices() { return $$('span[data-test="product-price"]'); }

    get priceValueMin() { return $('.ngx-slider-pointer-min');}

    get priceValueMax() { return $('.ngx-slider-pointer-max');}

    get productCards() { return $$('.card-title'); }

    get favouriteButton() { return $('[data-test="add-to-favorites"]'); }

    get menuButton() { return $('#menu'); }

    get myFavoritesLink() { return $('[data-test="nav-my-favorites"]'); }

    get favoritesProductName() { return $('[data-test="product-name"]'); }

    get homeButton() { return $('[data-test="nav-home"]');}

    get compareButtons() { return $$('[data-test="compare-btn"]');}

    get compareNowLink() { return $('[data-test="compare-link"]'); }

    get sortDropdown() {  return $('[data-test="sort"]'); }
}

module.exports = new HomePageComponents();