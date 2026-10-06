var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    interactions: [],
    view: new ol.View({
        constrainResolution: false,
        maxZoom: 28,
        minZoom: 0,
        extent: [-6257095.209574, -2452664.892077, -6244976.444625, -2446066.232053],
        projection: new ol.proj.Projection({
            code: 'EPSG:3857',
            units: 'm'
        })

    })

});

map.updateSize();

map.getView().fit(
    [-6257095.209574, -2452664.892077, -6244976.444625, -2446066.232053],
    {
        size: map.getSize(),
        padding: [30, 30, 30, 30]
    }
);

//change cursor
function pointerOnFeature(evt) {
    if (evt.dragging) {
        return;
    }
    var hasFeature = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function(layer) {
            return layer && (layer.get("interactive"));
        }
    });
    map.getViewport().style.cursor = hasFeature ? "pointer" : "";
}
map.on('pointermove', pointerOnFeature);
function styleCursorMove() {
    map.on('pointerdrag', function() {
        map.getViewport().style.cursor = "move";
    });
    map.on('pointerup', function() {
        map.getViewport().style.cursor = "default";
    });
}
styleCursorMove();

////small screen definition
    var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
    var isSmallScreen = window.innerWidth < 650;

////controls container

    //top left container
    var topLeftContainer = new ol.control.Control({
        element: (() => {
            var topLeftContainer = document.createElement('div');
            topLeftContainer.id = 'top-left-container';
            return topLeftContainer;
        })(),
    });
    map.addControl(topLeftContainer)

    //bottom left container
    var bottomLeftContainer = new ol.control.Control({
        element: (() => {
            var bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.id = 'bottom-left-container';
            return bottomLeftContainer;
        })(),
    });
    map.addControl(bottomLeftContainer)
  
    //top right container
    var topRightContainer = new ol.control.Control({
        element: (() => {
            var topRightContainer = document.createElement('div');
            topRightContainer.id = 'top-right-container';
            return topRightContainer;
        })(),
    });
    map.addControl(topRightContainer)

    //bottom right container
    var bottomRightContainer = new ol.control.Control({
        element: (() => {
            var bottomRightContainer = document.createElement('div');
            bottomRightContainer.id = 'bottom-right-container';
            return bottomRightContainer;
        })(),
    });
    map.addControl(bottomRightContainer)

    // =========================
// NORTE
// =========================

var northControl = document.createElement('div');
northControl.id = 'custom-north';

var northText = document.createElement('span');
northText.innerHTML = 'Norte';

northControl.appendChild(northText);


//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function(media) {
        media.pause();
        media.currentTime = 0;
    });
}
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    stopMediaInPopup();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container,
	autoPan: true
});
map.addOverlay(overlayPopup)
    
    
var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = false;
var doHover = false;

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';

    // Campo que queremos mostrar
    var campo = 'Chefes mul';

    // Pega o valor do campo
    var valor = currentFeature.get(campo);

    // Mostra somente o valor
    if (valor !== null && valor !== undefined) {
        popupText += '<tr>';
        popupText += '<td colspan="2" style="font-size: 18px; font-weight: bold; text-align: center;">';
        popupText += autolinker.link(valor.toLocaleString());
        popupText += '</td>';
        popupText += '</tr>';
    }

    return popupText;
}

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function onPointerMove(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLength;
    var popupText = '<ul>';

    // Collect all features and their layers at the pixel
    var featuresAndLayers = [];
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            featuresAndLayers.push({ feature, layer });
        }
    });

    // Iterate over the features and layers in reverse order
    for (var i = featuresAndLayers.length - 1; i >= 0; i--) {
        var feature = featuresAndLayers[i].feature;
        var layer = featuresAndLayers[i].layer;
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get("features");
        if (clusteredFeatures) {
            clusterLength = clusteredFeatures.length;
        }
        if (typeof clusteredFeatures !== "undefined") {
            if (doPopup) {
                for(var n=0; n<clusteredFeatures.length; n++) {
                    currentFeature = clusteredFeatures[n];
                    currentFeatureKeys = currentFeature.getKeys();
                    popupText += '<li><table>'
                    // título removido
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';    
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                // título removido
                popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                popupText += '</table></li>';
            }
        }
    }

    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
	if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var featureStyle
                if (typeof clusteredFeatures == "undefined") {
					var style = currentLayer.getStyle();
					var styleFunction = typeof style === 'function' ? style : function() { return style; };
					featureStyle = styleFunction(currentFeature)[0];
				} else {
					featureStyle = currentLayer.getStyle().toString();
				}

                if (currentFeature.getGeometry().getType() == 'Point' || currentFeature.getGeometry().getType() == 'MultiPoint') {
                    var radius
					if (typeof clusteredFeatures == "undefined") {
						radius = featureStyle.getImage().getRadius();
					} else {
						radius = parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLength;
					}

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "rgba(255, 235, 19, 1.00)"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString' || currentFeature.getGeometry().getType() == 'MultiLineString') {

                    var featureWidth = featureStyle.getStroke().getWidth();

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 235, 19, 1.00)',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 235, 19, 1.00)'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
			content.innerHTML = popupText;
            container.style.display = 'block';
            overlayPopup.setPosition(coord);
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

map.on('pointermove', onPointerMove);

var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    if (popupContent) {
        content.innerHTML = popupContent;
        container.style.display = 'block';
		overlayPopup.setPosition(popupCoord);
    } else {
        container.style.display = 'none';
        closer.blur();
        stopMediaInPopup();
    }
} 

