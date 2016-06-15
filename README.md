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
        "name"       : "SAMPLE_DATASOURCE",
        "properties" : [
            {
                "PROPERTY_NAME" : "PROPERTY_VALUE",
                "type" : "text"
            }
        ]
    }
};
```