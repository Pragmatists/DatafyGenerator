## installing

npm install

## running

node src/app.js

## configuration

generator.js generates data to be inserted into datafy. Just update the generate function to return an array of some objects.

converter.js converts the generated data to the endpoint format. Just update the convert function to return an array of objects in the
format acceptable for the datasource, as defined below.

```javascript
Datafy.authData = {
    "organizationId" : "YOUR_ORG_ID",
    "username"       : "EMAIL@YOUR_ORG.COM",
    "password"       : "YOUR PASSWORD",
    "rememberMe"     : false
};

Datafy.datasource = {
    "template" : {
        "name"       : "DATASOURCE_NAME",
        "properties" : [
            {
                "name" : "PROPERTY_VALUE",
                "type" : "PROPERTY_TYPE",
                "options" : {
                    // TEXT  -  default value "Element"
                    "possibleValues" : [
                        {"value" : "a", "probability" : 1},
                        {"value" : "b", "probability" : 2},
                        {"value" : "c", "probability" : 3}
                    ]
                    "random" : "true"
                    // BOOLEAN, INTEGER, DOUBLE  -  default value  true, 123, 1.23
                    "possibleValues" : [
                        {"value" : "true", "probability" : 1},
                        {"value" : "2", "probability" : 2},
                        {"value" : "3.3", "probability" : 3}
                    ]
                    "random" : { // for BOOLEAN "random" : "true"
                        "min" : 123,
                        "max" : 456
                    }
                }
            }
        ],
        "options"   : {
            "count" : 123 // number of objects to insert to the datasource
        }
    }
};
```