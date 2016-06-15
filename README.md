## installing

npm install

## running

node src/app.js

## configuration

generator.js generates data to be inserted into datafy
converter.js converts the generated data to the endpoint format

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