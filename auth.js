function AuthProvider(){
    return ({
        $get: function(FeatureFlags){
            var service;
            var isOn = FeatureFlags.getFeatureFlag('sso');
            if(isOn){
                service = AuthFunc();
            } else{
                service = LegacyAuthFunc();
            }
            return service;
        }
    });
}

function AuthFunc(){
    var service = {};
    service.getMessage = function(){
        return "I'm the Auth service";
    }
    return service;
}

function LegacyAuthFunc(){
    var service = {};
    service.getMessage = function(){
        return "I'm the *legacy* Auth service";
    }
    return service;
}
