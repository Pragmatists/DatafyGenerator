var _ = require('lodash-node');

exports.convert = function (invoices) {
    return _(invoices.entities).filter(function(invoice) {
        return invoice.kind == "vat";
    }).map(function (invoice) {
        return {
            "entry" : {
                invoice_id           : invoice.id,
                client_company_name : invoice.client_company_name,
                number              : invoice.number,
                currency            : invoice.currency,
                net_price           : invoice.net_price / 100.0,
                invoice_date        : invoice.invoice_date + "T00:00:01",
                sale_date           : invoice.sale_date + "T00:00:01",
                status              : invoice.status
            }
        }
    }).flatten().value()
};

exports.convertExchange = function (invoices, exchangeRates) {
    return _(invoices).map(function (invoice) {
        invoice.entry.net_price_pln = 1 / exchangeRates[invoice.entry.currency] * invoice.entry.net_price;
        return invoice;
    }).flatten().value()
};