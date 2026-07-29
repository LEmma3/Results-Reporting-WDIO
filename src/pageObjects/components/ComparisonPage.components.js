class ComparisonPageComponents{

    get table() {
        return $('[data-test="comparison-table"]');
    }

    get productNames() {
        return $$('[data-test="product-name"]');
    }

    get prices() {
        return $$('[data-test="compare-price"]');
    }

    get specRows() {
        return $$('.spec-diff');
    }

}

module.exports = new ComparisonPageComponents();