function onSingleClickFeatures(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        featuresPopupActive = true;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            var doPopup = false;
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n = 0; n < clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>';
                        // título removido
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
                    // Não mostrar o título da camada
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table>';
                }
            }
        }
    });
    if (popupText === '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
	
	popupContent = popupText;
    popupCoord = coord;
    updatePopup();
}

function onSingleClickWMS(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        popupContent = '';
    }
    var coord = evt.coordinate;
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();

    for (var i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection, {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                const wmsTitle = wms_layers[i][0].get('popuplayertitle');
                var ldsRoller = '<div class="roller-switcher" style="height: 25px; width: 25px;"></div>';

                popupCoord = coord;
                popupContent += ldsRoller;
                updatePopup();

                var timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout exceeded'));
                    }, 5000); // (5 second)
                });

                // Function to try fetch with different option
                function tryFetch(urls) {
                    if (urls.length === 0) {
                        return Promise.reject(new Error('All fetch attempts failed'));
                    }
                    return fetch(urls[0])
                        .then((response) => {
                            if (response.ok) {
                                return response.text();
                            } else {
                                throw new Error('Fetch failed');
                            }
                        })
                        .catch(() => tryFetch(urls.slice(1))); // Try next URL
                }

                // List of URLs to try
                // The first URL is the original, the second is the encoded version, and the third is the proxy
                const urlsToTry = [
                    url,
                    encodeURIComponent(url),
                    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)
                ];

                Promise.race([tryFetch(urlsToTry), timeoutPromise])
                    .then((html) => {
                        if (html.indexOf('<table') !== -1) {
                            popupContent += '<a><b>' + wmsTitle + '</b></a>';
                            popupContent += html + '<p></p>';
                            updatePopup();
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            var loaderIcon = document.querySelector('.roller-switcher');
                            if (loaderIcon) loaderIcon.remove();
                        }, 500); // (0.5 second)
                    });
            }
        }
    }
}

map.on('singleclick', onSingleClickFeatures);
map.on('singleclick', onSingleClickWMS);

//get container
var topLeftContainerDiv = document.getElementById('top-left-container')
var bottomLeftContainerDiv = document.getElementById('bottom-left-container')
var topRightContainerDiv = document.getElementById('top-right-container')
var bottomRightContainerDiv = document.getElementById('bottom-right-container')

//title

//abstract


//geolocate

	let isTracking = false;

	const geolocateButton = document.createElement('button');
	geolocateButton.className = 'geolocate-button fa fa-map-marker';
	geolocateButton.title = 'Geolocalizza';

    const geolocateControl = document.createElement('div');
    geolocateControl.className = 'ol-unselectable ol-control geolocate';
    geolocateControl.appendChild(geolocateButton);
    geolocateControl.style.display = 'none';
    map.getTargetElement().appendChild(geolocateControl);


	const accuracyFeature = new ol.Feature();
	const positionFeature = new ol.Feature({
	  style: new ol.style.Style({
		image: new ol.style.Circle({
		  radius: 6,
		  fill: new ol.style.Fill({ color: '#3399CC' }),
		  stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
		}),
	  }),
	});

  const geolocateOverlay = new ol.layer.Vector({
	  source: new ol.source.Vector({
		features: [accuracyFeature, positionFeature],
	  }),
	});
	
	const geolocation = new ol.Geolocation({
	  projection: map.getView().getProjection(),
	});

	geolocation.on('change:accuracyGeometry', function () {
	  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
	});

	geolocation.on('change:position', function () {
	  const coords = geolocation.getPosition();
	  positionFeature.setGeometry(coords ? new ol.geom.Point(coords) : null);
	});

	geolocation.setTracking(true);

	function handleGeolocate() {
	  if (isTracking) {
		map.removeLayer(geolocateOverlay);
		isTracking = false;
	  } else if (geolocation.getTracking()) {
		map.addLayer(geolocateOverlay);
		const pos = geolocation.getPosition();
		if (pos) {
		  map.getView().setCenter(pos);
		}
		isTracking = true;
	  }
	}

	geolocateButton.addEventListener('click', handleGeolocate);
	geolocateButton.addEventListener('touchstart', handleGeolocate);


