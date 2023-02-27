export class Utils {
    static testWebp(callback) {
        if(!window.createImageBitmap){
            callback(false);
            return;
        }
    
        var webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
    
        return fetch(webpdata).then(function(response){
            return response.blob();
        }).then(function(blob){
            createImageBitmap(blob).then(function(){
                return callback(true);
            }, function(){
                return callback(false);
            });
        });
    }
    static isWebp() {
        Utils.testWebp(function (support) {
            let className = support === true ? 'webp' : 'no-webp';
            document.documentElement.classList.add(className);
        });
    }
}