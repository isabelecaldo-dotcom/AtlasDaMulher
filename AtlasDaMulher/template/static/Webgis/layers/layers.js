ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:3857").setExtent([-6257095.209574, -2452664.892077, -6244976.444625, -2446066.232053]);
var wms_layers = [];

var format_QuadrasJD_0 = new ol.format.GeoJSON();
var features_QuadrasJD_0 = format_QuadrasJD_0.readFeatures(json_QuadrasJD_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_QuadrasJD_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_QuadrasJD_0.addFeatures(features_QuadrasJD_0);
var lyr_QuadrasJD_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_QuadrasJD_0, 
                style: style_QuadrasJD_0,
                popuplayertitle: 'Quadras-JD',
                interactive: true,
    title: '' });
var format_AV_1 = new ol.format.GeoJSON();
var features_AV_1 = format_AV_1.readFeatures(json_AV_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AV_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AV_1.addFeatures(features_AV_1);
var lyr_AV_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AV_1, 
                style: style_AV_1,
                popuplayertitle: 'AV',
                interactive: true,
                title: ''
            });
var format_SetoresCensitriosChefesPretasouParda_2 = new ol.format.GeoJSON();
var features_SetoresCensitriosChefesPretasouParda_2 = format_SetoresCensitriosChefesPretasouParda_2.readFeatures(json_SetoresCensitriosChefesPretasouParda_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SetoresCensitriosChefesPretasouParda_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SetoresCensitriosChefesPretasouParda_2.addFeatures(features_SetoresCensitriosChefesPretasouParda_2);
var lyr_SetoresCensitriosChefesPretasouParda_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SetoresCensitriosChefesPretasouParda_2, 
                style: style_SetoresCensitriosChefesPretasouParda_2,
                popuplayertitle: 'Setores Censitários - Chefes Pretas ou Parda',
                interactive: true,
    title: 'Setores Censitários - Chefes Pretas ou Parda<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_0.png" /> 0 - 0<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_1.png" /> 1 - 10<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_2.png" /> 11 - 20<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_3.png" /> 21 - 50<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_4.png" /> 51 - 100<br />\
    <img src="styles/legend/SetoresCensitriosChefesPretasouParda_2_5.png" /> 101 - 128<br />' });

lyr_QuadrasJD_0.setVisible(true);lyr_AV_1.setVisible(true);lyr_SetoresCensitriosChefesPretasouParda_2.setVisible(true);
var layersList = [lyr_QuadrasJD_0,lyr_AV_1,lyr_SetoresCensitriosChefesPretasouParda_2];
lyr_QuadrasJD_0.set('fieldAliases', {'CD_SETOR': 'CD_SETOR', 'CD_QUADRA': 'CD_QUADRA', 'CD_FACE': 'CD_FACE', 'NM_TIP_LOG': 'NM_TIP_LOG', 'NM_TIT_LOG': 'NM_TIT_LOG', 'NM_LOG': 'NM_LOG', 'TOT_RES': 'TOT_RES', 'TOT_GERAL': 'TOT_GERAL', 'Bairro': 'Bairro', });
lyr_AV_1.set('fieldAliases', {'id': 'id', });
lyr_SetoresCensitriosChefesPretasouParda_2.set('fieldAliases', {'id': 'id', 'CD_SETOR': 'CD_SETOR', 'V0001': 'V0001', 'V0002': 'V0002', 'V0003': 'V0003', 'V0004': 'V0004', 'V0005': 'V0005', 'V0006': 'V0006', 'V0007': 'V0007', 'V01327': 'V01327', 'V01328': 'V01328', 'V01329': 'V01329', 'V01330': 'V01330', 'V01331': 'V01331', 'V01340': 'V01340', 'V01338': 'V01338', 'V01346': 'V01346', 'Chefes mul': 'Chefes mul', 'C - Analfa': 'C - Analfa', });
lyr_QuadrasJD_0.set('fieldImages', {'CD_SETOR': 'TextEdit', 'CD_QUADRA': 'TextEdit', 'CD_FACE': 'TextEdit', 'NM_TIP_LOG': 'TextEdit', 'NM_TIT_LOG': 'TextEdit', 'NM_LOG': 'TextEdit', 'TOT_RES': 'TextEdit', 'TOT_GERAL': 'TextEdit', 'Bairro': 'TextEdit', });
lyr_AV_1.set('fieldImages', {'id': 'TextEdit', });
lyr_SetoresCensitriosChefesPretasouParda_2.set('fieldImages', {'id': 'TextEdit', 'CD_SETOR': 'TextEdit', 'V0001': 'TextEdit', 'V0002': 'TextEdit', 'V0003': 'TextEdit', 'V0004': 'TextEdit', 'V0005': 'TextEdit', 'V0006': 'TextEdit', 'V0007': 'TextEdit', 'V01327': 'TextEdit', 'V01328': 'TextEdit', 'V01329': 'TextEdit', 'V01330': 'TextEdit', 'V01331': 'TextEdit', 'V01340': 'TextEdit', 'V01338': 'TextEdit', 'V01346': 'TextEdit', 'Chefes mul': 'TextEdit', 'C - Analfa': 'TextEdit', });
lyr_QuadrasJD_0.set('fieldLabels', {'CD_SETOR': 'no label', 'CD_QUADRA': 'no label', 'CD_FACE': 'no label', 'NM_TIP_LOG': 'no label', 'NM_TIT_LOG': 'no label', 'NM_LOG': 'no label', 'TOT_RES': 'no label', 'TOT_GERAL': 'no label', 'Bairro': 'no label', });
lyr_AV_1.set('fieldLabels', {'id': 'no label', });
lyr_SetoresCensitriosChefesPretasouParda_2.set('fieldLabels', {'id': 'no label', 'CD_SETOR': 'no label', 'V0001': 'no label', 'V0002': 'no label', 'V0003': 'no label', 'V0004': 'no label', 'V0005': 'no label', 'V0006': 'no label', 'V0007': 'no label', 'V01327': 'no label', 'V01328': 'no label', 'V01329': 'no label', 'V01330': 'no label', 'V01331': 'no label', 'V01340': 'no label', 'V01338': 'no label', 'V01346': 'no label', 'Chefes mul': 'no label', 'C - Analfa': 'no label', });
lyr_SetoresCensitriosChefesPretasouParda_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});