//measurement





//geocoder

  //Layer to represent the point of the geocoded address
  var geocoderLayer = new ol.layer.Vector({
      source: new ol.source.Vector(),
  });
  map.addLayer(geocoderLayer);
  var vectorSource = geocoderLayer.getSource();

  //Variable used to store the coordinates of geocoded addresses
  var obj2 = {
  value: '',
  letMeKnow() {
      //console.log(`Geocoded position: ${this.gcd}`);
  },
  get gcd() {
      return this.value;
  },
  set gcd(value) {
      this.value = value;
      this.letMeKnow();
  }
  }

  var obj = {
      value: '',
      get label() {
          return this.value;
      },
      set label(value) {
          this.value = value;
      }
  }

  // Function to handle the selected address
  function onSelected(feature) {
      obj.label = feature;
      input.value = typeof obj.label.properties.label === "undefined"? obj.label.properties.display_name : obj.label.properties.label;
      var coordinates = ol.proj.transform(
      [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      "EPSG:4326",
      map.getView().getProjection()
      );
      vectorSource.clear(true);
      obj2.gcd = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
      var marker = new ol.Feature(new ol.geom.Point(coordinates));
      var zIndex = 1;
      marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon(({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          scale: 0.7,
          opacity: 1,
          src: "./resources/marker.png",
          zIndex: zIndex
      })),
      zIndex: zIndex
      }));
      vectorSource.addFeature(marker);
      map.getView().setCenter(coordinates);
      map.getView().setZoom(18);
  }

  // Format the result in the autocomplete search bar
  var formatResult = function (feature, el) {
      var title = document.createElement("strong");
      el.appendChild(title);
      var detailsContainer = document.createElement("small");
      el.appendChild(detailsContainer);
      var details = [];
      title.innerHTML = feature.properties.label || feature.properties.display_name;
      var types = {
      housenumber: "numéro",
      street: "rue",
      locality: "lieu-dit",
      municipality: "commune",
      };
      if (
      feature.properties.city &&
      feature.properties.city !== feature.properties.name
      ) {
      details.push(feature.properties.city);
      }
      if (feature.properties.context) {
      details.push(feature.properties.context);
      }
      detailsContainer.innerHTML = details.join(", ");
  };

  // Define a class to create the control button for the search bar in a div tag
  class AddDomControl extends ol.control.Control {
      constructor(elementToAdd, opt_options) {
      const options = opt_options || {};

      const element = document.createElement("div");
      if (options.className) {
          element.className = options.className;
      }
      element.appendChild(elementToAdd);

      super({
          element: element,
          target: options.target,
      });
      }
  }

  // Function to show you can do something with the returned elements
  function myHandler(featureCollection) {
      //console.log(featureCollection);
  }

  // URL for API
  const url = {"Nominatim OSM": "https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&",
  "France BAN": "https://api-adresse.data.gouv.fr/search/?"}
  var API_URL = "//api-adresse.data.gouv.fr";

  // Create search by adresses component
  var containers = new Photon.Search({
    resultsHandler: myHandler,
    onSelected: onSelected,
    placeholder: "Search an address",
    formatResult: formatResult,
    //url: API_URL + "/search/?",
    url: url["Nominatim OSM"],
    position: "topright",
    // ,includePosition: function() {
    //   return ol.proj.transform(
    //     map.getView().getCenter(),
    //     map.getView().getProjection(), //'EPSG:3857',
    //     'EPSG:4326'
    //   );
    // }
  });

  // Add the created DOM element within the map
  //var left = document.getElementById("top-left-container");
  var controlGeocoder = new AddDomControl(containers, {
    className: "photon-geocoder-autocomplete ol-unselectable ol-control",
  });
  map.addControl(controlGeocoder);
  var search = document.getElementsByClassName("photon-geocoder-autocomplete ol-unselectable ol-control")[0];
  search.style.display = "none";

  // Create the new button element
  var button = document.createElement("button");
  button.type = "button";
  button.id = "gcd-button-control";
  button.className = "gcd-gl-btn fa fa-search leaflet-control";
  button.style.display = "none";

  // Ajouter le bouton à l'élément parent
  search.insertBefore(button, search.firstChild);
  last = search.lastChild;
  last.style.display = "none";
  button.addEventListener("click", function (e) {
      if (last.style.display === "none") {
          last.style.display = "block";
      } else {
          last.style.display = "none";
      }
  });
  input = document.getElementsByClassName("photon-input")[0];
  //var searchbar = document.getElementsByClassName("photon-geocoder-autocomplete ol-unselectable ol-control")[0]
  //left.appendChild(searchbar);
        

