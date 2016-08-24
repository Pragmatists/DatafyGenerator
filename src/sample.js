var Datafy = require('./datafy-api.js');

//Datafy.datasource = {
//    "structure"  : {
//        "name"       : "sampleDS",
//        "properties" : [
//            {"name" : "startup", "type" : "text"},
//            {"name" : "product", "type" : "text"},
//            {"name" : "price", "type" : "integer"},
//            {"name" : "amount", "type" : "integer"},
//            {"name" : "month", "type" : "integer"},
//            {"name" : "country", "type" : "text"}
//        ]
//    },
//    "properties" : {
//        "startup" : [
//            {
//                "_probability" : 1,
//                "startup"      : "Spółka 1",
//                "product"      : [
//                    {
//                        "_probability" : 1,
//                        "product"      : "Produkt 1",
//                        "price"        : 1,
//                        "amount"       : [
//                            {
//                                "amount"       : 1,
//                                "_probability" : 2
//                            },
//                            {
//                                "amount"       : 2,
//                                "_probability" : 1
//                            }
//                        ],
//                        "month"        : {
//                            "month" : "_random_integer",
//                            "_min"  : 1,
//                            "_max"  : 12
//                        },
//                        "country"      : [
//                            {
//                                "country"      : "USA",
//                                "_probability" : 3
//                            },
//                            {
//                                "country"      : "EU",
//                                "_probability" : 2
//                            },
//                            {
//                                "country"      : "PL",
//                                "_probability" : 1
//                            }
//                        ]
//                    },
//                    {
//                        "_probability" : 1,
//                        "product"      : "Produkt 2",
//                        "price"        : 2,
//                        "amount"       : [
//                            {
//                                "amount"       : 1,
//                                "_probability" : 1
//                            },
//                            {
//                                "amount"       : 2,
//                                "_probability" : 2
//                            }
//                        ],
//                        "month"        : {
//                            "month" : "_random_integer",
//                            "_min"  : 1,
//                            "_max"  : 12
//                        },
//                        "country"      : [
//                            {
//                                "country"      : "USA",
//                                "_probability" : 2
//                            },
//                            {
//                                "country"      : "EU",
//                                "_probability" : 3
//                            },
//                            {
//                                "country"      : "PL",
//                                "_probability" : 1
//                            }
//                        ]
//                    }
//                ]
//            },
//            {
//                "_probability" : 2,
//                "startup"      : "Spółka 2",
//                "product"      : [
//                    {
//                        "_probability" : 1,
//                        "product"      : "Produkt 2",
//                        "price"        : 1,
//                        "amount"       : [
//                            {
//                                "amount"       : 1,
//                                "_probability" : 2
//                            },
//                            {
//                                "amount"       : 2,
//                                "_probability" : 1
//                            }
//                        ],
//                        "month"        : {
//                            "month" : "_random_integer",
//                            "_min"  : 1,
//                            "_max"  : 12
//                        },
//                        "country"      : [
//                            {
//                                "country"      : "USA",
//                                "_probability" : 3
//                            },
//                            {
//                                "country"      : "EU",
//                                "_probability" : 2
//                            },
//                            {
//                                "country"      : "PL",
//                                "_probability" : 1
//                            }
//                        ]
//                    },
//                    {
//                        "_probability" : 3,
//                        "product"      : "Produkt 3",
//                        "price"        : 2,
//                        "amount"       : [
//                            {
//                                "amount"       : 1,
//                                "_probability" : 1
//                            },
//                            {
//                                "amount"       : 2,
//                                "_probability" : 2
//                            }
//                        ],
//                        "month"        : {
//                            "month" : "_random_integer",
//                            "_min"  : 1,
//                            "_max"  : 12
//                        },
//                        "country"      : [
//                            {
//                                "country"      : "USA",
//                                "_probability" : 2
//                            },
//                            {
//                                "country"      : "EU",
//                                "_probability" : 3
//                            },
//                            {
//                                "country"      : "PL",
//                                "_probability" : 1
//                            }
//                        ]
//                    }
//                ]
//            }
//        ]
//    },
//    "options"    : {
//        "count" : 1000
//    }
//};
Datafy.datasource = {
    "structure"  : {
        "name"       : "sampleDS",
        "properties" : [
            {"name" : "Rachunek", "type" : "integer"},
            {"name" : "Produkt", "type" : "text"},
            {"name" : "Cena", "type" : "integer"},
            {"name" : "Liczba", "type" : "integer"},
            {"name" : "Data", "type" : "dateTime"}
        ]
    },
    "properties" : {
        "Produkt" : [
            {
                "_probability" : 1,
                "Produkt"      : "Espresso",
                "Cena"        : 5,
                "Liczba"       : [
                    {
                        "Liczba"       : 1,
                        "_probability" : 2
                    },
                    {
                        "Liczba"       : 2,
                        "_probability" : 1
                    }
                ]
            },
            {
                "_probability" : 2,
                "Produkt"      : "Latte",
                "Cena"        : 12,
                "Liczba"       : [
                    {
                        "Liczba"       : 1,
                        "_probability" : 1
                    },
                    {
                        "Liczba"       : 2,
                        "_probability" : 2
                    }
                ]
            }
        ],
        "Data" : {
            "Data" : "_random_date",
            "_min"    : 1000 * (8*3600),
            "_max"    : 1000 * (9*3600),
            "Rachunek" : {
                "Rachunek" : "_random_integer",
                "_min" : 0,
                "_max" : 500
            }
        }
    },
    "options"    : {
        "count" : 1000
    }
};


Datafy.authData = {
    "organizationId" : "demo",
    "username"       : "demo@datafy.pro",
    "password"       : "DemoAdmin!123",
    "rememberMe"     : false
};

Datafy.authenticate()
    .then(Datafy.deleteDS)
    .then(Datafy.createDS)
    .then(Datafy.generateData)
    .then(Datafy.convertData)
    .then(Datafy.insertData);
