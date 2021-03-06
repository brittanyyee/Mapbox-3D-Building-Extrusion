mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpdHRhbnl5ZWUiLCJhIjoiY2p1ZTdpN3M4MDBlMzQ0bHJhaDh1b203ZyJ9.Kv9ykdRmPx5utrcMAY9uCg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/brittanyyee/ck542raiz4xcm1dlk4oytsomk',
        center: [-112.073354, 33.449569],
        zoom: 15.5,
        bearing: 27,
        pitch: 60
    });

  
    var chapters = {
        'Three Gateway': {
            bearing: 27,
            center: [-111.987871, 33.45318],
            zoom: 17,
            pitch: 60
        },
        'One Gateway': {
            duration: 6000,
            center: [-111.9897396, 33.4528942],
            bearing: 150,
            zoom: 17,
            pitch: 60
        },
        'Two Gateway': {
            bearing: 90,
            center: [-111.987953, 33.453798],
            zoom: 17,
            speed: 0.6,
            pitch: 40
        },
        'Four Gateway': {
            bearing: 90,
            center: [-111.989014, 33.454332],
            zoom: 17
        },
        '501 Gateway': {
            bearing: 45,
            center: [-111.9866237, 33.4541527],
            zoom: 17,
            pitch: 60,
            speed: 0.5
        },
        'Concord Place': {
            bearing: 180,
            center: [-111.9863814, 33.482415],
            zoom: 17,
            pitch: 60,
            speed: 0.5
        },
        'Forum North 44': {
            bearing: 90,
            center: [-111.9858515, 33.4835447],
            zoom: 17.3,
            pitch: 60,
            speed: 0.5
        },
        'Valley Commerce Center - South Bldg': {
            bearing: 90,
            center: [-112.0639052, 33.5067578],
            zoom: 17.3,
            pitch: 60,
            speed: 0.5
        }
    };
window.onscroll = function() {
var chapterNames = Object.keys(chapters);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};
 
var activeChapterName = 'Three Gateway';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
map.flyTo(chapters[chapterName]);
 
document.getElementById(chapterName).setAttribute('class', 'active');
document.getElementById(activeChapterName).setAttribute('class', '');
 
activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}
map.on('load', function () {
      map.addSource("buildings", {
        type: "vector",
        url: "mapbox://mapbox.3d-buildings"
    });
    map.addLayer({
        'id': '3d-buildings',
        'source': 'buildings',
        'source-layer': 'building',
        'type': 'fill-extrusion',
        'minzoom': 10,
        'paint': {
            'fill-extrusion-color': [
                'case', ['==', ['feature-state', 'highlight'], true], '#d10a0a',
                '#ccc'
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.7
        }
    }, 'waterway-label');
    var url = "";
    var coordinates = [];
    // Loop through the source GeoJSON
    customerData.features.forEach(function (feature) {
        coordinates = feature.geometry.coordinates;
        // Query for which building footprints intersect them
        url = "https://api.mapbox.com/v4/mapbox.3d-buildings/tilequery/" +
            coordinates + ".json?limit=50&radius=30&access_token=" +
            mapboxgl.accessToken;
        fetch(url)
            .then(data => {
                return data.json()
            })
            .then(res => {
                res.features.forEach(function (buildingFeature) {
                    map.setFeatureState({
                        source: 'buildings',
                        sourceLayer: 'building',
                        id: buildingFeature.id
                    }, {
                        'highlight': true
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});
var customerData = {
   "type": "FeatureCollection",
   "features": [
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9897396,33.4528942 ]
    },
    "properties": {
    "address":"410 N 44th St Phoenix, AZ, 85008-7605",
    "building_name":"Three Gateway",
    "rba":"222,118"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.987871,33.45318 ]
    },
    "properties": {
    "address":"426 N 44th St Phoenix, AZ, 85008-6508",
    "building_name":"One Gateway",
    "rba":"107,755"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.987953,33.453798 ]
    },
    "properties": {
    "address":"432 N 44th St Phoenix, AZ, 85008-7601",
    "building_name":"Two Gateway",
    "rba":"109,682"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.989014,33.454332 ]
    },
    "properties": {
    "address":"444 N 44th St Phoenix, AZ, 85008-7624",
    "building_name":"Four Gateway",
    "rba":"138,240"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9866237,33.4541527 ]
    },
    "properties": {
    "address":"501 N 44th St Phoenix, AZ, 85008-6526",
    "building_name":"501 Gateway",
    "rba":"103,219"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9863814,33.482415 ]
    },
    "properties": {
    "address":"2999 N 44th St Phoenix, AZ, 85018-7246",
    "building_name":"Concord Place",
    "rba":"133,522"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9858515,33.4835447 ]
    },
    "properties": {
    "address":"3033 N 44th St Phoenix, AZ, 85018-7226",
    "building_name":"Forum North 44",
    "rba":"117,611"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9838089,33.4506462 ]
    },
    "properties": {
    "address":"225 N 45th St Phoenix, AZ, 85034-1901",
    "building_name":"American Family Mutual Insurance Co.",
    "rba":"118,324"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9946717,33.496094 ]
    },
    "properties": {
    "address":"4020 E Indian School Rd Phoenix, AZ, 85018-5220",
    "building_name":"Forty20",
    "rba":"38,029"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9905849,33.4508097 ]
    },
    "properties": {
    "address":"4127 E Van Buren St Phoenix, AZ, 85008-6932",
    "building_name":"Airport Tech Center (4127 Building)",
    "rba":"199,677"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9910928,33.4495329 ]
    },
    "properties": {
    "address":"4129 E Van Buren St Phoenix, AZ, 85008-6939",
    "building_name":"Airport Tech Center (4129 Building)",
    "rba":"121,490"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9847193,33.4518927 ]
    },
    "properties": {
    "address":"4646 E Van Buren St Phoenix, AZ, 85008-6915",
    "building_name":"East Gateway Centre I",
    "rba":"115,451"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.984716,33.4528781 ]
    },
    "properties": {
    "address":"4686 E Van Buren St Phoenix, AZ, 85008-6959",
    "building_name":"East Gateway Centre II",
    "rba":"115,451"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9837061,33.4484206 ]
    },
    "properties": {
    "address":"4600 E Washington St Phoenix, AZ, 85034",
    "building_name":"",
    "rba":"188,145"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9867235,33.4059482 ]
    },
    "properties": {
    "address":"4550 S 44th Pl Phoenix, AZ, 85040-4011",
    "building_name":"Bldg 17 - Phase V",
    "rba":"54,489"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9878319,33.4053165 ]
    },
    "properties": {
    "address":"4610 S 44th Pl Phoenix, AZ, 85040",
    "building_name":"Bldg 16 - Phase V",
    "rba":"66,012"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9862715,33.4039825 ]
    },
    "properties": {
    "address":"4750 S 44th Pl Phoenix, AZ, 85040",
    "building_name":"Bldg 14 - Phase IV",
    "rba":"158,992"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9847193,33.4042628 ]
    },
    "properties": {
    "address":"4755 S 44th Pl Phoenix, AZ, 85040",
    "building_name":"Cotton Center Building 19",
    "rba":"82,951"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.97992,33.4274299 ]
    },
    "properties": {
    "address":"2211 S 47th St Phoenix, AZ, 85034-6403",
    "building_name":"Avnet Global Headquarters",
    "rba":"176,402"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9810199,33.4199041 ]
    },
    "properties": {
    "address":"3150 S 48th St Phoenix, AZ, 85040-1709",
    "building_name":"One Compass Center",
    "rba":"136,194"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.979141,33.402958 ]
    },
    "properties": {
    "address":"4950 S 48th St Phoenix, AZ, 85040",
    "building_name":"Mutual of Omaha",
    "rba":"73,377"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0151738,33.4080839 ]
    },
    "properties": {
    "address":"3100 E Broadway Rd Phoenix, AZ, 85040",
    "building_name":"Riverpoint-Bldg # 2",
    "rba":"61,316"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9925251,33.4060189 ]
    },
    "properties": {
    "address":"4141 E Broadway Rd Phoenix, AZ, 85040-8831",
    "building_name":"Allred Broadway Center",
    "rba":"215,634"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9906599,33.4032147 ]
    },
    "properties": {
    "address":"4310 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Quattro - Phase I Bldg 1",
    "rba":"68,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.989224,33.4028512 ]
    },
    "properties": {
    "address":"4340 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Quattro - Bldg 1",
    "rba":"82,900"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9892407,33.4046129 ]
    },
    "properties": {
    "address":"4350 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Quattro - Bldg 2",
    "rba":"57,108"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.983949,33.400795 ]
    },
    "properties": {
    "address":"4425 E Cotton Center Blvd Phoenix, AZ, 85040-8854",
    "building_name":"Bldg 4 - Phase II",
    "rba":"165,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9837758,33.4024296 ]
    },
    "properties": {
    "address":"4435 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Bldg 3 - Phase II",
    "rba":"37,750"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9835644,33.4036506 ]
    },
    "properties": {
    "address":"4500 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Aetna",
    "rba":"139,403"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9811698,33.4028285 ]
    },
    "properties": {
    "address":"4645 E Cotton Center Blvd Phoenix, AZ, 85040-8874",
    "building_name":"Forty6Forty5 Cotton Corporate Center",
    "rba":"116,858"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0150529,33.4186522 ]
    },
    "properties": {
    "address":"3137 E Elwood St Phoenix, AZ, 85034-8200",
    "building_name":"",
    "rba":"123,032"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.013134,33.418259 ]
    },
    "properties": {
    "address":"3138 E Elwood St Phoenix, AZ, 85034-7210",
    "building_name":"",
    "rba":"77,155"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0140008,33.4172265 ]
    },
    "properties": {
    "address":"3157 E Elwood St Phoenix, AZ, 85034-7209",
    "building_name":"CognoSante",
    "rba":"76,120"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0135006,33.4162368 ]
    },
    "properties": {
    "address":"3201 E Elwood St Phoenix, AZ, 85034-7259",
    "building_name":"The 3201",
    "rba":"77,132"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.010738,33.414439 ]
    },
    "properties": {
    "address":"3255 E Elwood St Phoenix, AZ, 85034-7256",
    "building_name":"Southbank II",
    "rba":"120,778"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.982021,33.412336 ]
    },
    "properties": {
    "address":"4605 E Elwood St Phoenix, AZ, 85040-1973",
    "building_name":"Sky Harbor II",
    "rba":"123,448"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.981521,33.41215 ]
    },
    "properties": {
    "address":"4615 E Elwood St Phoenix, AZ, 85040-1958",
    "building_name":"Sky Harbor Towers I",
    "rba":"96,222"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9941,33.4127674 ]
    },
    "properties": {
    "address":"4039 E Raymond St Phoenix, AZ, 85040-1930",
    "building_name":"Allred 40",
    "rba":"89,889"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0139438,33.4126096 ]
    },
    "properties": {
    "address":"4025 S Riverpoint Pky Phoenix, AZ, 85040",
    "building_name":"",
    "rba":"267,962"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0127451,33.4113959 ]
    },
    "properties": {
    "address":"4035 S Riverpoint Pky Phoenix, AZ, 85040",
    "building_name":"",
    "rba":"165,851"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0137524,33.4109973 ]
    },
    "properties": {
    "address":"4045 S Riverpoint Pky Phoenix, AZ, 85040",
    "building_name":"",
    "rba":"165,851"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9818259,33.4222878 ]
    },
    "properties": {
    "address":"4636 E University Dr Phoenix, AZ, 85034-7418",
    "building_name":"Phoenix Airport Center",
    "rba":"38,315"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.97763,33.446575 ]
    },
    "properties": {
    "address":"4801 E Washington St Phoenix, AZ, 85034-2004",
    "building_name":"",
    "rba":"132,263"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9723992,33.4462803 ]
    },
    "properties": {
    "address":"5055 E Washington St Phoenix, AZ, 85034",
    "building_name":"",
    "rba":"51,810"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.020935,33.5093242 ]
    },
    "properties": {
    "address":"2801 E Camelback Rd Phoenix, AZ, 85016",
    "building_name":"Camelback Collective",
    "rba":"118,090"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.033809,33.508585 ]
    },
    "properties": {
    "address":"2201 E Camelback Rd Phoenix, AZ, 85016-3431",
    "building_name":"Anchor Centre West",
    "rba":"198,493"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0639052,33.5067578 ]
    },
    "properties": {
    "address":"4745 N 7th St Phoenix, AZ, 85014-3665",
    "building_name":"Valley Commerce Center - South Bldg",
    "rba":"106,984"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0641186,33.5073079 ]
    },
    "properties": {
    "address":"4747 N 7th St Phoenix, AZ, 85014-3653",
    "building_name":"Valley Commerce Center North Bldg",
    "rba":"107,016"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.046789,33.515411 ]
    },
    "properties": {
    "address":"5343 N 16th St Phoenix, AZ, 85016-3231",
    "building_name":"The Madison",
    "rba":"88,178"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.046756,33.516095 ]
    },
    "properties": {
    "address":"5353 N 16th St Phoenix, AZ, 85016-3224",
    "building_name":"",
    "rba":"89,134"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.033758,33.50738 ]
    },
    "properties": {
    "address":"4747 N 22nd St Phoenix, AZ, 85016-4758",
    "building_name":"Anchor Centre II",
    "rba":"49,212"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0281442,33.5275136 ]
    },
    "properties": {
    "address":"6201 N 24th Pky Phoenix, AZ, 85016-2023",
    "building_name":"Best Western Worldwide Headquarters",
    "rba":"65,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0310537,33.5061248 ]
    },
    "properties": {
    "address":"4722 N 24th St Phoenix, AZ, 85016-4800",
    "building_name":"Elevate 24",
    "rba":"177,944"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0308145,33.506956 ]
    },
    "properties": {
    "address":"4742 N 24th St Phoenix, AZ, 85016-4858",
    "building_name":"Elevate 24",
    "rba":"145,426"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0280666,33.524522 ]
    },
    "properties": {
    "address":"6001 N 24th St Phoenix, AZ, 85016-2018",
    "building_name":"Bldg C",
    "rba":"38,130"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0288012,33.5251344 ]
    },
    "properties": {
    "address":"6001 N 24th St Phoenix, AZ, 85016-2018",
    "building_name":"Bldg B",
    "rba":"101,778"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0265681,33.5293663 ]
    },
    "properties": {
    "address":"6225 N 24th St Phoenix, AZ, 85016-2020",
    "building_name":"24th at Lincoln",
    "rba":"86,451"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0257075,33.5304219 ]
    },
    "properties": {
    "address":"6245 N 24th St Phoenix, AZ, 85016-2034",
    "building_name":"Biltmore 24",
    "rba":"44,174"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9962175,33.5120579 ]
    },
    "properties": {
    "address":"5050 N 40th St Phoenix, AZ, 85018-2139",
    "building_name":"5050 @ Camelback",
    "rba":"71,717"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.996786,33.5121261 ]
    },
    "properties": {
    "address":"5060 N 40th St Phoenix, AZ, 85018-2145",
    "building_name":"5060 Building",
    "rba":"28,465"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.99773,33.512638 ]
    },
    "properties": {
    "address":"5070 N 40th St Phoenix, AZ, 85018-2148",
    "building_name":"The 5070 Bldg",
    "rba":"22,049"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.99842,33.513328 ]
    },
    "properties": {
    "address":"5080 N 40th St Phoenix, AZ, 85018-2147",
    "building_name":"Northbank",
    "rba":"67,767"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9958297,33.5131334 ]
    },
    "properties": {
    "address":"5090 N 40th St Phoenix, AZ, 85018-2111",
    "building_name":"5090 Building",
    "rba":"175,835"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9973109,33.5134196 ]
    },
    "properties": {
    "address":"5110 N 40th St Phoenix, AZ, 85018-2126",
    "building_name":"",
    "rba":"31,231"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0285728,33.5266735 ]
    },
    "properties": {
    "address":"2400 E Arizona Biltmore Cir Phoenix, AZ, 85016",
    "building_name":"Building 2",
    "rba":"23,113"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0291999,33.5270822 ]
    },
    "properties": {
    "address":"2400 E Arizona Biltmore Cir Phoenix, AZ, 85016-2107",
    "building_name":"Building 4",
    "rba":"23,887"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0269099,33.5253214 ]
    },
    "properties": {
    "address":"2525 E Arizona Biltmore Cir Phoenix, AZ, 85016-2146",
    "building_name":"Biltmore Pavilions",
    "rba":"59,706"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0456523,33.5067152 ]
    },
    "properties": {
    "address":"1661 E Camelback Rd Phoenix, AZ, 85016-3911",
    "building_name":"Camelback Arboleda",
    "rba":"178,792"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.042538,33.5075246 ]
    },
    "properties": {
    "address":"1801 E Camelback Rd Phoenix, AZ, 85016-4163",
    "building_name":"The Bridge at Camelback",
    "rba":"479,250"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0350757,33.5088583 ]
    },
    "properties": {
    "address":"2141 E Camelback Rd Phoenix, AZ, 85016-4764",
    "building_name":"",
    "rba":"34,684"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0349012,33.5098453 ]
    },
    "properties": {
    "address":"2198 E Camelback Rd Phoenix, AZ, 85016-4742",
    "building_name":"",
    "rba":"56,023"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0338722,33.5099717 ]
    },
    "properties": {
    "address":"2200 E Camelback Rd Phoenix, AZ, 85016-3454",
    "building_name":"AMTrust Bank Center",
    "rba":"46,523"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0327936,33.5098107 ]
    },
    "properties": {
    "address":"2222 E Camelback Rd Phoenix, AZ, 85016-3428",
    "building_name":"Bank USA",
    "rba":"30,662"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0327106,33.5084868 ]
    },
    "properties": {
    "address":"2231 E Camelback Rd Phoenix, AZ, 85016-3453",
    "building_name":"Anchor Centre East",
    "rba":"134,791"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0321053,33.508614 ]
    },
    "properties": {
    "address":"2325 E Camelback Rd Phoenix, AZ, 85016",
    "building_name":"24th at Camelback II",
    "rba":"306,877"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0318115,33.5071832 ]
    },
    "properties": {
    "address":"2355 E Camelback Rd Phoenix, AZ, 85016-3458",
    "building_name":"Camelback Center",
    "rba":"250,170"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0318603,33.5081405 ]
    },
    "properties": {
    "address":"2375 E Camelback Rd Phoenix, AZ, 85016-3424",
    "building_name":"24th At Camelback",
    "rba":"302,209"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0318964,33.5097952 ]
    },
    "properties": {
    "address":"2390 E Camelback Rd Phoenix, AZ, 85016-3448",
    "building_name":"Biltmore Center I",
    "rba":"211,624"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0317504,33.5108065 ]
    },
    "properties": {
    "address":"2394 E Camelback Rd Phoenix, AZ, 85016-3429",
    "building_name":"Biltmore Center III",
    "rba":"135,350"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0308914,33.5100479 ]
    },
    "properties": {
    "address":"2398 E Camelback Rd Phoenix, AZ, 85016-9001",
    "building_name":"Biltmore Center II",
    "rba":"288,435"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.028804,33.508077 ]
    },
    "properties": {
    "address":"2415 E Camelback Rd Phoenix, AZ, 85016-4288",
    "building_name":"Esplanade III",
    "rba":"218,387"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0281525,33.5087403 ]
    },
    "properties": {
    "address":"2425 E Camelback Rd Phoenix, AZ, 85016-4200",
    "building_name":"Esplanade I",
    "rba":"235,077"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0271558,33.5087668 ]
    },
    "properties": {
    "address":"2525 E Camelback Rd Phoenix, AZ, 85016-4219",
    "building_name":"Camelback Esplanade II",
    "rba":"235,077"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0261218,33.5090218 ]
    },
    "properties": {
    "address":"2555 E Camelback Rd Phoenix, AZ, 85016-9256",
    "building_name":"Camelback Esplanade V",
    "rba":"235,773"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.025994,33.508257 ]
    },
    "properties": {
    "address":"2575 E Camelback Rd Phoenix, AZ, 85016-4240",
    "building_name":"Camelback Esplanade IV",
    "rba":"264,267"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0233113,33.510274 ]
    },
    "properties": {
    "address":"2710 E Camelback Rd Phoenix, AZ, 85016-4372",
    "building_name":"Camelback Lakes | 2710 Bldg",
    "rba":"30,848"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0227892,33.5103398 ]
    },
    "properties": {
    "address":"2720 E Camelback Rd Phoenix, AZ, 85016-4340",
    "building_name":"2720 Bldg",
    "rba":"33,758"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0223291,33.5103849 ]
    },
    "properties": {
    "address":"2730 E Camelback Rd Phoenix, AZ, 85016-4343",
    "building_name":"2730 Bldg",
    "rba":"28,755"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0220016,33.5089131 ]
    },
    "properties": {
    "address":"2777 E Camelback Rd Phoenix, AZ, 85016-4347",
    "building_name":"",
    "rba":"104,618"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0211764,33.5105944 ]
    },
    "properties": {
    "address":"2850 E Camelback Rd Phoenix, AZ, 85016-4311",
    "building_name":"2850 Bldg",
    "rba":"136,540"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.019129,33.5094534 ]
    },
    "properties": {
    "address":"2901 E Camelback Rd Phoenix, AZ, 85016-4431",
    "building_name":"",
    "rba":"22,172"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0180671,33.5094359 ]
    },
    "properties": {
    "address":"2929 E Camelback Rd Phoenix, AZ, 85016-4424",
    "building_name":"Royal Biltmore",
    "rba":"76,974"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.01641,33.5095144 ]
    },
    "properties": {
    "address":"3001 E Camelback Rd Phoenix, AZ, 85016-4433",
    "building_name":"Plaza 3001",
    "rba":"26,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0166762,33.510999 ]
    },
    "properties": {
    "address":"3020 E Camelback Rd Phoenix, AZ, 85016-4417",
    "building_name":"",
    "rba":"79,938"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.016656,33.510492 ]
    },
    "properties": {
    "address":"3030 E Camelback Rd Phoenix, AZ, 85016-4404",
    "building_name":"",
    "rba":"28,094"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.01349,33.509315 ]
    },
    "properties": {
    "address":"3131 E Camelback Rd Phoenix, AZ, 85016-4500",
    "building_name":"",
    "rba":"196,332"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0134417,33.5080371 ]
    },
    "properties": {
    "address":"3133 E Camelback Rd Phoenix, AZ, 85016-4538",
    "building_name":"",
    "rba":"99,069"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.012174,33.510782 ]
    },
    "properties": {
    "address":"3200 E Camelback Rd Phoenix, AZ, 85018-2311",
    "building_name":"Biltmore Commerce Center",
    "rba":"259,730"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0094161,33.5095347 ]
    },
    "properties": {
    "address":"3333 E Camelback Rd Phoenix, AZ, 85018-2322",
    "building_name":"Biltmore Talon Center",
    "rba":"96,248"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9975266,33.5108664 ]
    },
    "properties": {
    "address":"3900 E Camelback Rd Phoenix, AZ, 85018",
    "building_name":"3900 Camelback Center",
    "rba":"177,520"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9876779,33.509082 ]
    },
    "properties": {
    "address":"4343 E Camelback Rd Phoenix, AZ, 85018-2700",
    "building_name":"Londen Center",
    "rba":"106,854"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9847375,33.5086369 ]
    },
    "properties": {
    "address":"4455 E Camelback Rd Phoenix, AZ, 85018-2843",
    "building_name":"",
    "rba":"103,832"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0448423,33.5059103 ]
    },
    "properties": {
    "address":"1702 E Highland Ave Phoenix, AZ, 85016-4664",
    "building_name":"Make-A-Wish America",
    "rba":"92,153"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0364328,33.5048035 ]
    },
    "properties": {
    "address":"2111 E Highland Ave Phoenix, AZ, 85016-4741",
    "building_name":"Park One Bldg B",
    "rba":"131,190"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0356096,33.5059538 ]
    },
    "properties": {
    "address":"2122 E Highland Ave Phoenix, AZ, 85016-4739",
    "building_name":"Biltmore Terrace",
    "rba":"53,235"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0349726,33.505269 ]
    },
    "properties": {
    "address":"2141 E Highland Ave Phoenix, AZ, 85016-4736",
    "building_name":"Park One Bldg A",
    "rba":"66,109"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0349037,33.5062731 ]
    },
    "properties": {
    "address":"2150 E Highland Ave Phoenix, AZ, 85016-4718",
    "building_name":"Town & Country Financial Ctr - Ph I",
    "rba":"33,858"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.064226,33.516026 ]
    },
    "properties": {
    "address":"711 E Missouri Ave Phoenix, AZ, 85014-2841",
    "building_name":"711 East Missouri Avenue",
    "rba":"42,210"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0318321,33.466595 ]
    },
    "properties": {
    "address":"2324 E McDowell Rd Phoenix, AZ, 85006-2440",
    "building_name":"United States Department of Agriculture",
    "rba":"33,258"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.977221,33.4668065 ]
    },
    "properties": {
    "address":"4832 E McDowell Rd Phoenix, AZ, 85008-4231",
    "building_name":"Bldg D",
    "rba":"34,440"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1185832,33.605345 ]
    },
    "properties": {
    "address":"13430 N Black Canyon Hwy Phoenix, AZ, 85029-1348",
    "building_name":"North Black Canyon 13430",
    "rba":"138,940"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1156624,33.6217395 ]
    },
    "properties": {
    "address":"15002 N 25th Dr Phoenix, AZ, 85023-5000",
    "building_name":"",
    "rba":"43,584"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0747106,33.449909 ]
    },
    "properties": {
    "address":"101 N 1st Ave Phoenix, AZ, 85003-1902",
    "building_name":"U.S. Bank Center",
    "rba":"373,013"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.075722,33.451853 ]
    },
    "properties": {
    "address":"302 N 1st Ave Phoenix, AZ, 85003-1500",
    "building_name":"Public Transit Building",
    "rba":"106,386"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0721415,33.4485655 ]
    },
    "properties": {
    "address":"1 N 1st St Phoenix, AZ, 85004-2357",
    "building_name":"The Department",
    "rba":"127,313"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0721841,33.4438921 ]
    },
    "properties": {
    "address":"411 S 1st St Phoenix, AZ, 85004-2502",
    "building_name":"",
    "rba":"26,134"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0760948,33.4501549 ]
    },
    "properties": {
    "address":"135 N 2nd Ave Phoenix, AZ, 85003-2013",
    "building_name":"Ellis Building",
    "rba":"63,676"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0715492,33.4429514 ]
    },
    "properties": {
    "address":"502 S 2nd St Phoenix, AZ, 85004-2551",
    "building_name":"",
    "rba":"25,200"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.072111,33.442897 ]
    },
    "properties": {
    "address":"101 E Buchanan St Phoenix, AZ, 85004-2517",
    "building_name":"Warehouse District",
    "rba":"26,520"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0734307,33.4486537 ]
    },
    "properties": {
    "address":"1 N Central Ave Phoenix, AZ, 85004-4414",
    "building_name":"One North Central",
    "rba":"410,053"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742723,33.4485942 ]
    },
    "properties": {
    "address":"2 N Central Ave Phoenix, AZ, 85004-2322",
    "building_name":"One Renaissance Square",
    "rba":"503,205"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0746574,33.4490099 ]
    },
    "properties": {
    "address":"40 N Central Ave Phoenix, AZ, 85004-4424",
    "building_name":"Two Renaissance Square",
    "rba":"488,616"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.07429,33.4497605 ]
    },
    "properties": {
    "address":"112 N Central Ave Phoenix, AZ, 85004-2309",
    "building_name":"Heard Building",
    "rba":"82,246"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0731471,33.4509488 ]
    },
    "properties": {
    "address":"201 N Central Ave Phoenix, AZ, 85004-0073",
    "building_name":"Chase Tower",
    "rba":"723,922"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742157,33.4509835 ]
    },
    "properties": {
    "address":"234 N Central Ave Phoenix, AZ, 85004-2208",
    "building_name":"Security Center",
    "rba":"204,278"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0733432,33.4517223 ]
    },
    "properties": {
    "address":"333 N Central Ave Phoenix, AZ, 85004",
    "building_name":"Freeport-McMoRan Tower",
    "rba":"257,522"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0734905,33.4529752 ]
    },
    "properties": {
    "address":"411 N Central Ave Phoenix, AZ, 85004-2115",
    "building_name":"University Center",
    "rba":"168,699"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0735379,33.4589125 ]
    },
    "properties": {
    "address":"1001 N Central Ave Phoenix, AZ, 85004-1935",
    "building_name":"Ten-0-One At Ro2",
    "rba":"110,009"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0669738,33.4400475 ]
    },
    "properties": {
    "address":"515 E Grant St Phoenix, AZ, 85004-2633",
    "building_name":"The Lawrence Building",
    "rba":"122,220"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0744521,33.4453104 ]
    },
    "properties": {
    "address":"20 W Jackson St Phoenix, AZ, 85003-2404",
    "building_name":"The Depot",
    "rba":"21,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0740202,33.4468291 ]
    },
    "properties": {
    "address":"11 W Jefferson St Phoenix, AZ, 85003-2306",
    "building_name":"Luhrs Bldg",
    "rba":"103,481"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0748589,33.4469622 ]
    },
    "properties": {
    "address":"45 W Jefferson St Phoenix, AZ, 85003-2307",
    "building_name":"Luhrs Tower",
    "rba":"56,740"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0679537,33.44152 ]
    },
    "properties": {
    "address":"475 E Lincoln St Phoenix, AZ, 85004-2540",
    "building_name":"Lincoln Union",
    "rba":"93,420"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0758147,33.4456988 ]
    },
    "properties": {
    "address":"101 W Madison St Phoenix, AZ, 85003-2123",
    "building_name":"Maricopa County Court Tower",
    "rba":"695,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0755059,33.4500524 ]
    },
    "properties": {
    "address":"111 W Monroe St Phoenix, AZ, 85003-1742",
    "building_name":"The Monroe",
    "rba":"267,760"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.070981,33.451886 ]
    },
    "properties": {
    "address":"200 E Van Buren St Phoenix, AZ, 85004-2238",
    "building_name":"200EVB",
    "rba":"240,076"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0686765,33.4518019 ]
    },
    "properties": {
    "address":"400 E Van Buren St Phoenix, AZ, 85004-2223",
    "building_name":"One Arizona Center",
    "rba":"347,055"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0733583,33.4480193 ]
    },
    "properties": {
    "address":"1 E Washington St Phoenix, AZ, 85004",
    "building_name":"CityScape",
    "rba":"603,787"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0718328,33.4479353 ]
    },
    "properties": {
    "address":"101 E Washington St Phoenix, AZ, 85004-2342",
    "building_name":"Block 23 At CityScape",
    "rba":"297,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.070657,33.447209 ]
    },
    "properties": {
    "address":"201 E Washington St Phoenix, AZ, 85004-2428",
    "building_name":"Collier Center",
    "rba":"567,163"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0759409,33.4486439 ]
    },
    "properties": {
    "address":"100 W Washington St Phoenix, AZ, 85003-1805",
    "building_name":"Wells Fargo Bank Plaza",
    "rba":"473,286"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0772453,33.4853142 ]
    },
    "properties": {
    "address":"3141 N 3rd Ave Phoenix, AZ, 85012",
    "building_name":"Burgbacher Building- Park Central",
    "rba":"193,060"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0700949,33.4834166 ]
    },
    "properties": {
    "address":"3030 N 3rd St Phoenix, AZ, 85012-3074",
    "building_name":"Copper Point Tower",
    "rba":"252,400"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0690126,33.4926206 ]
    },
    "properties": {
    "address":"3839 N 3rd St Phoenix, AZ, 85012-2066",
    "building_name":"Fairmount On 3rd",
    "rba":"41,567"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.069002,33.4940995 ]
    },
    "properties": {
    "address":"4001 N 3rd St Phoenix, AZ, 85012-2060",
    "building_name":"Fairmount Place",
    "rba":"78,233"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0744796,33.4684362 ]
    },
    "properties": {
    "address":"1850 N Central Ave Phoenix, AZ, 85004-4527",
    "building_name":"BMO Tower at Central Arts Plaza",
    "rba":"478,751"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0733215,33.4696147 ]
    },
    "properties": {
    "address":"2005 N Central Ave Phoenix, AZ, 85004-1592",
    "building_name":"Central Palm Plaza",
    "rba":"78,320"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0744083,33.4703095 ]
    },
    "properties": {
    "address":"2020 N Central Ave Phoenix, AZ, 85004-4501",
    "building_name":"2020 On Central",
    "rba":"247,645"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742782,33.4751264 ]
    },
    "properties": {
    "address":"2400 N Central Ave Phoenix, AZ, 85004-1341",
    "building_name":"2400 North Central Holding LLC",
    "rba":"52,100"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0743452,33.4771517 ]
    },
    "properties": {
    "address":"2600 N Central Ave Phoenix, AZ, 85004-3050",
    "building_name":"2600 Tower",
    "rba":"323,607"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742561,33.4780559 ]
    },
    "properties": {
    "address":"2700 N Central Ave Phoenix, AZ, 85004-1133",
    "building_name":"2700 Tower",
    "rba":"220,949"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0744542,33.4788699 ]
    },
    "properties": {
    "address":"2800 N Central Ave Phoenix, AZ, 85004-1007",
    "building_name":"2800 Tower",
    "rba":"370,736"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.074604,33.479932 ]
    },
    "properties": {
    "address":"2828 N Central Ave Phoenix, AZ, 85004-1021",
    "building_name":"",
    "rba":"104,016"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0731616,33.4809652 ]
    },
    "properties": {
    "address":"2901 N Central Ave Phoenix, AZ, 85012-2700",
    "building_name":"Phoenix Plaza Tower I",
    "rba":"475,986"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0733679,33.481661 ]
    },
    "properties": {
    "address":"2929 N Central Ave Phoenix, AZ, 85012-2727",
    "building_name":"Phoenix Plaza Tower II",
    "rba":"427,890"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0731008,33.4826214 ]
    },
    "properties": {
    "address":"3003 N Central Ave Phoenix, AZ, 85012-2902",
    "building_name":"Phoenix Corporate Tower",
    "rba":"457,893"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742988,33.482013 ]
    },
    "properties": {
    "address":"3030 N Central Ave Phoenix, AZ, 85012-2707",
    "building_name":"3030 North Central",
    "rba":"189,868"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0731273,33.4835765 ]
    },
    "properties": {
    "address":"3033 N Central Ave Phoenix, AZ, 85012-2809",
    "building_name":"Phoenix Professional Towers",
    "rba":"134,164"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.073397,33.4842887 ]
    },
    "properties": {
    "address":"3101 N Central Ave Phoenix, AZ, 85012-2645",
    "building_name":"CBIZ Plaza",
    "rba":"269,463"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0752604,33.4840919 ]
    },
    "properties": {
    "address":"3110 N Central Ave Phoenix, AZ, 85012-2695",
    "building_name":"Goldwater Building- Park Central",
    "rba":"92,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0761048,33.4839029 ]
    },
    "properties": {
    "address":"3110 N Central Ave Phoenix, AZ, 85012-2695",
    "building_name":"Leib Building- Park Central",
    "rba":"43,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0772921,33.4844256 ]
    },
    "properties": {
    "address":"3110 N Central Ave Phoenix, AZ, 85012-2695",
    "building_name":"Straus Building- Park Central",
    "rba":"30,300"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.075504,33.4834552 ]
    },
    "properties": {
    "address":"3110 N Central Ave Phoenix, AZ, 85012-2695",
    "building_name":"Diamond Building- Park Central",
    "rba":"71,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0744024,33.4856576 ]
    },
    "properties": {
    "address":"3200 N Central Ave Phoenix, AZ, 85012-2425",
    "building_name":"3200 N Central",
    "rba":"346,027"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0742842,33.486973 ]
    },
    "properties": {
    "address":"3300 N Central Ave Phoenix, AZ, 85012-2501",
    "building_name":"3300 N Central",
    "rba":"363,655"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0729875,33.4877706 ]
    },
    "properties": {
    "address":"3443 N Central Ave Phoenix, AZ, 85012-2204",
    "building_name":"Phoenix Financial Center",
    "rba":"285,834"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0743929,33.4890749 ]
    },
    "properties": {
    "address":"3550 N Central Ave Phoenix, AZ, 85012-2105",
    "building_name":"The 3550",
    "rba":"284,709"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.074566,33.490482 ]
    },
    "properties": {
    "address":"3636 N Central Ave Phoenix, AZ, 85012-1927",
    "building_name":"",
    "rba":"219,032"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0746629,33.4918529 ]
    },
    "properties": {
    "address":"3800 N Central Ave Phoenix, AZ, 85012-1992",
    "building_name":"3800 Tower",
    "rba":"216,380"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.075593,33.491519 ]
    },
    "properties": {
    "address":"3838 N Central Ave Phoenix, AZ, 85012-1906",
    "building_name":"3838 Tower",
    "rba":"236,324"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.075483,33.4926213 ]
    },
    "properties": {
    "address":"4000 N Central Ave Phoenix, AZ, 85012-1959",
    "building_name":"4000 Tower",
    "rba":"299,562"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.072921,33.4939688 ]
    },
    "properties": {
    "address":"4041 N Central Ave Phoenix, AZ, 85012-3330",
    "building_name":"Younan Central Plaza",
    "rba":"405,693"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.078566,33.491948 ]
    },
    "properties": {
    "address":"300 W Clarendon Ave Phoenix, AZ, 85013-3420",
    "building_name":"Clarendon Place",
    "rba":"91,353"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.071479,33.484257 ]
    },
    "properties": {
    "address":"202 E Earll Dr Phoenix, AZ, 85012-2634",
    "building_name":"",
    "rba":"99,245"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0701414,33.4841583 ]
    },
    "properties": {
    "address":"210 E Earll Dr Phoenix, AZ, 85012-2626",
    "building_name":"",
    "rba":"158,249"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0656818,33.5158503 ]
    },
    "properties": {
    "address":"645 E Missouri Ave Phoenix, AZ, 85012-1369",
    "building_name":"Missouri Falls",
    "rba":"190,419"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0715397,33.4806073 ]
    },
    "properties": {
    "address":"20 E Thomas Rd Phoenix, AZ, 85012-3110",
    "building_name":"20 East Thomas",
    "rba":"586,403"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0644653,33.4907707 ]
    },
    "properties": {
    "address":"3707 N 7th St Phoenix, AZ, 85014-5059",
    "building_name":"Siete Square II",
    "rba":"54,072"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0643394,33.491473 ]
    },
    "properties": {
    "address":"3737 N 7th St Phoenix, AZ, 85014-5017",
    "building_name":"Siete Square I",
    "rba":"57,933"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.064472,33.4919734 ]
    },
    "properties": {
    "address":"3807 N 7th St Phoenix, AZ, 85014-5005",
    "building_name":"Siete Square III",
    "rba":"22,198"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0645825,33.4924687 ]
    },
    "properties": {
    "address":"3877 N 7th St Phoenix, AZ, 85014-5072",
    "building_name":"Siete Square IV",
    "rba":"57,541"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0425144,33.4551317 ]
    },
    "properties": {
    "address":"525 N 18th St Phoenix, AZ, 85006",
    "building_name":"Medical Office Building B",
    "rba":"56,707"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0394651,33.4936856 ]
    },
    "properties": {
    "address":"4020 N 20th St Phoenix, AZ, 85016-6028",
    "building_name":"4020 N 20th St",
    "rba":"37,571"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.038637,33.495933 ]
    },
    "properties": {
    "address":"4105 N 20th St Phoenix, AZ, 85016-6027",
    "building_name":"Tudor Plaza",
    "rba":"22,436"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0306992,33.4750279 ]
    },
    "properties": {
    "address":"2500 N 24th St Phoenix, AZ, 85008-1842",
    "building_name":"Commonwealth Casuality Company",
    "rba":"28,054"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0307617,33.4791564 ]
    },
    "properties": {
    "address":"2850 N 24th St Phoenix, AZ, 85008-1004",
    "building_name":"Southwest Human Development",
    "rba":"64,740"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.029455,33.495841 ]
    },
    "properties": {
    "address":"4131 N 24th St Phoenix, AZ, 85016-6262",
    "building_name":"La Costa Place",
    "rba":"42,160"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0625747,33.4650073 ]
    },
    "properties": {
    "address":"755 E McDowell Rd Phoenix, AZ, 85006-2506",
    "building_name":"Clyde Wright Health Care Center",
    "rba":"86,950"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.061047,33.4654493 ]
    },
    "properties": {
    "address":"925 E McDowell Rd Phoenix, AZ, 85006",
    "building_name":"Good Samaritan Health Center",
    "rba":"36,325"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0573272,33.4662284 ]
    },
    "properties": {
    "address":"1130 E McDowell Rd Phoenix, AZ, 85006-2611",
    "building_name":"Fresh Start Women's Foundation Resource Centr",
    "rba":"22,500"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0089327,33.4653743 ]
    },
    "properties": {
    "address":"3333 E Mcdowell Rd Phoenix, AZ, 85008",
    "building_name":"",
    "rba":"22,349"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.00454,33.465066 ]
    },
    "properties": {
    "address":"3551 E McDowell Rd Phoenix, AZ, 85008-3847",
    "building_name":"",
    "rba":"30,250"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0469023,33.4398302 ]
    },
    "properties": {
    "address":"811 S 16th St Phoenix, AZ, 85034-4129",
    "building_name":"Bldg 2",
    "rba":"49,200"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.982793,33.423924 ]
    },
    "properties": {
    "address":"2617 S 46th St Phoenix, AZ, 85034-7403",
    "building_name":"Phoenix Airport Center II",
    "rba":"35,768"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.982544,33.4263694 ]
    },
    "properties": {
    "address":"4601 E Hilton Ave Phoenix, AZ, 85034-6406",
    "building_name":"Phoenix Airport Center V",
    "rba":"60,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9805868,33.4263062 ]
    },
    "properties": {
    "address":"4602 E Hilton Ave Phoenix, AZ, 85034-6400",
    "building_name":"",
    "rba":"32,460"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9799566,33.4262918 ]
    },
    "properties": {
    "address":"4717 E Hilton Ave Phoenix, AZ, 85034-6404",
    "building_name":"",
    "rba":"148,446"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.984616,33.464228 ]
    },
    "properties": {
    "address":"4501 E McDowell Rd Phoenix, AZ, 85008-4505",
    "building_name":"",
    "rba":"64,449"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9828376,33.4227348 ]
    },
    "properties": {
    "address":"4602 E University Dr Phoenix, AZ, 85034-7421",
    "building_name":"Phoenix Airport Center I",
    "rba":"32,460"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1096148,33.5688641 ]
    },
    "properties": {
    "address":"9033 N 23rd Ave Phoenix, AZ, 85021-2847",
    "building_name":"Bldg 4",
    "rba":"23,884"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1092654,33.5886945 ]
    },
    "properties": {
    "address":"11226 N 23rd Ave Phoenix, AZ, 85029-4830",
    "building_name":"Bldg B-I",
    "rba":"35,200"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.110773,33.584925 ]
    },
    "properties": {
    "address":"10850 N 24th Ave Phoenix, AZ, 85029-4793",
    "building_name":"Bldg 1",
    "rba":"55,606"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.114804,33.576341 ]
    },
    "properties": {
    "address":"10010 N 25th Ave Phoenix, AZ, 85021-1660",
    "building_name":"Corporate Center",
    "rba":"74,257"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1003418,33.4860792 ]
    },
    "properties": {
    "address":"3310 N 19th Ave Phoenix, AZ, 85015-5701",
    "building_name":"",
    "rba":"27,689"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1000312,33.5875346 ]
    },
    "properties": {
    "address":"11040 N 19th Ave Phoenix, AZ, 85029-4815",
    "building_name":"Pete King Corp Bldg",
    "rba":"34,120"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.107132,33.562969 ]
    },
    "properties": {
    "address":"8620 N 22nd Ave Phoenix, AZ, 85021-4251",
    "building_name":"Metro Office Center",
    "rba":"124,252"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1067162,33.565087 ]
    },
    "properties": {
    "address":"8800 N 22nd Ave Phoenix, AZ, 85021-4258",
    "building_name":"",
    "rba":"38,238"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1093729,33.5579924 ]
    },
    "properties": {
    "address":"8220 N 23rd Ave Phoenix, AZ, 85021",
    "building_name":"Blue Cross/Blue Shield",
    "rba":"77,136"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.109146,33.558688 ]
    },
    "properties": {
    "address":"8220 N 23rd Ave Phoenix, AZ, 85021-4872",
    "building_name":"Blue Cross Blue Shield of Arizona",
    "rba":"74,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.112941,33.572138 ]
    },
    "properties": {
    "address":"9414 N 25th Ave Phoenix, AZ, 85021-2706",
    "building_name":"",
    "rba":"31,764"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.113731,33.574441 ]
    },
    "properties": {
    "address":"9630 N 25th Ave Phoenix, AZ, 85021-2700",
    "building_name":"Phase III",
    "rba":"116,813"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.115384,33.576743 ]
    },
    "properties": {
    "address":"10020 N 25th Ave Phoenix, AZ, 85021-1660",
    "building_name":"Phase I",
    "rba":"39,436"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.114894,33.577079 ]
    },
    "properties": {
    "address":"10030 N 25th Ave Phoenix, AZ, 85021-1660",
    "building_name":"Phase I",
    "rba":"74,589"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.114791,33.5777684 ]
    },
    "properties": {
    "address":"10040 N 25th Ave Phoenix, AZ, 85021-1601",
    "building_name":"Phase II",
    "rba":"23,178"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.11493,33.578056 ]
    },
    "properties": {
    "address":"10050 N 25th Ave Phoenix, AZ, 85021-1600",
    "building_name":"Phase II",
    "rba":"49,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.114804,33.578599 ]
    },
    "properties": {
    "address":"10210 N 25th Ave Phoenix, AZ, 85021-1608",
    "building_name":"Phase II",
    "rba":"48,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.115056,33.578905 ]
    },
    "properties": {
    "address":"10220 N 25th Ave Phoenix, AZ, 85021-1605",
    "building_name":"Phase II",
    "rba":"23,035"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1139626,33.5812933 ]
    },
    "properties": {
    "address":"10400 N 25th Ave Phoenix, AZ, 85021-1661",
    "building_name":"Corporate Center",
    "rba":"109,332"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.114685,33.585509 ]
    },
    "properties": {
    "address":"10835 N 25th Ave Phoenix, AZ, 85029-4751",
    "building_name":"Black Canyon Center",
    "rba":"98,760"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.115653,33.491023 ]
    },
    "properties": {
    "address":"3615 N 27th Ave Phoenix, AZ, 85017-4701",
    "building_name":"",
    "rba":"120,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1157329,33.5862922 ]
    },
    "properties": {
    "address":"11001 N Black Canyon Fwy Phoenix, AZ, 85029-4757",
    "building_name":"The Grove at Black Canyon",
    "rba":"100,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1149335,33.5843904 ]
    },
    "properties": {
    "address":"10851 N Black Canyon Hwy Phoenix, AZ, 85029-4755",
    "building_name":"Black Canyon Tower",
    "rba":"147,731"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1078019,33.5679871 ]
    },
    "properties": {
    "address":"2222 W Dunlap Ave Phoenix, AZ, 85021-2818",
    "building_name":"Concorde Commerce Center",
    "rba":"140,103"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.107543,33.566743 ]
    },
    "properties": {
    "address":"2233 W Dunlap Ave Phoenix, AZ, 85021-2859",
    "building_name":"The Art Institute of Phoenix",
    "rba":"92,103"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1112979,33.5684362 ]
    },
    "properties": {
    "address":"2400 W Dunlap Ave Phoenix, AZ, 85021-2817",
    "building_name":"Crescent Corporate Center",
    "rba":"108,451"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.112424,33.566082 ]
    },
    "properties": {
    "address":"2445 W Dunlap Ave Phoenix, AZ, 85021-5820",
    "building_name":"Dunlap Business Center",
    "rba":"80,925"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1130923,33.567089 ]
    },
    "properties": {
    "address":"2501 W Dunlap Ave Phoenix, AZ, 85021-2724",
    "building_name":"",
    "rba":"38,387"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.113566,33.5693362 ]
    },
    "properties": {
    "address":"2510 W Dunlap Ave Phoenix, AZ, 85021-2737",
    "building_name":"Canyon Corporate Plaza I",
    "rba":"132,774"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.113478,33.569984 ]
    },
    "properties": {
    "address":"2512 W Dunlap Ave Phoenix, AZ, 85021-2709",
    "building_name":"Canyon Corporate Plaza II",
    "rba":"169,747"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1111178,33.5581944 ]
    },
    "properties": {
    "address":"2444 W Las Palmaritas Dr Phoenix, AZ, 85021-4860",
    "building_name":"Blue Cross/Blue Shield",
    "rba":"126,084"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1120205,33.5581619 ]
    },
    "properties": {
    "address":"2480 W Las Palmaritas Dr Phoenix, AZ, 85021",
    "building_name":"Blue Cross/Blue Shield",
    "rba":"44,551"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.107807,33.581502 ]
    },
    "properties": {
    "address":"2225 W Peoria Ave Phoenix, AZ, 85029-4938",
    "building_name":"",
    "rba":"56,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.1088303,33.5808275 ]
    },
    "properties": {
    "address":"2401 W Peoria Ave Phoenix, AZ, 85029-4790",
    "building_name":"Desert Canyon 100",
    "rba":"102,606"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.109703,33.579774 ]
    },
    "properties": {
    "address":"2411 W Peoria Ave Phoenix, AZ, 85029-4708",
    "building_name":"Desert Canyon 300",
    "rba":"149,211"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.110448,33.580867 ]
    },
    "properties": {
    "address":"2421 W Peoria Ave Phoenix, AZ, 85029-4944",
    "building_name":"Desert Canyon/200",
    "rba":"98,863"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9766354,33.5965956 ]
    },
    "properties": {
    "address":"4835 E Cactus Rd Phoenix, AZ, 85254-4191",
    "building_name":"Paradise Valley Corporate Center",
    "rba":"198,534"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9757594,33.5876154 ]
    },
    "properties": {
    "address":"11201 N Tatum Blvd Phoenix, AZ, 85028-6036",
    "building_name":"Stonecreek Pointe",
    "rba":"110,766"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9769745,33.5884416 ]
    },
    "properties": {
    "address":"11209 N Tatum Blvd Phoenix, AZ, 85028-3091",
    "building_name":"Tatum Ridge",
    "rba":"96,687"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9783533,33.5937807 ]
    },
    "properties": {
    "address":"11801 N Tatum Blvd Phoenix, AZ, 85028-1611",
    "building_name":"PVOP II",
    "rba":"46,834"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9793398,33.5946111 ]
    },
    "properties": {
    "address":"11811 N Tatum Blvd Phoenix, AZ, 85028-1614",
    "building_name":"PVOP III",
    "rba":"268,598"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0507914,33.5481991 ]
    },
    "properties": {
    "address":"7600 N 15th St Phoenix, AZ, 85020-4327",
    "building_name":"The Plaza at Squaw Peak III",
    "rba":"135,379"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0469755,33.5438654 ]
    },
    "properties": {
    "address":"7301 N 16th St Phoenix, AZ, 85020-5265",
    "building_name":"The Peak",
    "rba":"45,840"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.04833,33.54406 ]
    },
    "properties": {
    "address":"7310 N 16th St Phoenix, AZ, 85020-5258",
    "building_name":"Phoenix Peak",
    "rba":"89,099"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0491449,33.548297 ]
    },
    "properties": {
    "address":"7600 N 16th St Phoenix, AZ, 85020-4431",
    "building_name":"Building 2- The Plaza at Squaw Peak",
    "rba":"160,708"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0489783,33.5500434 ]
    },
    "properties": {
    "address":"7720 N 16th St Phoenix, AZ, 85020-4492",
    "building_name":"The Summit",
    "rba":"165,748"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0490018,33.5512968 ]
    },
    "properties": {
    "address":"7740 N 16th St Phoenix, AZ, 85020-4479",
    "building_name":"The Summit",
    "rba":"125,076"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0495009,33.5526945 ]
    },
    "properties": {
    "address":"7878 N 16th St Phoenix, AZ, 85020-4449",
    "building_name":"CASA",
    "rba":"181,138"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0435736,33.5467513 ]
    },
    "properties": {
    "address":"7500 N Dreamy Draw Dr Phoenix, AZ, 85020-4660",
    "building_name":"Building 1- The Plaza at Squaw Peak",
    "rba":"158,964"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0292124,33.5303827 ]
    },
    "properties": {
    "address":"2423 E Lincoln Dr Phoenix, AZ, 85016-1215",
    "building_name":"Charles Schwab",
    "rba":"310,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.062934,33.530325 ]
    },
    "properties": {
    "address":"745 E Maryland Ave Phoenix, AZ, 85014-1522",
    "building_name":"",
    "rba":"25,200"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.01616,33.4079985 ]
    },
    "properties": {
    "address":"4325 S 30th St Phoenix, AZ, 85040",
    "building_name":"Riverpoint-Bldg # 3",
    "rba":"68,699"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.010145,33.410161 ]
    },
    "properties": {
    "address":"4025 S 32nd St Phoenix, AZ, 85040",
    "building_name":"Allred Riverpoint - Phase I",
    "rba":"80,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9941094,33.4027856 ]
    },
    "properties": {
    "address":"4025 E Cotton Center Blvd Phoenix, AZ, 85040-8866",
    "building_name":"Cotton Center I",
    "rba":"114,484"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.992306,33.4024937 ]
    },
    "properties": {
    "address":"4121 E Cotton Center Blvd Phoenix, AZ, 85040-8849",
    "building_name":"Caremark-Phoenix",
    "rba":"99,734"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9900029,33.4014863 ]
    },
    "properties": {
    "address":"4207 E Cotton Center Blvd Phoenix, AZ, 85040-8893",
    "building_name":"Bldg 10 - Phase III",
    "rba":"24,900"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9894949,33.4006702 ]
    },
    "properties": {
    "address":"4217 E Cotton Center Blvd Phoenix, AZ, 85040-8893",
    "building_name":"Bldg 11 - Phase III",
    "rba":"88,140"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.987627,33.401532 ]
    },
    "properties": {
    "address":"4303 E Cotton Center Blvd Phoenix, AZ, 85040-8853",
    "building_name":"Bldg 9 - Phase II",
    "rba":"64,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.986732,33.400761 ]
    },
    "properties": {
    "address":"4313 E Cotton Center Blvd Phoenix, AZ, 85040-8856",
    "building_name":"Bldg 8 - Phase II",
    "rba":"108,874"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9906309,33.4046176 ]
    },
    "properties": {
    "address":"4320 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Quattro - Bldg 2",
    "rba":"57,100"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.986149,33.401408 ]
    },
    "properties": {
    "address":"4323 E Cotton Center Blvd Phoenix, AZ, 85040-8853",
    "building_name":"",
    "rba":"35,262"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.985617,33.40202 ]
    },
    "properties": {
    "address":"4405 E Cotton Center Blvd Phoenix, AZ, 85040-8826",
    "building_name":"Bldg 6 - Phase II",
    "rba":"54,551"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9871908,33.4030298 ]
    },
    "properties": {
    "address":"4410 E Cotton Center Blvd Phoenix, AZ, 85040",
    "building_name":"Bldg 13 - Phase IV",
    "rba":"101,269"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.984856,33.401328 ]
    },
    "properties": {
    "address":"4415 E Cotton Center Blvd Phoenix, AZ, 85040-8871",
    "building_name":"Bldg 5 - Phase II",
    "rba":"35,463"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9819064,33.4007991 ]
    },
    "properties": {
    "address":"4625 E Cotton Center Blvd Phoenix, AZ, 85040-4807",
    "building_name":"Bldg 3",
    "rba":"73,823"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.9803782,33.400837 ]
    },
    "properties": {
    "address":"4675 E Cotton Center Blvd Phoenix, AZ, 85040-4809",
    "building_name":"Bldg 2",
    "rba":"73,804"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0157502,33.4098171 ]
    },
    "properties": {
    "address":"4150 S Riverpoint Pky Phoenix, AZ, 85040",
    "building_name":"Riverpoint-Bldg # 4",
    "rba":"132,880"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0137203,33.4084258 ]
    },
    "properties": {
    "address":"3125 E Wood St Phoenix, AZ, 85040",
    "building_name":"Riverpoint-Bldg # 1",
    "rba":"52,640"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0510083,33.4284239 ]
    },
    "properties": {
    "address":"2070 S 16th St Phoenix, AZ, 85034-5300",
    "building_name":"Sky Harbor Business Center Bldg A",
    "rba":"25,156"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.06114,33.4460708 ]
    },
    "properties": {
    "address":"920 E Madison St Phoenix, AZ, 85034-2247",
    "building_name":"",
    "rba":"33,464"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0830437,33.4498579 ]
    },
    "properties": {
    "address":"100 N 7th Ave Phoenix, AZ, 85007",
    "building_name":"Madison Square",
    "rba":"94,284"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0990475,33.4500524 ]
    },
    "properties": {
    "address":"150 N 18th Ave Phoenix, AZ, 85007",
    "building_name":"",
    "rba":"178,289"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0836701,33.449672 ]
    },
    "properties": {
    "address":"800 W Adams St Phoenix, AZ, 85007-2730",
    "building_name":"Grace Court School",
    "rba":"31,842"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0608571,33.4452337 ]
    },
    "properties": {
    "address":"920 E Jackson St Phoenix, AZ, 85034",
    "building_name":"",
    "rba":"36,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0641993,33.4467006 ]
    },
    "properties": {
    "address":"701 E Jefferson St Phoenix, AZ, 85034-2215",
    "building_name":"Professional Center - Phase II",
    "rba":"80,840"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0635893,33.4467102 ]
    },
    "properties": {
    "address":"801 E Jefferson St Phoenix, AZ, 85034-2217",
    "building_name":"Professional Center",
    "rba":"80,840"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0560133,33.446813 ]
    },
    "properties": {
    "address":"1201 E Jefferson St Phoenix, AZ, 85034-2300",
    "building_name":"New Times Bldg A & B",
    "rba":"36,000"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.0927408,33.4467286 ]
    },
    "properties": {
    "address":"1535 W Jefferson St Phoenix, AZ, 85007",
    "building_name":"",
    "rba":"57,541"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -111.961553,33.450664 ]
    },
    "properties": {
    "address":"5555 E Van Buren St Phoenix, AZ, 85008-3411",
    "building_name":"5555 EVB",
    "rba":"59,459"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -112.11757,33.483001 ]
    },
    "properties": {
    "address":"3002 N 27th Ave Phoenix, AZ, 85017-5028",
    "building_name":"",
    "rba":"30,345"
    }
  }
]
};