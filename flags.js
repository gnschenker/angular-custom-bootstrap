angular.module('Flags',[])
    .factory('FeatureFlags', FeatureFlagsService);

function FeatureFlagsService($q, $timeout) {
    var service = {
        timeoutService: $timeout,
        qService: $q
    };
    service.init = function(){
        return this.loadFeatureFlags();
    };
    service.getFeatureFlags = function(){
        return this.features = this.features || window.__av__otxp_featureFlags__;
    };
    service.getFeatureFlag = getFeatureFlag;
    service.loadFeatureFlags = loadFeatureFlags;
    return service;
}


function getFeatureFlag(feature) {
    var result = this.getFeatureFlags().filter(function(x){ return x.name == feature ;})[0];
    console.log(feature + ': ', result);
    var featureIsOn = (result === undefined) ? false : result.active != 0;
    console.log('IsOn:', featureIsOn);
    return featureIsOn;
}

function loadFeatureFlags() {
    var features = [{
        "name": "sso",
        "active": 1
    },
    {
        "name": "abc",
        "active": 0
    }]
    return this.timeoutService(function(){
        console.log('feature flags loaded.')
        // Avoid clash with other global properties 
        // by using a "fancy" name
        window.__av__otxp_featureFlags__ = features;
    }, 2000);
};