//layer search


//scalebar

//layerswitcher

var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
	startActive: true,
	tipLabel: "Layers",
    target: 'top-right-container',
	collapseLabel: '»',
	collapseTipLabel: 'Close'
    });
map.addControl(layerSwitcher);
if (hasTouchScreen || isSmallScreen) {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(function() {
			layerSwitcher.hidePanel();
		}, 500);
	});	
}






//attribution
var bottomAttribution = new ol.control.Attribution({
  collapsible: false,
  collapsed: false,
  className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

map.once('rendercomplete', function() {
  var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
  if (bottomAttributionUl) {
    var layerAttrs = Array.from(bottomAttributionUl.querySelectorAll('li'))
      .map(function(li) { return li.innerHTML.trim(); }).filter(Boolean);
    var attribHtml = `
    <a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot;
    <a href="https://openlayers.org/">OpenLayers</a> &middot;
    <a href="https://qgis.org/">QGIS</a>`;
    if (layerAttrs.length > 0) { attribHtml += ' &nbsp;|&nbsp; ' + layerAttrs.join(', '); }
    bottomAttributionUl.innerHTML = '<li>' + attribHtml + '</li>';
  }
});


// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
var isPopupAllActive = false;
document.addEventListener('DOMContentLoaded', function() {
	if (doHover || doHighlight) {
		var controlElements = document.getElementsByClassName('ol-control');
		for (var i = 0; i < controlElements.length; i++) {
			controlElements[i].addEventListener('mouseover', function() { 
				doHover = false;
				doHighlight = false;
			});
			controlElements[i].addEventListener('mouseout', function() {
				doHover = preDoHover;
				if (isPopupAllActive) { return }
				doHighlight = preDoHighlight;
			});
		}
	}
});


//move controls inside containers, in order
    //zoom
    var zoomControl = document.getElementsByClassName('ol-zoom')[0];
    if (zoomControl) {
        topLeftContainerDiv.appendChild(zoomControl);
    }
    //geolocate
    if (typeof geolocateControl !== 'undefined') {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
    //measure
    if (typeof measureControl !== 'undefined') {
        topLeftContainerDiv.appendChild(measureControl);
    }
    //geocoder
    var searchbar = document.getElementsByClassName('photon-geocoder-autocomplete ol-unselectable ol-control')[0];
    if (searchbar) {
        topLeftContainerDiv.appendChild(searchbar);
    }
    //search layer
    var searchLayerControl = document.getElementsByClassName('search-layer')[0];
    if (searchLayerControl) {
        topLeftContainerDiv.appendChild(searchLayerControl);
    }
    //scale line

    //attribution
    var attributionControl = document.getElementsByClassName('bottom-attribution')[0];
    if (attributionControl) {
        bottomRightContainerDiv.appendChild(attributionControl);
    }

    // ======================================
// REMOVER CONTROLES DESNECESSÁRIOS
// ======================================

function removerControles() {

    // Remove zoom
    document.querySelectorAll('.ol-zoom').forEach(function(elemento) {
        elemento.remove();
    });

    // Remove localização
    document.querySelectorAll(
        '.ol-geolocate, .ol-locate, .ol-location'
    ).forEach(function(elemento) {
        elemento.remove();
    });

    // Remove pesquisa
    document.querySelectorAll(
        '.ol-search, .ol-geocoder, .search-layer'
    ).forEach(function(elemento) {
        elemento.remove();
    });

}

// Executa agora
removerControles();

// Executa novamente depois que o qgis2web terminar de carregar os controles
setTimeout(removerControles, 500);
setTimeout(removerControles, 1000);
setTimeout(removerControles, 2000);