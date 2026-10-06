var size = 0;
var placement = 'point';

var fatorTamanho = window.innerWidth <= 768 ? 0.55 : 1;

var style_SetoresCensitriosChefesPretasouParda_2 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("Chefes mul");
    var labelFont = "9.1px \'Open Sans\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "#fafafa";
    var bufferWidth = 3.0;
    var textAlign = 'center';
    var offsetX = 0;
    var offsetY = 0;
    var overflow = false;
    var repeat = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    if (value >= 0.000000 && value <= 0.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 2.0 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    } else if (value >= 1.000000 && value <= 10.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 5.5 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    } else if (value >= 11.000000 && value <= 20.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 9.5 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    } else if (value >= 21.000000 && value <= 50.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 13.5 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    } else if (value >= 51.000000 && value <= 100.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 17.5 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    } else if (value >= 101.000000 && value <= 128.000000) {
            style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 21.5 * fatorTamanho + size,
            displacement: [0, 0], stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 4.56}), fill: new ol.style.Fill({color: 'rgba(130,14,138,0.65)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })]
                    };

    return style;
};
