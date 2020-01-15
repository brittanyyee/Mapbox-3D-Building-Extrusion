mapboxgl.accessToken = "pk.eyJ1IjoiYnJpdHRhbnl5ZWUiLCJhIjoiY2p1ZTdpN3M4MDBlMzQ0bHJhaDh1b203ZyJ9.Kv9ykdRmPx5utrcMAY9uCg";
var map = new mapboxgl.Map({
    style: "mapbox://styles/brittanyyee/ck542raiz4xcm1dlk4oytsomk",
    center: [-112.073649, 33.449601],
    zoom: 16,
    pitch: 60,
    bearing: -0.0,
}); 
    map.on('load', function () {
        // The 'building' layer in the mapbox-streets vector source contains building-height
        // data from OpenStreetMap.
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
// Source data for the rental floors
var customerData = {
    "type": "FeatureCollection",
    "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9897396,
                    33.4528942
                ]
            },
            "properties": {
                "Property Address": "410 N 44th St",
                "Property Name": "Three Gateway",
                "RBA": 222118,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-7605"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.987871,
                    33.45318
                ]
            },
            "properties": {
                "Property Address": "426 N 44th St",
                "Property Name": "One Gateway",
                "RBA": 107755,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6508"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.987953,
                    33.453798
                ]
            },
            "properties": {
                "Property Address": "432 N 44th St",
                "Property Name": "Two Gateway",
                "RBA": 109682,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-7601"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.989014,
                    33.454332
                ]
            },
            "properties": {
                "Property Address": "444 N 44th St",
                "Property Name": "Four Gateway",
                "RBA": 138240,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-7624"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9866237,
                    33.4541527
                ]
            },
            "properties": {
                "Property Address": "501 N 44th St",
                "Property Name": "501 Gateway",
                "RBA": 103219,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6526"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9863814,
                    33.482415
                ]
            },
            "properties": {
                "Property Address": "2999 N 44th St",
                "Property Name": "Concord Place",
                "RBA": 133522,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-7246"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9858515,
                    33.4835447
                ]
            },
            "properties": {
                "Property Address": "3033 N 44th St",
                "Property Name": "Forum North 44",
                "RBA": 117611,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-7226"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9838089,
                    33.4506462
                ]
            },
            "properties": {
                "Property Address": "225 N 45th St",
                "Property Name": "American Family Mutual Insurance Co.",
                "RBA": 118324,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-1901"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9946717,
                    33.496094
                ]
            },
            "properties": {
                "Property Address": "4020 E Indian School Rd",
                "Property Name": "Forty20",
                "RBA": 38029,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-5220"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9905849,
                    33.4508097
                ]
            },
            "properties": {
                "Property Address": "4127 E Van Buren St",
                "Property Name": "Airport Tech Center (4127 Building)",
                "RBA": 199677,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6932"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9910928,
                    33.4495329
                ]
            },
            "properties": {
                "Property Address": "4129 E Van Buren St",
                "Property Name": "Airport Tech Center (4129 Building)",
                "RBA": 121490,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6939"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9847193,
                    33.4518927
                ]
            },
            "properties": {
                "Property Address": "4646 E Van Buren St",
                "Property Name": "East Gateway Centre I",
                "RBA": 115451,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6915"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.984716,
                    33.4528781
                ]
            },
            "properties": {
                "Property Address": "4686 E Van Buren St",
                "Property Name": "East Gateway Centre II",
                "RBA": 115451,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-6959"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9837061,
                    33.4484206
                ]
            },
            "properties": {
                "Property Address": "4600 E Washington St",
                "Property Name": "",
                "RBA": 188145,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85034
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9867235,
                    33.4059482
                ]
            },
            "properties": {
                "Property Address": "4550 S 44th Pl",
                "Property Name": "Bldg 17 - Phase V",
                "RBA": 54489,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-4011"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9878319,
                    33.4053165
                ]
            },
            "properties": {
                "Property Address": "4610 S 44th Pl",
                "Property Name": "Bldg 16 - Phase V",
                "RBA": 66012,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9862715,
                    33.4039825
                ]
            },
            "properties": {
                "Property Address": "4750 S 44th Pl",
                "Property Name": "Bldg 14 - Phase IV",
                "RBA": 158992,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9847193,
                    33.4042628
                ]
            },
            "properties": {
                "Property Address": "4755 S 44th Pl",
                "Property Name": "Cotton Center Building 19",
                "RBA": 82951,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.97992,
                    33.4274299
                ]
            },
            "properties": {
                "Property Address": "2211 S 47th St",
                "Property Name": "Avnet Global Headquarters",
                "RBA": 176402,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-6403"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9768805,
                    33.3992694
                ]
            },
            "properties": {
                "Property Address": "2727 S 48th St",
                "Property Name": "The Center",
                "RBA": 155000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3143"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9810199,
                    33.4199041
                ]
            },
            "properties": {
                "Property Address": "3150 S 48th St",
                "Property Name": "One Compass Center",
                "RBA": 136194,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-1709"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.979141,
                    33.402958
                ]
            },
            "properties": {
                "Property Address": "4950 S 48th St",
                "Property Name": "Mutual of Omaha",
                "RBA": 73377,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9660104,
                    33.3980942
                ]
            },
            "properties": {
                "Property Address": "1665 W Alameda Dr",
                "Property Name": "The Alameda",
                "RBA": 236188,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3200"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0151738,
                    33.4080839
                ]
            },
            "properties": {
                "Property Address": "3100 E Broadway Rd",
                "Property Name": "Riverpoint-Bldg # 2",
                "RBA": 61316,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9925251,
                    33.4060189
                ]
            },
            "properties": {
                "Property Address": "4141 E Broadway Rd",
                "Property Name": "Allred Broadway Center",
                "RBA": 215634,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8831"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9906599,
                    33.4032147
                ]
            },
            "properties": {
                "Property Address": "4310 E Cotton Center Blvd",
                "Property Name": "Quattro - Phase I Bldg 1",
                "RBA": 68000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.989224,
                    33.4028512
                ]
            },
            "properties": {
                "Property Address": "4340 E Cotton Center Blvd",
                "Property Name": "Quattro - Bldg 1",
                "RBA": 82900,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9892407,
                    33.4046129
                ]
            },
            "properties": {
                "Property Address": "4350 E Cotton Center Blvd",
                "Property Name": "Quattro - Bldg 2",
                "RBA": 57108,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.983949,
                    33.400795
                ]
            },
            "properties": {
                "Property Address": "4425 E Cotton Center Blvd",
                "Property Name": "Bldg 4 - Phase II",
                "RBA": 165000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8854"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9837758,
                    33.4024296
                ]
            },
            "properties": {
                "Property Address": "4435 E Cotton Center Blvd",
                "Property Name": "Bldg 3 - Phase II",
                "RBA": 37750,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9835644,
                    33.4036506
                ]
            },
            "properties": {
                "Property Address": "4500 E Cotton Center Blvd",
                "Property Name": "Aetna",
                "RBA": 139403,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9811698,
                    33.4028285
                ]
            },
            "properties": {
                "Property Address": "4645 E Cotton Center Blvd",
                "Property Name": "Forty6Forty5 Cotton Corporate Center",
                "RBA": 116858,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8874"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9690024,
                    33.3981943
                ]
            },
            "properties": {
                "Property Address": "2900 S Diablo Way",
                "Property Name": "Bldg D",
                "RBA": 84704,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3201"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9697768,
                    33.3988626
                ]
            },
            "properties": {
                "Property Address": "2900 S Diablo Way",
                "Property Name": "Bldg B",
                "RBA": 119404,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3201"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0150529,
                    33.4186522
                ]
            },
            "properties": {
                "Property Address": "3137 E Elwood St",
                "Property Name": "",
                "RBA": 123032,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-8200"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.013134,
                    33.418259
                ]
            },
            "properties": {
                "Property Address": "3138 E Elwood St",
                "Property Name": "",
                "RBA": 77155,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7210"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0140008,
                    33.4172265
                ]
            },
            "properties": {
                "Property Address": "3157 E Elwood St",
                "Property Name": "CognoSante",
                "RBA": 76120,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7209"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0135006,
                    33.4162368
                ]
            },
            "properties": {
                "Property Address": "3201 E Elwood St",
                "Property Name": "The 3201",
                "RBA": 77132,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7259"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.010738,
                    33.414439
                ]
            },
            "properties": {
                "Property Address": "3255 E Elwood St",
                "Property Name": "Southbank II",
                "RBA": 120778,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7256"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.982021,
                    33.412336
                ]
            },
            "properties": {
                "Property Address": "4605 E Elwood St",
                "Property Name": "Sky Harbor II",
                "RBA": 123448,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-1973"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.981521,
                    33.41215
                ]
            },
            "properties": {
                "Property Address": "4615 E Elwood St",
                "Property Name": "Sky Harbor Towers I",
                "RBA": 96222,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-1958"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9629488,
                    33.4030197
                ]
            },
            "properties": {
                "Property Address": "1501 W Fountainhead Pky",
                "Property Name": "Park Bridge at Fountainhead",
                "RBA": 172967,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-1868"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.96271,
                    33.4043493
                ]
            },
            "properties": {
                "Property Address": "1540 W Fountainhead Pky",
                "Property Name": "Park Square at Fountainhead",
                "RBA": 45522,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85282
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9634798,
                    33.4042771
                ]
            },
            "properties": {
                "Property Address": "1560 W Fountainhead Pky",
                "Property Name": "Park Square at Fountainhead",
                "RBA": 45522,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-1839"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.964562,
                    33.40319
                ]
            },
            "properties": {
                "Property Address": "1601 W Fountainhead Pky",
                "Property Name": "Fountainhead Office Plaza - Bldg B",
                "RBA": 168413,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85282
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9658584,
                    33.4031736
                ]
            },
            "properties": {
                "Property Address": "1620 W Fountainhead Pky",
                "Property Name": "Park Garden at Fountainhead",
                "RBA": 127226,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-1840"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9661774,
                    33.4020291
                ]
            },
            "properties": {
                "Property Address": "1625 W Fountainhead Pky",
                "Property Name": "Fountainhead Office Plaza - Bldg A",
                "RBA": 273780,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85282
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.962282,
                    33.401234
                ]
            },
            "properties": {
                "Property Address": "2625 S Plaza Dr",
                "Property Name": "Park Plaza at Fountainhead",
                "RBA": 98125,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3375"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9941,
                    33.4127674
                ]
            },
            "properties": {
                "Property Address": "4039 E Raymond St",
                "Property Name": "Allred 40",
                "RBA": 89889,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-1930"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0139438,
                    33.4126096
                ]
            },
            "properties": {
                "Property Address": "4025 S Riverpoint Pky",
                "Property Name": "",
                "RBA": 267962,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0127451,
                    33.4113959
                ]
            },
            "properties": {
                "Property Address": "4035 S Riverpoint Pky",
                "Property Name": "",
                "RBA": 165851,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0137524,
                    33.4109973
                ]
            },
            "properties": {
                "Property Address": "4045 S Riverpoint Pky",
                "Property Name": "",
                "RBA": 165851,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9599071,
                    33.3943207
                ]
            },
            "properties": {
                "Property Address": "1330 W Southern Ave",
                "Property Name": "",
                "RBA": 150000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-4545"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.96252,
                    33.399611
                ]
            },
            "properties": {
                "Property Address": "2700 S Sunland Dr",
                "Property Name": "State Farm Building 5",
                "RBA": 74648,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85282
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.963388,
                    33.3986347
                ]
            },
            "properties": {
                "Property Address": "2800 S Sunland Dr",
                "Property Name": "State Farm Building 3",
                "RBA": 79007,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3388"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9633637,
                    33.3978326
                ]
            },
            "properties": {
                "Property Address": "2900 S Sunland Dr",
                "Property Name": "State Farm Building 2",
                "RBA": 98632,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3389"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.962482,
                    33.3978591
                ]
            },
            "properties": {
                "Property Address": "2925 S Sunland Dr",
                "Property Name": "State Farm, Building 1",
                "RBA": 79150,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3393"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9818259,
                    33.4222878
                ]
            },
            "properties": {
                "Property Address": "4636 E University Dr",
                "Property Name": "Phoenix Airport Center",
                "RBA": 38315,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7418"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.97763,
                    33.446575
                ]
            },
            "properties": {
                "Property Address": "4801 E Washington St",
                "Property Name": "",
                "RBA": 132263,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-2004"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9723992,
                    33.4462803
                ]
            },
            "properties": {
                "Property Address": "5055 E Washington St",
                "Property Name": "",
                "RBA": 51810,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85034
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.020935,
                    33.5093242
                ]
            },
            "properties": {
                "Property Address": "2801 E Camelback Rd",
                "Property Name": "Camelback Collective",
                "RBA": 118090,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85016
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.033809,
                    33.508585
                ]
            },
            "properties": {
                "Property Address": "2201 E Camelback Rd",
                "Property Name": "Anchor Centre West",
                "RBA": 198493,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3431"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0639052,
                    33.5067578
                ]
            },
            "properties": {
                "Property Address": "4745 N 7th St",
                "Property Name": "Valley Commerce Center - South Bldg",
                "RBA": 106984,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-3665"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0641186,
                    33.5073079
                ]
            },
            "properties": {
                "Property Address": "4747 N 7th St",
                "Property Name": "Valley Commerce Center North Bldg",
                "RBA": 107016,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-3653"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.046789,
                    33.515411
                ]
            },
            "properties": {
                "Property Address": "5343 N 16th St",
                "Property Name": "The Madison",
                "RBA": 88178,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3231"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.046756,
                    33.516095
                ]
            },
            "properties": {
                "Property Address": "5353 N 16th St",
                "Property Name": "",
                "RBA": 89134,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3224"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.033758,
                    33.50738
                ]
            },
            "properties": {
                "Property Address": "4747 N 22nd St",
                "Property Name": "Anchor Centre II",
                "RBA": 49212,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4758"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0281442,
                    33.5275136
                ]
            },
            "properties": {
                "Property Address": "6201 N 24th Pky",
                "Property Name": "Best Western Worldwide Headquarters",
                "RBA": 65000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2023"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0310537,
                    33.5061248
                ]
            },
            "properties": {
                "Property Address": "4722 N 24th St",
                "Property Name": "Elevate 24",
                "RBA": 177944,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4800"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0308145,
                    33.506956
                ]
            },
            "properties": {
                "Property Address": "4742 N 24th St",
                "Property Name": "Elevate 24",
                "RBA": 145426,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4858"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0280666,
                    33.524522
                ]
            },
            "properties": {
                "Property Address": "6001 N 24th St",
                "Property Name": "Bldg C",
                "RBA": 38130,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2018"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0288012,
                    33.5251344
                ]
            },
            "properties": {
                "Property Address": "6001 N 24th St",
                "Property Name": "Bldg B",
                "RBA": 101778,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2018"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0265681,
                    33.5293663
                ]
            },
            "properties": {
                "Property Address": "6225 N 24th St",
                "Property Name": "24th at Lincoln",
                "RBA": 86451,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2020"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0257075,
                    33.5304219
                ]
            },
            "properties": {
                "Property Address": "6245 N 24th St",
                "Property Name": "Biltmore 24",
                "RBA": 44174,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2034"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9962175,
                    33.5120579
                ]
            },
            "properties": {
                "Property Address": "5050 N 40th St",
                "Property Name": "5050 @ Camelback",
                "RBA": 71717,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2139"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.996786,
                    33.5121261
                ]
            },
            "properties": {
                "Property Address": "5060 N 40th St",
                "Property Name": "5060 Building",
                "RBA": 28465,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2145"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.99773,
                    33.512638
                ]
            },
            "properties": {
                "Property Address": "5070 N 40th St",
                "Property Name": "The 5070 Bldg",
                "RBA": 22049,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2148"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.99842,
                    33.513328
                ]
            },
            "properties": {
                "Property Address": "5080 N 40th St",
                "Property Name": "Northbank",
                "RBA": 67767,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2147"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9958297,
                    33.5131334
                ]
            },
            "properties": {
                "Property Address": "5090 N 40th St",
                "Property Name": "5090 Building",
                "RBA": 175835,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2111"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9973109,
                    33.5134196
                ]
            },
            "properties": {
                "Property Address": "5110 N 40th St",
                "Property Name": "",
                "RBA": 31231,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2126"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0285728,
                    33.5266735
                ]
            },
            "properties": {
                "Property Address": "2400 E Arizona Biltmore Cir",
                "Property Name": "Building 2",
                "RBA": 23113,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85016
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0291999,
                    33.5270822
                ]
            },
            "properties": {
                "Property Address": "2400 E Arizona Biltmore Cir",
                "Property Name": "Building 4",
                "RBA": 23887,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2107"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0269099,
                    33.5253214
                ]
            },
            "properties": {
                "Property Address": "2525 E Arizona Biltmore Cir",
                "Property Name": "Biltmore Pavilions",
                "RBA": 59706,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-2146"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0456523,
                    33.5067152
                ]
            },
            "properties": {
                "Property Address": "1661 E Camelback Rd",
                "Property Name": "Camelback Arboleda",
                "RBA": 178792,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3911"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.042538,
                    33.5075246
                ]
            },
            "properties": {
                "Property Address": "1801 E Camelback Rd",
                "Property Name": "The Bridge at Camelback",
                "RBA": 479250,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4163"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0350757,
                    33.5088583
                ]
            },
            "properties": {
                "Property Address": "2141 E Camelback Rd",
                "Property Name": "",
                "RBA": 34684,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4764"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0349012,
                    33.5098453
                ]
            },
            "properties": {
                "Property Address": "2198 E Camelback Rd",
                "Property Name": "",
                "RBA": 56023,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4742"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0338722,
                    33.5099717
                ]
            },
            "properties": {
                "Property Address": "2200 E Camelback Rd",
                "Property Name": "AMTrust Bank Center",
                "RBA": 46523,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3454"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0327936,
                    33.5098107
                ]
            },
            "properties": {
                "Property Address": "2222 E Camelback Rd",
                "Property Name": "Bank USA",
                "RBA": 30662,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3428"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0327106,
                    33.5084868
                ]
            },
            "properties": {
                "Property Address": "2231 E Camelback Rd",
                "Property Name": "Anchor Centre East",
                "RBA": 134791,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3453"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0321053,
                    33.508614
                ]
            },
            "properties": {
                "Property Address": "2325 E Camelback Rd",
                "Property Name": "24th at Camelback II",
                "RBA": 306877,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85016
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0318115,
                    33.5071832
                ]
            },
            "properties": {
                "Property Address": "2355 E Camelback Rd",
                "Property Name": "Camelback Center",
                "RBA": 250170,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3458"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0318603,
                    33.5081405
                ]
            },
            "properties": {
                "Property Address": "2375 E Camelback Rd",
                "Property Name": "24th At Camelback",
                "RBA": 302209,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3424"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0318964,
                    33.5097952
                ]
            },
            "properties": {
                "Property Address": "2390 E Camelback Rd",
                "Property Name": "Biltmore Center I",
                "RBA": 211624,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3448"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0317504,
                    33.5108065
                ]
            },
            "properties": {
                "Property Address": "2394 E Camelback Rd",
                "Property Name": "Biltmore Center III",
                "RBA": 135350,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-3429"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0308914,
                    33.5100479
                ]
            },
            "properties": {
                "Property Address": "2398 E Camelback Rd",
                "Property Name": "Biltmore Center II",
                "RBA": 288435,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-9001"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.028804,
                    33.508077
                ]
            },
            "properties": {
                "Property Address": "2415 E Camelback Rd",
                "Property Name": "Esplanade III",
                "RBA": 218387,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4288"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0281525,
                    33.5087403
                ]
            },
            "properties": {
                "Property Address": "2425 E Camelback Rd",
                "Property Name": "Esplanade I",
                "RBA": 235077,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4200"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0271558,
                    33.5087668
                ]
            },
            "properties": {
                "Property Address": "2525 E Camelback Rd",
                "Property Name": "Camelback Esplanade II",
                "RBA": 235077,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4219"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0261218,
                    33.5090218
                ]
            },
            "properties": {
                "Property Address": "2555 E Camelback Rd",
                "Property Name": "Camelback Esplanade V",
                "RBA": 235773,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-9256"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.025994,
                    33.508257
                ]
            },
            "properties": {
                "Property Address": "2575 E Camelback Rd",
                "Property Name": "Camelback Esplanade IV",
                "RBA": 264267,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4240"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0233113,
                    33.510274
                ]
            },
            "properties": {
                "Property Address": "2710 E Camelback Rd",
                "Property Name": "Camelback Lakes | 2710 Bldg",
                "RBA": 30848,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4372"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0227892,
                    33.5103398
                ]
            },
            "properties": {
                "Property Address": "2720 E Camelback Rd",
                "Property Name": "2720 Bldg",
                "RBA": 33758,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4340"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0223291,
                    33.5103849
                ]
            },
            "properties": {
                "Property Address": "2730 E Camelback Rd",
                "Property Name": "2730 Bldg",
                "RBA": 28755,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4343"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0220016,
                    33.5089131
                ]
            },
            "properties": {
                "Property Address": "2777 E Camelback Rd",
                "Property Name": "",
                "RBA": 104618,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4347"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0211764,
                    33.5105944
                ]
            },
            "properties": {
                "Property Address": "2850 E Camelback Rd",
                "Property Name": "2850 Bldg",
                "RBA": 136540,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4311"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.019129,
                    33.5094534
                ]
            },
            "properties": {
                "Property Address": "2901 E Camelback Rd",
                "Property Name": "",
                "RBA": 22172,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4431"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0180671,
                    33.5094359
                ]
            },
            "properties": {
                "Property Address": "2929 E Camelback Rd",
                "Property Name": "Royal Biltmore",
                "RBA": 76974,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4424"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.01641,
                    33.5095144
                ]
            },
            "properties": {
                "Property Address": "3001 E Camelback Rd",
                "Property Name": "Plaza 3001",
                "RBA": 26000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4433"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0166762,
                    33.510999
                ]
            },
            "properties": {
                "Property Address": "3020 E Camelback Rd",
                "Property Name": "",
                "RBA": 79938,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4417"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.016656,
                    33.510492
                ]
            },
            "properties": {
                "Property Address": "3030 E Camelback Rd",
                "Property Name": "",
                "RBA": 28094,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4404"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.01349,
                    33.509315
                ]
            },
            "properties": {
                "Property Address": "3131 E Camelback Rd",
                "Property Name": "",
                "RBA": 196332,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4500"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0134417,
                    33.5080371
                ]
            },
            "properties": {
                "Property Address": "3133 E Camelback Rd",
                "Property Name": "",
                "RBA": 99069,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4538"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.012174,
                    33.510782
                ]
            },
            "properties": {
                "Property Address": "3200 E Camelback Rd",
                "Property Name": "Biltmore Commerce Center",
                "RBA": 259730,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2311"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0094161,
                    33.5095347
                ]
            },
            "properties": {
                "Property Address": "3333 E Camelback Rd",
                "Property Name": "Biltmore Talon Center",
                "RBA": 96248,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2322"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9975266,
                    33.5108664
                ]
            },
            "properties": {
                "Property Address": "3900 E Camelback Rd",
                "Property Name": "3900 Camelback Center",
                "RBA": 177520,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85018
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9876779,
                    33.509082
                ]
            },
            "properties": {
                "Property Address": "4343 E Camelback Rd",
                "Property Name": "Londen Center",
                "RBA": 106854,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2700"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9847375,
                    33.5086369
                ]
            },
            "properties": {
                "Property Address": "4455 E Camelback Rd",
                "Property Name": "",
                "RBA": 103832,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85018-2843"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0448423,
                    33.5059103
                ]
            },
            "properties": {
                "Property Address": "1702 E Highland Ave",
                "Property Name": "Make-A-Wish America",
                "RBA": 92153,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4664"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0364328,
                    33.5048035
                ]
            },
            "properties": {
                "Property Address": "2111 E Highland Ave",
                "Property Name": "Park One Bldg B",
                "RBA": 131190,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4741"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0356096,
                    33.5059538
                ]
            },
            "properties": {
                "Property Address": "2122 E Highland Ave",
                "Property Name": "Biltmore Terrace",
                "RBA": 53235,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4739"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0349726,
                    33.505269
                ]
            },
            "properties": {
                "Property Address": "2141 E Highland Ave",
                "Property Name": "Park One Bldg A",
                "RBA": 66109,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4736"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0349037,
                    33.5062731
                ]
            },
            "properties": {
                "Property Address": "2150 E Highland Ave",
                "Property Name": "Town & Country Financial Ctr - Ph I",
                "RBA": 33858,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-4718"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.064226,
                    33.516026
                ]
            },
            "properties": {
                "Property Address": "711 E Missouri Ave",
                "Property Name": "711 East Missouri Avenue",
                "RBA": 42210,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-2841"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0318321,
                    33.466595
                ]
            },
            "properties": {
                "Property Address": "2324 E McDowell Rd",
                "Property Name": "United States Department of Agriculture",
                "RBA": 33258,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85006-2440"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.977221,
                    33.4668065
                ]
            },
            "properties": {
                "Property Address": "4832 E McDowell Rd",
                "Property Name": "Bldg D",
                "RBA": 34440,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-4231"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.888765,
                    33.55732
                ]
            },
            "properties": {
                "Property Address": "8434 N 90th",
                "Property Name": "Acacia - Bldg 2B",
                "RBA": 20611,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4385"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8892896,
                    33.5576435
                ]
            },
            "properties": {
                "Property Address": "8444 N 90th",
                "Property Name": "Pima Center 2C",
                "RBA": 40712,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4436"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.888814,
                    33.55807
                ]
            },
            "properties": {
                "Property Address": "8454 N 90th",
                "Property Name": "Acacia - Bldg 2A",
                "RBA": 21400,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4478"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.885425,
                    33.575668
                ]
            },
            "properties": {
                "Property Address": "9977 N 90th St",
                "Property Name": "90 Mountain View I & II",
                "RBA": 91000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4423"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8852633,
                    33.5765495
                ]
            },
            "properties": {
                "Property Address": "9999 N 90th St",
                "Property Name": "90 Mountain View Phase II",
                "RBA": 92562,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4420"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8791893,
                    33.5771607
                ]
            },
            "properties": {
                "Property Address": "10001 N 92nd St",
                "Property Name": "92 Mountainview",
                "RBA": 116200,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4545"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8845271,
                    33.5554772
                ]
            },
            "properties": {
                "Property Address": "9165 E Del Camino",
                "Property Name": "Mesquite - Bldg 1C",
                "RBA": 54338,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4443"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8870452,
                    33.5555284
                ]
            },
            "properties": {
                "Property Address": "9055 E Del Camino Dr",
                "Property Name": "Mesquite - Bldg 1A",
                "RBA": 36878,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2351"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8859602,
                    33.5554943
                ]
            },
            "properties": {
                "Property Address": "9150 E Del Camino Dr",
                "Property Name": "Mesquite - Bldg 1B",
                "RBA": 42399,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4394"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8751128,
                    33.5432794
                ]
            },
            "properties": {
                "Property Address": "7350 N Dobson Rd",
                "Property Name": "R-Tech",
                "RBA": 142000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85256-2710"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8759413,
                    33.5456891
                ]
            },
            "properties": {
                "Property Address": "7500 N Dobson Rd",
                "Property Name": "Riverwalk 7500",
                "RBA": 100268,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85256-2718"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8756824,
                    33.5464875
                ]
            },
            "properties": {
                "Property Address": "7580 N Dobson Rd",
                "Property Name": "Riverwalk 7580",
                "RBA": 64297,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85256-2717"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8766887,
                    33.5485534
                ]
            },
            "properties": {
                "Property Address": "7720 N Dobson Rd",
                "Property Name": "Riverwalk Arizona",
                "RBA": 149544,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85256-2740"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9234721,
                    33.5668308
                ]
            },
            "properties": {
                "Property Address": "7333 E Doubletree Ranch Rd",
                "Property Name": "Building D",
                "RBA": 42946,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2042"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9233669,
                    33.5660656
                ]
            },
            "properties": {
                "Property Address": "7337 E Doubletree Ranch Rd",
                "Property Name": "Building C",
                "RBA": 70076,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2144"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9219603,
                    33.5654576
                ]
            },
            "properties": {
                "Property Address": "7373 E Doubletree Ranch Rd",
                "Property Name": "Building B",
                "RBA": 49878,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2035"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9213662,
                    33.566041
                ]
            },
            "properties": {
                "Property Address": "7377 E Doubletree Ranch Rd",
                "Property Name": "Building A",
                "RBA": 36477,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2053"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9175873,
                    33.5654099
                ]
            },
            "properties": {
                "Property Address": "7600 E Doubletree Ranch Rd",
                "Property Name": "Bldg 1",
                "RBA": 60857,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2134"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9164371,
                    33.5650732
                ]
            },
            "properties": {
                "Property Address": "7702 E Doubletree Ranch Rd",
                "Property Name": "Gainey Ranch Town Center",
                "RBA": 64507,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2129"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9121794,
                    33.5648381
                ]
            },
            "properties": {
                "Property Address": "8777 N Gainey Center Dr",
                "Property Name": "Gainey Ranch Corporate Center I",
                "RBA": 111484,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2117"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9141787,
                    33.5655318
                ]
            },
            "properties": {
                "Property Address": "8800 N Gainey Center Dr",
                "Property Name": "Gainey Ranch Corporate Center III",
                "RBA": 232794,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2118"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.913952,
                    33.5669444
                ]
            },
            "properties": {
                "Property Address": "8877 N Gainey Center Dr",
                "Property Name": "Gainey Ranch Corporate Center II",
                "RBA": 199609,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2108"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.89731,
                    33.553004
                ]
            },
            "properties": {
                "Property Address": "7975 N Hayden Rd",
                "Property Name": "SEOP I",
                "RBA": 136997,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3246"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8980396,
                    33.5548258
                ]
            },
            "properties": {
                "Property Address": "8125 N Hayden Rd",
                "Property Name": "McCormick Corporate Center",
                "RBA": 74667,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2463"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8976679,
                    33.5564575
                ]
            },
            "properties": {
                "Property Address": "8283 N Hayden Rd",
                "Property Name": "Hayden Corporate Center",
                "RBA": 55000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-2454"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8869049,
                    33.5649642
                ]
            },
            "properties": {
                "Property Address": "SE Loop 101 & 90th St",
                "Property Name": "Lot 10",
                "RBA": 90000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85258
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8876356,
                    33.5733997
                ]
            },
            "properties": {
                "Property Address": "8901 E Mountain View Rd",
                "Property Name": "Scottsdale Gateway II",
                "RBA": 107885,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4422"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8804715,
                    33.5755077
                ]
            },
            "properties": {
                "Property Address": "9201 E Mountain View Rd",
                "Property Name": "Scottsdale Gateway I",
                "RBA": 106931,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-5199"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8826532,
                    33.5596433
                ]
            },
            "properties": {
                "Property Address": "9200 E Pima Center",
                "Property Name": "",
                "RBA": 135891,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4453"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8858317,
                    33.5615493
                ]
            },
            "properties": {
                "Property Address": "9000 E Pima Center Pky",
                "Property Name": "",
                "RBA": 135891,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-4466"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9263523,
                    33.5336952
                ]
            },
            "properties": {
                "Property Address": "6710 N Scottsdale Rd",
                "Property Name": "Scottsdale Spectrum",
                "RBA": 57841,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-4405"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.927397,
                    33.534119
                ]
            },
            "properties": {
                "Property Address": "6720 N Scottsdale Rd",
                "Property Name": "Scottsdale Spectrum",
                "RBA": 141209,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-4400"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9265125,
                    33.5345621
                ]
            },
            "properties": {
                "Property Address": "6730 N Scottsdale Rd",
                "Property Name": "Scottsdale Spectrum",
                "RBA": 57620,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-4408"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9206231,
                    33.5393633
                ]
            },
            "properties": {
                "Property Address": "7001 N Scottsdale Rd",
                "Property Name": "Seville Professional Center",
                "RBA": 92581,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-3658"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9246676,
                    33.5407001
                ]
            },
            "properties": {
                "Property Address": "7025 N Scottsdale Rd",
                "Property Name": "7025 Building",
                "RBA": 91148,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-3675"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9249996,
                    33.5443741
                ]
            },
            "properties": {
                "Property Address": "7373 N Scottsdale Rd",
                "Property Name": "Scottsdale Centre",
                "RBA": 163312,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-3559"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.925508,
                    33.56115
                ]
            },
            "properties": {
                "Property Address": "8501 N Scottsdale Rd",
                "Property Name": "Gainey Center II",
                "RBA": 146770,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-2750"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9253374,
                    33.5627077
                ]
            },
            "properties": {
                "Property Address": "8601 N Scottsdale Rd",
                "Property Name": "Wells Fargo Gainey Center I",
                "RBA": 140756,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85253-2736"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.925427,
                    33.588809
                ]
            },
            "properties": {
                "Property Address": "11333 N Scottsdale Rd",
                "Property Name": "Scottsdale Norte",
                "RBA": 83303,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-5185"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9288248,
                    33.5832535
                ]
            },
            "properties": {
                "Property Address": "7000 E Shea Blvd",
                "Property Name": "Block 7000 - Bldg J",
                "RBA": 38113,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.896226,
                    33.552768
                ]
            },
            "properties": {
                "Property Address": "8655 E Via de Ventura",
                "Property Name": "SEOP II",
                "RBA": 114591,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3300"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.893241,
                    33.552611
                ]
            },
            "properties": {
                "Property Address": "8767 E Via de Ventura",
                "Property Name": "Bay Colony  II - West",
                "RBA": 74852,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3376"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.892218,
                    33.552381
                ]
            },
            "properties": {
                "Property Address": "8777 E Via de Ventura",
                "Property Name": "Bay Colony Executive Center East",
                "RBA": 55000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3343"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8840043,
                    33.5541215
                ]
            },
            "properties": {
                "Property Address": "9180 E Via de Ventura",
                "Property Name": "Mesquite - Bldg 1E",
                "RBA": 81734,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3596"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8822302,
                    33.5517178
                ]
            },
            "properties": {
                "Property Address": "9221 E Via De Ventura",
                "Property Name": "Calendar Stick Business Park- Bldg C",
                "RBA": 45700,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3370"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8820371,
                    33.5505589
                ]
            },
            "properties": {
                "Property Address": "9237 E Via De Ventura",
                "Property Name": "Calendar Stick Business Park- Bldg D",
                "RBA": 72697,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85258
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.880531,
                    33.551843
                ]
            },
            "properties": {
                "Property Address": "9305 E Via De Ventura",
                "Property Name": "Calendar Stick Business Park- Bldg A",
                "RBA": 64835,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3423"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.880448,
                    33.550592
                ]
            },
            "properties": {
                "Property Address": "9311 E Via De Ventura",
                "Property Name": "Calendar Stick 9311- Bldg B",
                "RBA": 66989,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-3423"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8844778,
                    33.5703126
                ]
            },
            "properties": {
                "Property Address": "9060 E Via Linda Blvd",
                "Property Name": "Via Linda Corporate",
                "RBA": 111200,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85258-5422"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1185832,
                    33.605345
                ]
            },
            "properties": {
                "Property Address": "13430 N Black Canyon Hwy",
                "Property Name": "North Black Canyon 13430",
                "RBA": 138940,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-1348"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1156624,
                    33.6217395
                ]
            },
            "properties": {
                "Property Address": "15002 N 25th Dr",
                "Property Name": "",
                "RBA": 43584,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85023-5000"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0747106,
                    33.449909
                ]
            },
            "properties": {
                "Property Address": "101 N 1st Ave",
                "Property Name": "U.S. Bank Center",
                "RBA": 373013,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-1902"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.075722,
                    33.451853
                ]
            },
            "properties": {
                "Property Address": "302 N 1st Ave",
                "Property Name": "Public Transit Building",
                "RBA": 106386,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-1500"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0721415,
                    33.4485655
                ]
            },
            "properties": {
                "Property Address": "1 N 1st St",
                "Property Name": "The Department",
                "RBA": 127313,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2357"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0721841,
                    33.4438921
                ]
            },
            "properties": {
                "Property Address": "411 S 1st St",
                "Property Name": "",
                "RBA": 26134,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2502"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0760948,
                    33.4501549
                ]
            },
            "properties": {
                "Property Address": "135 N 2nd Ave",
                "Property Name": "Ellis Building",
                "RBA": 63676,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-2013"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0715492,
                    33.4429514
                ]
            },
            "properties": {
                "Property Address": "502 S 2nd St",
                "Property Name": "",
                "RBA": 25200,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2551"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.072111,
                    33.442897
                ]
            },
            "properties": {
                "Property Address": "101 E Buchanan St",
                "Property Name": "Warehouse District",
                "RBA": 26520,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2517"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0734307,
                    33.4486537
                ]
            },
            "properties": {
                "Property Address": "1 N Central Ave",
                "Property Name": "One North Central",
                "RBA": 410053,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-4414"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742723,
                    33.4485942
                ]
            },
            "properties": {
                "Property Address": "2 N Central Ave",
                "Property Name": "One Renaissance Square",
                "RBA": 503205,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2322"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0746574,
                    33.4490099
                ]
            },
            "properties": {
                "Property Address": "40 N Central Ave",
                "Property Name": "Two Renaissance Square",
                "RBA": 488616,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-4424"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.07429,
                    33.4497605
                ]
            },
            "properties": {
                "Property Address": "112 N Central Ave",
                "Property Name": "Heard Building",
                "RBA": 82246,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2309"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0731471,
                    33.4509488
                ]
            },
            "properties": {
                "Property Address": "201 N Central Ave",
                "Property Name": "Chase Tower",
                "RBA": 723922,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-0073"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742157,
                    33.4509835
                ]
            },
            "properties": {
                "Property Address": "234 N Central Ave",
                "Property Name": "Security Center",
                "RBA": 204278,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2208"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0733432,
                    33.4517223
                ]
            },
            "properties": {
                "Property Address": "333 N Central Ave",
                "Property Name": "Freeport-McMoRan Tower",
                "RBA": 257522,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85004
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0734905,
                    33.4529752
                ]
            },
            "properties": {
                "Property Address": "411 N Central Ave",
                "Property Name": "University Center",
                "RBA": 168699,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2115"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0735379,
                    33.4589125
                ]
            },
            "properties": {
                "Property Address": "1001 N Central Ave",
                "Property Name": "Ten-0-One At Ro2",
                "RBA": 110009,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1935"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0669738,
                    33.4400475
                ]
            },
            "properties": {
                "Property Address": "515 E Grant St",
                "Property Name": "The Lawrence Building",
                "RBA": 122220,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2633"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0744521,
                    33.4453104
                ]
            },
            "properties": {
                "Property Address": "20 W Jackson St",
                "Property Name": "The Depot",
                "RBA": 21000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-2404"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0740202,
                    33.4468291
                ]
            },
            "properties": {
                "Property Address": "11 W Jefferson St",
                "Property Name": "Luhrs Bldg",
                "RBA": 103481,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-2306"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0748589,
                    33.4469622
                ]
            },
            "properties": {
                "Property Address": "45 W Jefferson St",
                "Property Name": "Luhrs Tower",
                "RBA": 56740,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-2307"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0679537,
                    33.44152
                ]
            },
            "properties": {
                "Property Address": "475 E Lincoln St",
                "Property Name": "Lincoln Union",
                "RBA": 93420,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2540"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0758147,
                    33.4456988
                ]
            },
            "properties": {
                "Property Address": "101 W Madison St",
                "Property Name": "Maricopa County Court Tower",
                "RBA": 695000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-2123"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0755059,
                    33.4500524
                ]
            },
            "properties": {
                "Property Address": "111 W Monroe St",
                "Property Name": "The Monroe",
                "RBA": 267760,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-1742"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.070981,
                    33.451886
                ]
            },
            "properties": {
                "Property Address": "200 E Van Buren St",
                "Property Name": "200EVB",
                "RBA": 240076,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2238"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0686765,
                    33.4518019
                ]
            },
            "properties": {
                "Property Address": "400 E Van Buren St",
                "Property Name": "One Arizona Center",
                "RBA": 347055,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2223"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0733583,
                    33.4480193
                ]
            },
            "properties": {
                "Property Address": "1 E Washington St",
                "Property Name": "CityScape",
                "RBA": 603787,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85004
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0718328,
                    33.4479353
                ]
            },
            "properties": {
                "Property Address": "101 E Washington St",
                "Property Name": "Block 23 At CityScape",
                "RBA": 297000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2342"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.070657,
                    33.447209
                ]
            },
            "properties": {
                "Property Address": "201 E Washington St",
                "Property Name": "Collier Center",
                "RBA": 567163,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-2428"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0759409,
                    33.4486439
                ]
            },
            "properties": {
                "Property Address": "100 W Washington St",
                "Property Name": "Wells Fargo Bank Plaza",
                "RBA": 473286,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85003-1805"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.83378,
                    33.415478
                ]
            },
            "properties": {
                "Property Address": "1 N MacDonald Dr",
                "Property Name": "One MacDonald Center",
                "RBA": 59843,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-7339"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8292913,
                    33.4147086
                ]
            },
            "properties": {
                "Property Address": "63 E Main St",
                "Property Name": "",
                "RBA": 70000,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-7417"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8250499,
                    33.4156608
                ]
            },
            "properties": {
                "Property Address": "222 E Main St",
                "Property Name": "",
                "RBA": 21222,
                "City": "Mesa",
                "State": "AZ",
                "Zip": 85201
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8254391,
                    33.4146555
                ]
            },
            "properties": {
                "Property Address": "225 E Main St",
                "Property Name": "Benedictine University",
                "RBA": 66531,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-7432"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8239864,
                    33.4146807
                ]
            },
            "properties": {
                "Property Address": "305 E Main St",
                "Property Name": "305 East Main",
                "RBA": 50018,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-7426"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8336138,
                    33.4147894
                ]
            },
            "properties": {
                "Property Address": "63 W Main St",
                "Property Name": "Bank of America",
                "RBA": 23490,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-7307"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0772453,
                    33.4853142
                ]
            },
            "properties": {
                "Property Address": "3141 N 3rd Ave",
                "Property Name": "Burgbacher Building- Park Central",
                "RBA": 193060,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85012
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0700949,
                    33.4834166
                ]
            },
            "properties": {
                "Property Address": "3030 N 3rd St",
                "Property Name": "Copper Point Tower",
                "RBA": 252400,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-3074"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0690126,
                    33.4926206
                ]
            },
            "properties": {
                "Property Address": "3839 N 3rd St",
                "Property Name": "Fairmount On 3rd",
                "RBA": 41567,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2066"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.069002,
                    33.4940995
                ]
            },
            "properties": {
                "Property Address": "4001 N 3rd St",
                "Property Name": "Fairmount Place",
                "RBA": 78233,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2060"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0744796,
                    33.4684362
                ]
            },
            "properties": {
                "Property Address": "1850 N Central Ave",
                "Property Name": "BMO Tower at Central Arts Plaza",
                "RBA": 478751,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-4527"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0733215,
                    33.4696147
                ]
            },
            "properties": {
                "Property Address": "2005 N Central Ave",
                "Property Name": "Central Palm Plaza",
                "RBA": 78320,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1592"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0744083,
                    33.4703095
                ]
            },
            "properties": {
                "Property Address": "2020 N Central Ave",
                "Property Name": "2020 On Central",
                "RBA": 247645,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-4501"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742782,
                    33.4751264
                ]
            },
            "properties": {
                "Property Address": "2400 N Central Ave",
                "Property Name": "2400 North Central Holding LLC",
                "RBA": 52100,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1341"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0743452,
                    33.4771517
                ]
            },
            "properties": {
                "Property Address": "2600 N Central Ave",
                "Property Name": "2600 Tower",
                "RBA": 323607,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-3050"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742561,
                    33.4780559
                ]
            },
            "properties": {
                "Property Address": "2700 N Central Ave",
                "Property Name": "2700 Tower",
                "RBA": 220949,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1133"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0744542,
                    33.4788699
                ]
            },
            "properties": {
                "Property Address": "2800 N Central Ave",
                "Property Name": "2800 Tower",
                "RBA": 370736,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1007"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.074604,
                    33.479932
                ]
            },
            "properties": {
                "Property Address": "2828 N Central Ave",
                "Property Name": "",
                "RBA": 104016,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85004-1021"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0731616,
                    33.4809652
                ]
            },
            "properties": {
                "Property Address": "2901 N Central Ave",
                "Property Name": "Phoenix Plaza Tower I",
                "RBA": 475986,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2700"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0733679,
                    33.481661
                ]
            },
            "properties": {
                "Property Address": "2929 N Central Ave",
                "Property Name": "Phoenix Plaza Tower II",
                "RBA": 427890,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2727"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0731008,
                    33.4826214
                ]
            },
            "properties": {
                "Property Address": "3003 N Central Ave",
                "Property Name": "Phoenix Corporate Tower",
                "RBA": 457893,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2902"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742988,
                    33.482013
                ]
            },
            "properties": {
                "Property Address": "3030 N Central Ave",
                "Property Name": "3030 North Central",
                "RBA": 189868,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2707"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0731273,
                    33.4835765
                ]
            },
            "properties": {
                "Property Address": "3033 N Central Ave",
                "Property Name": "Phoenix Professional Towers",
                "RBA": 134164,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2809"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.073397,
                    33.4842887
                ]
            },
            "properties": {
                "Property Address": "3101 N Central Ave",
                "Property Name": "CBIZ Plaza",
                "RBA": 269463,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2645"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0752604,
                    33.4840919
                ]
            },
            "properties": {
                "Property Address": "3110 N Central Ave",
                "Property Name": "Goldwater Building- Park Central",
                "RBA": 92000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2695"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0761048,
                    33.4839029
                ]
            },
            "properties": {
                "Property Address": "3110 N Central Ave",
                "Property Name": "Leib Building- Park Central",
                "RBA": 43000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2695"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0772921,
                    33.4844256
                ]
            },
            "properties": {
                "Property Address": "3110 N Central Ave",
                "Property Name": "Straus Building- Park Central",
                "RBA": 30300,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2695"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.075504,
                    33.4834552
                ]
            },
            "properties": {
                "Property Address": "3110 N Central Ave",
                "Property Name": "Diamond Building- Park Central",
                "RBA": 71000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2695"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0744024,
                    33.4856576
                ]
            },
            "properties": {
                "Property Address": "3200 N Central Ave",
                "Property Name": "3200 N Central",
                "RBA": 346027,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2425"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0742842,
                    33.486973
                ]
            },
            "properties": {
                "Property Address": "3300 N Central Ave",
                "Property Name": "3300 N Central",
                "RBA": 363655,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2501"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0729875,
                    33.4877706
                ]
            },
            "properties": {
                "Property Address": "3443 N Central Ave",
                "Property Name": "Phoenix Financial Center",
                "RBA": 285834,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2204"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0743929,
                    33.4890749
                ]
            },
            "properties": {
                "Property Address": "3550 N Central Ave",
                "Property Name": "The 3550",
                "RBA": 284709,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2105"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.074566,
                    33.490482
                ]
            },
            "properties": {
                "Property Address": "3636 N Central Ave",
                "Property Name": "",
                "RBA": 219032,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-1927"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0746629,
                    33.4918529
                ]
            },
            "properties": {
                "Property Address": "3800 N Central Ave",
                "Property Name": "3800 Tower",
                "RBA": 216380,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-1992"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.075593,
                    33.491519
                ]
            },
            "properties": {
                "Property Address": "3838 N Central Ave",
                "Property Name": "3838 Tower",
                "RBA": 236324,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-1906"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.075483,
                    33.4926213
                ]
            },
            "properties": {
                "Property Address": "4000 N Central Ave",
                "Property Name": "4000 Tower",
                "RBA": 299562,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-1959"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.072921,
                    33.4939688
                ]
            },
            "properties": {
                "Property Address": "4041 N Central Ave",
                "Property Name": "Younan Central Plaza",
                "RBA": 405693,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-3330"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.078566,
                    33.491948
                ]
            },
            "properties": {
                "Property Address": "300 W Clarendon Ave",
                "Property Name": "Clarendon Place",
                "RBA": 91353,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85013-3420"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.071479,
                    33.484257
                ]
            },
            "properties": {
                "Property Address": "202 E Earll Dr",
                "Property Name": "",
                "RBA": 99245,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2634"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0701414,
                    33.4841583
                ]
            },
            "properties": {
                "Property Address": "210 E Earll Dr",
                "Property Name": "",
                "RBA": 158249,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-2626"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0656818,
                    33.5158503
                ]
            },
            "properties": {
                "Property Address": "645 E Missouri Ave",
                "Property Name": "Missouri Falls",
                "RBA": 190419,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-1369"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0715397,
                    33.4806073
                ]
            },
            "properties": {
                "Property Address": "20 E Thomas Rd",
                "Property Name": "20 East Thomas",
                "RBA": 586403,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85012-3110"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0644653,
                    33.4907707
                ]
            },
            "properties": {
                "Property Address": "3707 N 7th St",
                "Property Name": "Siete Square II",
                "RBA": 54072,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-5059"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0643394,
                    33.491473
                ]
            },
            "properties": {
                "Property Address": "3737 N 7th St",
                "Property Name": "Siete Square I",
                "RBA": 57933,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-5017"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.064472,
                    33.4919734
                ]
            },
            "properties": {
                "Property Address": "3807 N 7th St",
                "Property Name": "Siete Square III",
                "RBA": 22198,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-5005"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0645825,
                    33.4924687
                ]
            },
            "properties": {
                "Property Address": "3877 N 7th St",
                "Property Name": "Siete Square IV",
                "RBA": 57541,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-5072"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0425144,
                    33.4551317
                ]
            },
            "properties": {
                "Property Address": "525 N 18th St",
                "Property Name": "Medical Office Building B",
                "RBA": 56707,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85006
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0394651,
                    33.4936856
                ]
            },
            "properties": {
                "Property Address": "4020 N 20th St",
                "Property Name": "4020 N 20th St",
                "RBA": 37571,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-6028"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.038637,
                    33.495933
                ]
            },
            "properties": {
                "Property Address": "4105 N 20th St",
                "Property Name": "Tudor Plaza",
                "RBA": 22436,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-6027"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0306992,
                    33.4750279
                ]
            },
            "properties": {
                "Property Address": "2500 N 24th St",
                "Property Name": "Commonwealth Casuality Company",
                "RBA": 28054,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-1842"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0307617,
                    33.4791564
                ]
            },
            "properties": {
                "Property Address": "2850 N 24th St",
                "Property Name": "Southwest Human Development",
                "RBA": 64740,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-1004"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.029455,
                    33.495841
                ]
            },
            "properties": {
                "Property Address": "4131 N 24th St",
                "Property Name": "La Costa Place",
                "RBA": 42160,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-6262"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0625747,
                    33.4650073
                ]
            },
            "properties": {
                "Property Address": "755 E McDowell Rd",
                "Property Name": "Clyde Wright Health Care Center",
                "RBA": 86950,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85006-2506"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.061047,
                    33.4654493
                ]
            },
            "properties": {
                "Property Address": "925 E McDowell Rd",
                "Property Name": "Good Samaritan Health Center",
                "RBA": 36325,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85006
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0573272,
                    33.4662284
                ]
            },
            "properties": {
                "Property Address": "1130 E McDowell Rd",
                "Property Name": "Fresh Start Women's Foundation Resource Centr",
                "RBA": 22500,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85006-2611"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0089327,
                    33.4653743
                ]
            },
            "properties": {
                "Property Address": "3333 E Mcdowell Rd",
                "Property Name": "",
                "RBA": 22349,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85008
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.00454,
                    33.465066
                ]
            },
            "properties": {
                "Property Address": "3551 E McDowell Rd",
                "Property Name": "",
                "RBA": 30250,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-3847"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0469023,
                    33.4398302
                ]
            },
            "properties": {
                "Property Address": "811 S 16th St",
                "Property Name": "Bldg 2",
                "RBA": 49200,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-4129"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.982793,
                    33.423924
                ]
            },
            "properties": {
                "Property Address": "2617 S 46th St",
                "Property Name": "Phoenix Airport Center II",
                "RBA": 35768,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7403"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.982544,
                    33.4263694
                ]
            },
            "properties": {
                "Property Address": "4601 E Hilton Ave",
                "Property Name": "Phoenix Airport Center V",
                "RBA": 60000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-6406"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9805868,
                    33.4263062
                ]
            },
            "properties": {
                "Property Address": "4602 E Hilton Ave",
                "Property Name": "",
                "RBA": 32460,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-6400"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9799566,
                    33.4262918
                ]
            },
            "properties": {
                "Property Address": "4717 E Hilton Ave",
                "Property Name": "",
                "RBA": 148446,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-6404"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.984616,
                    33.464228
                ]
            },
            "properties": {
                "Property Address": "4501 E McDowell Rd",
                "Property Name": "",
                "RBA": 64449,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-4505"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9828376,
                    33.4227348
                ]
            },
            "properties": {
                "Property Address": "4602 E University Dr",
                "Property Name": "Phoenix Airport Center I",
                "RBA": 32460,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-7421"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1096148,
                    33.5688641
                ]
            },
            "properties": {
                "Property Address": "9033 N 23rd Ave",
                "Property Name": "Bldg 4",
                "RBA": 23884,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2847"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1092654,
                    33.5886945
                ]
            },
            "properties": {
                "Property Address": "11226 N 23rd Ave",
                "Property Name": "Bldg B-I",
                "RBA": 35200,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4830"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.110773,
                    33.584925
                ]
            },
            "properties": {
                "Property Address": "10850 N 24th Ave",
                "Property Name": "Bldg 1",
                "RBA": 55606,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4793"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.114804,
                    33.576341
                ]
            },
            "properties": {
                "Property Address": "10010 N 25th Ave",
                "Property Name": "Corporate Center",
                "RBA": 74257,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1660"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1003418,
                    33.4860792
                ]
            },
            "properties": {
                "Property Address": "3310 N 19th Ave",
                "Property Name": "",
                "RBA": 27689,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85015-5701"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1000312,
                    33.5875346
                ]
            },
            "properties": {
                "Property Address": "11040 N 19th Ave",
                "Property Name": "Pete King Corp Bldg",
                "RBA": 34120,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4815"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.107132,
                    33.562969
                ]
            },
            "properties": {
                "Property Address": "8620 N 22nd Ave",
                "Property Name": "Metro Office Center",
                "RBA": 124252,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-4251"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1067162,
                    33.565087
                ]
            },
            "properties": {
                "Property Address": "8800 N 22nd Ave",
                "Property Name": "",
                "RBA": 38238,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-4258"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1093729,
                    33.5579924
                ]
            },
            "properties": {
                "Property Address": "8220 N 23rd Ave",
                "Property Name": "Blue Cross/Blue Shield",
                "RBA": 77136,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85021
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.109146,
                    33.558688
                ]
            },
            "properties": {
                "Property Address": "8220 N 23rd Ave",
                "Property Name": "Blue Cross Blue Shield of Arizona",
                "RBA": 74000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-4872"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.112941,
                    33.572138
                ]
            },
            "properties": {
                "Property Address": "9414 N 25th Ave",
                "Property Name": "",
                "RBA": 31764,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2706"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.113731,
                    33.574441
                ]
            },
            "properties": {
                "Property Address": "9630 N 25th Ave",
                "Property Name": "Phase III",
                "RBA": 116813,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2700"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.115384,
                    33.576743
                ]
            },
            "properties": {
                "Property Address": "10020 N 25th Ave",
                "Property Name": "Phase I",
                "RBA": 39436,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1660"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.114894,
                    33.577079
                ]
            },
            "properties": {
                "Property Address": "10030 N 25th Ave",
                "Property Name": "Phase I",
                "RBA": 74589,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1660"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.114791,
                    33.5777684
                ]
            },
            "properties": {
                "Property Address": "10040 N 25th Ave",
                "Property Name": "Phase II",
                "RBA": 23178,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1601"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.11493,
                    33.578056
                ]
            },
            "properties": {
                "Property Address": "10050 N 25th Ave",
                "Property Name": "Phase II",
                "RBA": 49000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1600"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.114804,
                    33.578599
                ]
            },
            "properties": {
                "Property Address": "10210 N 25th Ave",
                "Property Name": "Phase II",
                "RBA": 48000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1608"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.115056,
                    33.578905
                ]
            },
            "properties": {
                "Property Address": "10220 N 25th Ave",
                "Property Name": "Phase II",
                "RBA": 23035,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1605"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1139626,
                    33.5812933
                ]
            },
            "properties": {
                "Property Address": "10400 N 25th Ave",
                "Property Name": "Corporate Center",
                "RBA": 109332,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-1661"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.114685,
                    33.585509
                ]
            },
            "properties": {
                "Property Address": "10835 N 25th Ave",
                "Property Name": "Black Canyon Center",
                "RBA": 98760,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4751"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.115653,
                    33.491023
                ]
            },
            "properties": {
                "Property Address": "3615 N 27th Ave",
                "Property Name": "",
                "RBA": 120000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85017-4701"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1157329,
                    33.5862922
                ]
            },
            "properties": {
                "Property Address": "11001 N Black Canyon Fwy",
                "Property Name": "The Grove at Black Canyon",
                "RBA": 100000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4757"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1149335,
                    33.5843904
                ]
            },
            "properties": {
                "Property Address": "10851 N Black Canyon Hwy",
                "Property Name": "Black Canyon Tower",
                "RBA": 147731,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4755"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1078019,
                    33.5679871
                ]
            },
            "properties": {
                "Property Address": "2222 W Dunlap Ave",
                "Property Name": "Concorde Commerce Center",
                "RBA": 140103,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2818"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.107543,
                    33.566743
                ]
            },
            "properties": {
                "Property Address": "2233 W Dunlap Ave",
                "Property Name": "The Art Institute of Phoenix",
                "RBA": 92103,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2859"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1112979,
                    33.5684362
                ]
            },
            "properties": {
                "Property Address": "2400 W Dunlap Ave",
                "Property Name": "Crescent Corporate Center",
                "RBA": 108451,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2817"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.112424,
                    33.566082
                ]
            },
            "properties": {
                "Property Address": "2445 W Dunlap Ave",
                "Property Name": "Dunlap Business Center",
                "RBA": 80925,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-5820"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1130923,
                    33.567089
                ]
            },
            "properties": {
                "Property Address": "2501 W Dunlap Ave",
                "Property Name": "",
                "RBA": 38387,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2724"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.113566,
                    33.5693362
                ]
            },
            "properties": {
                "Property Address": "2510 W Dunlap Ave",
                "Property Name": "Canyon Corporate Plaza I",
                "RBA": 132774,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2737"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.113478,
                    33.569984
                ]
            },
            "properties": {
                "Property Address": "2512 W Dunlap Ave",
                "Property Name": "Canyon Corporate Plaza II",
                "RBA": 169747,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-2709"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1111178,
                    33.5581944
                ]
            },
            "properties": {
                "Property Address": "2444 W Las Palmaritas Dr",
                "Property Name": "Blue Cross/Blue Shield",
                "RBA": 126084,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85021-4860"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1120205,
                    33.5581619
                ]
            },
            "properties": {
                "Property Address": "2480 W Las Palmaritas Dr",
                "Property Name": "Blue Cross/Blue Shield",
                "RBA": 44551,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85021
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.107807,
                    33.581502
                ]
            },
            "properties": {
                "Property Address": "2225 W Peoria Ave",
                "Property Name": "",
                "RBA": 56000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4938"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.1088303,
                    33.5808275
                ]
            },
            "properties": {
                "Property Address": "2401 W Peoria Ave",
                "Property Name": "Desert Canyon 100",
                "RBA": 102606,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4790"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.109703,
                    33.579774
                ]
            },
            "properties": {
                "Property Address": "2411 W Peoria Ave",
                "Property Name": "Desert Canyon 300",
                "RBA": 149211,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4708"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.110448,
                    33.580867
                ]
            },
            "properties": {
                "Property Address": "2421 W Peoria Ave",
                "Property Name": "Desert Canyon/200",
                "RBA": 98863,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85029-4944"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9766354,
                    33.5965956
                ]
            },
            "properties": {
                "Property Address": "4835 E Cactus Rd",
                "Property Name": "Paradise Valley Corporate Center",
                "RBA": 198534,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85254-4191"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9757594,
                    33.5876154
                ]
            },
            "properties": {
                "Property Address": "11201 N Tatum Blvd",
                "Property Name": "Stonecreek Pointe",
                "RBA": 110766,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85028-6036"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9769745,
                    33.5884416
                ]
            },
            "properties": {
                "Property Address": "11209 N Tatum Blvd",
                "Property Name": "Tatum Ridge",
                "RBA": 96687,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85028-3091"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9783533,
                    33.5937807
                ]
            },
            "properties": {
                "Property Address": "11801 N Tatum Blvd",
                "Property Name": "PVOP II",
                "RBA": 46834,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85028-1611"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9793398,
                    33.5946111
                ]
            },
            "properties": {
                "Property Address": "11811 N Tatum Blvd",
                "Property Name": "PVOP III",
                "RBA": 268598,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85028-1614"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0507914,
                    33.5481991
                ]
            },
            "properties": {
                "Property Address": "7600 N 15th St",
                "Property Name": "The Plaza at Squaw Peak III",
                "RBA": 135379,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4327"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0469755,
                    33.5438654
                ]
            },
            "properties": {
                "Property Address": "7301 N 16th St",
                "Property Name": "The Peak",
                "RBA": 45840,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-5265"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.04833,
                    33.54406
                ]
            },
            "properties": {
                "Property Address": "7310 N 16th St",
                "Property Name": "Phoenix Peak",
                "RBA": 89099,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-5258"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0491449,
                    33.548297
                ]
            },
            "properties": {
                "Property Address": "7600 N 16th St",
                "Property Name": "Building 2- The Plaza at Squaw Peak",
                "RBA": 160708,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4431"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0489783,
                    33.5500434
                ]
            },
            "properties": {
                "Property Address": "7720 N 16th St",
                "Property Name": "The Summit",
                "RBA": 165748,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4492"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0490018,
                    33.5512968
                ]
            },
            "properties": {
                "Property Address": "7740 N 16th St",
                "Property Name": "The Summit",
                "RBA": 125076,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4479"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0495009,
                    33.5526945
                ]
            },
            "properties": {
                "Property Address": "7878 N 16th St",
                "Property Name": "CASA",
                "RBA": 181138,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4449"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0435736,
                    33.5467513
                ]
            },
            "properties": {
                "Property Address": "7500 N Dreamy Draw Dr",
                "Property Name": "Building 1- The Plaza at Squaw Peak",
                "RBA": 158964,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85020-4660"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0292124,
                    33.5303827
                ]
            },
            "properties": {
                "Property Address": "2423 E Lincoln Dr",
                "Property Name": "Charles Schwab",
                "RBA": 310000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85016-1215"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.062934,
                    33.530325
                ]
            },
            "properties": {
                "Property Address": "745 E Maryland Ave",
                "Property Name": "",
                "RBA": 25200,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85014-1522"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.01616,
                    33.4079985
                ]
            },
            "properties": {
                "Property Address": "4325 S 30th St",
                "Property Name": "Riverpoint-Bldg # 3",
                "RBA": 68699,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.010145,
                    33.410161
                ]
            },
            "properties": {
                "Property Address": "4025 S 32nd St",
                "Property Name": "Allred Riverpoint - Phase I",
                "RBA": 80000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9941094,
                    33.4027856
                ]
            },
            "properties": {
                "Property Address": "4025 E Cotton Center Blvd",
                "Property Name": "Cotton Center I",
                "RBA": 114484,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8866"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.992306,
                    33.4024937
                ]
            },
            "properties": {
                "Property Address": "4121 E Cotton Center Blvd",
                "Property Name": "Caremark-Phoenix",
                "RBA": 99734,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8849"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9900029,
                    33.4014863
                ]
            },
            "properties": {
                "Property Address": "4207 E Cotton Center Blvd",
                "Property Name": "Bldg 10 - Phase III",
                "RBA": 24900,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8893"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9894949,
                    33.4006702
                ]
            },
            "properties": {
                "Property Address": "4217 E Cotton Center Blvd",
                "Property Name": "Bldg 11 - Phase III",
                "RBA": 88140,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8893"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.987627,
                    33.401532
                ]
            },
            "properties": {
                "Property Address": "4303 E Cotton Center Blvd",
                "Property Name": "Bldg 9 - Phase II",
                "RBA": 64000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8853"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.986732,
                    33.400761
                ]
            },
            "properties": {
                "Property Address": "4313 E Cotton Center Blvd",
                "Property Name": "Bldg 8 - Phase II",
                "RBA": 108874,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8856"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9906309,
                    33.4046176
                ]
            },
            "properties": {
                "Property Address": "4320 E Cotton Center Blvd",
                "Property Name": "Quattro - Bldg 2",
                "RBA": 57100,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.986149,
                    33.401408
                ]
            },
            "properties": {
                "Property Address": "4323 E Cotton Center Blvd",
                "Property Name": "",
                "RBA": 35262,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8853"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.985617,
                    33.40202
                ]
            },
            "properties": {
                "Property Address": "4405 E Cotton Center Blvd",
                "Property Name": "Bldg 6 - Phase II",
                "RBA": 54551,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8826"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9871908,
                    33.4030298
                ]
            },
            "properties": {
                "Property Address": "4410 E Cotton Center Blvd",
                "Property Name": "Bldg 13 - Phase IV",
                "RBA": 101269,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.984856,
                    33.401328
                ]
            },
            "properties": {
                "Property Address": "4415 E Cotton Center Blvd",
                "Property Name": "Bldg 5 - Phase II",
                "RBA": 35463,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-8871"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9819064,
                    33.4007991
                ]
            },
            "properties": {
                "Property Address": "4625 E Cotton Center Blvd",
                "Property Name": "Bldg 3",
                "RBA": 73823,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-4807"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9803782,
                    33.400837
                ]
            },
            "properties": {
                "Property Address": "4675 E Cotton Center Blvd",
                "Property Name": "Bldg 2",
                "RBA": 73804,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85040-4809"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0157502,
                    33.4098171
                ]
            },
            "properties": {
                "Property Address": "4150 S Riverpoint Pky",
                "Property Name": "Riverpoint-Bldg # 4",
                "RBA": 132880,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0137203,
                    33.4084258
                ]
            },
            "properties": {
                "Property Address": "3125 E Wood St",
                "Property Name": "Riverpoint-Bldg # 1",
                "RBA": 52640,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85040
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0510083,
                    33.4284239
                ]
            },
            "properties": {
                "Property Address": "2070 S 16th St",
                "Property Name": "Sky Harbor Business Center Bldg A",
                "RBA": 25156,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-5300"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.06114,
                    33.4460708
                ]
            },
            "properties": {
                "Property Address": "920 E Madison St",
                "Property Name": "",
                "RBA": 33464,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-2247"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8946314,
                    33.6153141
                ]
            },
            "properties": {
                "Property Address": "14350 N 87th St",
                "Property Name": "Scottsdale Northsight",
                "RBA": 136676,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8937871,
                    33.6162265
                ]
            },
            "properties": {
                "Property Address": "14400 N 87th St",
                "Property Name": "Northsight Corporate Center",
                "RBA": 136862,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-3653"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.887721,
                    33.6234721
                ]
            },
            "properties": {
                "Property Address": "15100 N 90th St",
                "Property Name": "Phase 2",
                "RBA": 65700,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-2901"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8879504,
                    33.6251121
                ]
            },
            "properties": {
                "Property Address": "15300 N 90th St",
                "Property Name": "Raintree Corporate Center",
                "RBA": 63973,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-2771"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9239571,
                    33.6223113
                ]
            },
            "properties": {
                "Property Address": "7233 E Butherus Dr",
                "Property Name": "",
                "RBA": 77408,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8944326,
                    33.6177626
                ]
            },
            "properties": {
                "Property Address": "SWC E Raintree Dr & N 87th St",
                "Property Name": "Axis Raintree",
                "RBA": 175000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.928639,
                    33.6212722
                ]
            },
            "properties": {
                "Property Address": "7033 E Greenway",
                "Property Name": "Kierland Corporate Center II",
                "RBA": 81894,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9327938,
                    33.6213683
                ]
            },
            "properties": {
                "Property Address": "6909 E Greenway Pky",
                "Property Name": "",
                "RBA": 50141,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2148"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9315657,
                    33.6222214
                ]
            },
            "properties": {
                "Property Address": "6929 E Greenway Pky",
                "Property Name": "",
                "RBA": 50000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2169"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9304519,
                    33.6223593
                ]
            },
            "properties": {
                "Property Address": "7025 E Greenway Pky",
                "Property Name": "Kierland Executive Ctr 1",
                "RBA": 36513,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2159"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.928753,
                    33.6223956
                ]
            },
            "properties": {
                "Property Address": "7047 E Greenway Pky",
                "Property Name": "Kierland Corporate Center",
                "RBA": 112030,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-8107"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9322788,
                    33.6192265
                ]
            },
            "properties": {
                "Property Address": "14614 N Kierland Blvd",
                "Property Name": "Element at Kierland",
                "RBA": 55268,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2715"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9305631,
                    33.6203255
                ]
            },
            "properties": {
                "Property Address": "14635 N Kierland Blvd",
                "Property Name": "Corporate Center at Kierland",
                "RBA": 107846,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2768"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9326586,
                    33.6203226
                ]
            },
            "properties": {
                "Property Address": "14646 N Kierland Blvd",
                "Property Name": "Mesquite Corporate Center",
                "RBA": 78905,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2759"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9304782,
                    33.6213001
                ]
            },
            "properties": {
                "Property Address": "14811 N Kierland Blvd",
                "Property Name": "Kierland Executive Center II",
                "RBA": 28534,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2729"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9297289,
                    33.6240199
                ]
            },
            "properties": {
                "Property Address": "15051 N Kierland Blvd",
                "Property Name": "",
                "RBA": 61718,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-8141"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9297195,
                    33.6245498
                ]
            },
            "properties": {
                "Property Address": "15211 N Kierland Blvd",
                "Property Name": "",
                "RBA": 32236,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-8159"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.898461,
                    33.6172514
                ]
            },
            "properties": {
                "Property Address": "14500 N Northsight Blvd",
                "Property Name": "Northsight Financial Center",
                "RBA": 120040,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-3658"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8926588,
                    33.6132701
                ]
            },
            "properties": {
                "Property Address": "14000 N Pima Rd",
                "Property Name": "Pima Northgate",
                "RBA": 144959,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8896108,
                    33.6234959
                ]
            },
            "properties": {
                "Property Address": "15111 N Pima Rd",
                "Property Name": "Phase II",
                "RBA": 149992,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-2779"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8893991,
                    33.6251672
                ]
            },
            "properties": {
                "Property Address": "15333 N Pima Rd",
                "Property Name": "Raintree Corporate Center I",
                "RBA": 149083,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-2783"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8898917,
                    33.6188243
                ]
            },
            "properties": {
                "Property Address": "8800 E Raintree Dr",
                "Property Name": "Raintree Corp. Ctr. - Phase III",
                "RBA": 168594,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-3957"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8896259,
                    33.6176426
                ]
            },
            "properties": {
                "Property Address": "8801 E Raintree Dr",
                "Property Name": "",
                "RBA": 52568,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8896601,
                    33.6212872
                ]
            },
            "properties": {
                "Property Address": "8888 E Raintree Dr",
                "Property Name": "Raintree Corporate Center - Phase IV",
                "RBA": 176823,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8878892,
                    33.6179279
                ]
            },
            "properties": {
                "Property Address": "8901 E Raintree Dr",
                "Property Name": "",
                "RBA": 58706,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85260
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9267118,
                    33.6191524
                ]
            },
            "properties": {
                "Property Address": "14624 N Scottsdale Rd",
                "Property Name": "Pinnacle in Kierland Bldg I",
                "RBA": 81000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2753"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.927386,
                    33.619733
                ]
            },
            "properties": {
                "Property Address": "14636 N Scottsdale Rd",
                "Property Name": "Pinnacle in Kierland Bldg III",
                "RBA": 106000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2701"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.926836,
                    33.6203222
                ]
            },
            "properties": {
                "Property Address": "14648 N Scottsdale Rd",
                "Property Name": "Pinnacle in Kierland Bldg II",
                "RBA": 82500,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-2739"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.926514,
                    33.6220879
                ]
            },
            "properties": {
                "Property Address": "14850 N Scottsdale Rd",
                "Property Name": "Pinnacle in Kierland IV",
                "RBA": 210000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.92315,
                    33.623351
                ]
            },
            "properties": {
                "Property Address": "15059 N Scottsdale Rd",
                "Property Name": "Phase III -  Block M",
                "RBA": 169189,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.924063,
                    33.623797
                ]
            },
            "properties": {
                "Property Address": "15147 N Scottsdale Rd",
                "Property Name": "Phase II - Block H",
                "RBA": 120500,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.925208,
                    33.623787
                ]
            },
            "properties": {
                "Property Address": "15169 N Scottsdale Rd",
                "Property Name": "Phase I -  Block C",
                "RBA": 101855,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9273212,
                    33.6245482
                ]
            },
            "properties": {
                "Property Address": "15210 N Scottsdale Rd",
                "Property Name": "The Offices at Kierland Commons Ph I",
                "RBA": 65000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85254-8124"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9243396,
                    33.624462
                ]
            },
            "properties": {
                "Property Address": "15257 N Scottsdale Rd",
                "Property Name": "Phase II -  Block F",
                "RBA": 94733,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9250769,
                    33.6248749
                ]
            },
            "properties": {
                "Property Address": "15279 N Scottsdale Rd",
                "Property Name": "Phase I -  Block B",
                "RBA": 98100,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85254
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.918112,
                    33.62461
                ]
            },
            "properties": {
                "Property Address": "7428 E Karen Dr",
                "Property Name": "Airpark Center",
                "RBA": 40589,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85260-2443"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9367008,
                    33.5027494
                ]
            },
            "properties": {
                "Property Address": "6710 E Camelback Rd",
                "Property Name": "",
                "RBA": 38168,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-2031"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9359673,
                    33.5024705
                ]
            },
            "properties": {
                "Property Address": "6740 E Camelback Rd",
                "Property Name": "",
                "RBA": 20000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-2096"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9321782,
                    33.5027632
                ]
            },
            "properties": {
                "Property Address": "6900 E Camelback Rd",
                "Property Name": "Camelback Tower",
                "RBA": 136500,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-2431"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.931587,
                    33.501416
                ]
            },
            "properties": {
                "Property Address": "6991 E Camelback Rd",
                "Property Name": "The Square",
                "RBA": 175268,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-2432"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.926882,
                    33.50271
                ]
            },
            "properties": {
                "Property Address": "7150 E Camelback Rd",
                "Property Name": "Scottsdale Fashion Square Office Bldg",
                "RBA": 393675,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-1200"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.92476,
                    33.501716
                ]
            },
            "properties": {
                "Property Address": "7201 E Camelback Rd",
                "Property Name": "Scottsdale City Centre",
                "RBA": 67691,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3325"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8910593,
                    33.5099039
                ]
            },
            "properties": {
                "Property Address": "8800 E Chaparral Rd",
                "Property Name": "Chaparral Business Center Phase II",
                "RBA": 85599,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-2603"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8911175,
                    33.5123736
                ]
            },
            "properties": {
                "Property Address": "8840 E Chaparral Rd",
                "Property Name": "Chaparral Business Center Phase IV",
                "RBA": 75000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-2611"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9222192,
                    33.4954563
                ]
            },
            "properties": {
                "Property Address": "4150 N Drinkwater Blvd",
                "Property Name": "Lincoln Towne Centre (4150 Building)",
                "RBA": 113179,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3611"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.922154,
                    33.49656
                ]
            },
            "properties": {
                "Property Address": "4250 N Drinkwater Blvd",
                "Property Name": "Lincoln Towne Centre (4250 Building)",
                "RBA": 113179,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3981"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9245433,
                    33.4956175
                ]
            },
            "properties": {
                "Property Address": "7272 E Indian School Rd",
                "Property Name": "7272 Old Town",
                "RBA": 154764,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3921"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.919476,
                    33.524679
                ]
            },
            "properties": {
                "Property Address": "7500 E McDonald Dr",
                "Property Name": "",
                "RBA": 21517,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-6052"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8890267,
                    33.5139792
                ]
            },
            "properties": {
                "Property Address": "5301 N Pima Rd",
                "Property Name": "Chaparral Business Center Phase V",
                "RBA": 69197,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-2601"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8890468,
                    33.5157574
                ]
            },
            "properties": {
                "Property Address": "5401 N Pima Rd",
                "Property Name": "Chaparral Business Center Phase VI",
                "RBA": 69192,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85250
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8890358,
                    33.5195375
                ]
            },
            "properties": {
                "Property Address": "5601 N Pima Rd",
                "Property Name": "Bldg A",
                "RBA": 135585,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85250
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8891313,
                    33.5186212
                ]
            },
            "properties": {
                "Property Address": "5701 N Pima Rd",
                "Property Name": "Bldg B",
                "RBA": 135500,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85250
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8899912,
                    33.521041
                ]
            },
            "properties": {
                "Property Address": "5801 N Pima Rd",
                "Property Name": "Chaparral Commerce Center III",
                "RBA": 124879,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85250
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.927203,
                    33.508508
                ]
            },
            "properties": {
                "Property Address": "4800 N Scottsdale",
                "Property Name": "Portales Corporate Center I",
                "RBA": 275575,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-7630"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9286671,
                    33.5084457
                ]
            },
            "properties": {
                "Property Address": "4900 N Scottsdale",
                "Property Name": "Portales Corporate Center II",
                "RBA": 173000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-7652"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9255384,
                    33.4635727
                ]
            },
            "properties": {
                "Property Address": "1355 N Scottsdale Rd",
                "Property Name": "SkySong Innovation Center 4",
                "RBA": 154860,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85257
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9245121,
                    33.463502
                ]
            },
            "properties": {
                "Property Address": "1365 N Scottsdale Rd",
                "Property Name": "SkySong Innovation Center 3",
                "RBA": 145000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85257
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9232177,
                    33.4635334
                ]
            },
            "properties": {
                "Property Address": "1375 N Scottsdale Rd",
                "Property Name": "SkySong Innovation Center 2",
                "RBA": 144813,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85257
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9244127,
                    33.4641845
                ]
            },
            "properties": {
                "Property Address": "1465 N Scottsdale Rd",
                "Property Name": "SkySong Innovation Center 5",
                "RBA": 151318,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85257
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9232608,
                    33.4641441
                ]
            },
            "properties": {
                "Property Address": "1475 N Scottsdale Rd",
                "Property Name": "SkySong Innovation Center 1",
                "RBA": 144832,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": 85257
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9265949,
                    33.4957285
                ]
            },
            "properties": {
                "Property Address": "4110 N Scottsdale Rd",
                "Property Name": "Scottsdale Financial Center I",
                "RBA": 107645,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3919"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9254253,
                    33.4956465
                ]
            },
            "properties": {
                "Property Address": "4141 N Scottsdale Rd",
                "Property Name": "4141 Scottsdale",
                "RBA": 147356,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3907"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.925169,
                    33.499016
                ]
            },
            "properties": {
                "Property Address": "4301 N Scottsdale Rd",
                "Property Name": "Galleria",
                "RBA": 136171,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3348"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.924811,
                    33.500041
                ]
            },
            "properties": {
                "Property Address": "4343 N Scottsdale Rd",
                "Property Name": "Galleria",
                "RBA": 451463,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85251-3343"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.924758,
                    33.528637
                ]
            },
            "properties": {
                "Property Address": "6263 N Scottsdale Rd",
                "Property Name": "The Scottsdale Forum",
                "RBA": 213501,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-5406"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8891352,
                    33.5119755
                ]
            },
            "properties": {
                "Property Address": "8860 E Chaparral Rd",
                "Property Name": "Chaparral Business Center Phase III",
                "RBA": 69882,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-2610"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8892035,
                    33.5101465
                ]
            },
            "properties": {
                "Property Address": "8900 E Chaparral Rd",
                "Property Name": "Chaparral Business Center Phase I",
                "RBA": 50000,
                "City": "Scottsdale",
                "State": "AZ",
                "Zip": "85250-2602"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0830437,
                    33.4498579
                ]
            },
            "properties": {
                "Property Address": "100 N 7th Ave",
                "Property Name": "Madison Square",
                "RBA": 94284,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85007
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0990475,
                    33.4500524
                ]
            },
            "properties": {
                "Property Address": "150 N 18th Ave",
                "Property Name": "",
                "RBA": 178289,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85007
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0836701,
                    33.449672
                ]
            },
            "properties": {
                "Property Address": "800 W Adams St",
                "Property Name": "Grace Court School",
                "RBA": 31842,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85007-2730"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0608571,
                    33.4452337
                ]
            },
            "properties": {
                "Property Address": "920 E Jackson St",
                "Property Name": "",
                "RBA": 36000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85034
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0641993,
                    33.4467006
                ]
            },
            "properties": {
                "Property Address": "701 E Jefferson St",
                "Property Name": "Professional Center - Phase II",
                "RBA": 80840,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-2215"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0635893,
                    33.4467102
                ]
            },
            "properties": {
                "Property Address": "801 E Jefferson St",
                "Property Name": "Professional Center",
                "RBA": 80840,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-2217"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0560133,
                    33.446813
                ]
            },
            "properties": {
                "Property Address": "1201 E Jefferson St",
                "Property Name": "New Times Bldg A & B",
                "RBA": 36000,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85034-2300"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.0927408,
                    33.4467286
                ]
            },
            "properties": {
                "Property Address": "1535 W Jefferson St",
                "Property Name": "",
                "RBA": 57541,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": 85007
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8564509,
                    33.3924818
                ]
            },
            "properties": {
                "Property Address": "1201 S Alma School Rd",
                "Property Name": "The Mesa Tower",
                "RBA": 311132,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85210-2008"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8582518,
                    33.392616
                ]
            },
            "properties": {
                "Property Address": "1220 S Alma School Rd",
                "Property Name": "Fiesta Square",
                "RBA": 34535,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85210-2068"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8653204,
                    33.3943591
                ]
            },
            "properties": {
                "Property Address": "1550 W Southern Ave",
                "Property Name": "Centrica",
                "RBA": 116982,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85202-4817"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9411099,
                    33.4271377
                ]
            },
            "properties": {
                "Property Address": "51 W 3rd St",
                "Property Name": "Bldg E",
                "RBA": 74307,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-2831"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9618892,
                    33.4267417
                ]
            },
            "properties": {
                "Property Address": "1415 W 3rd St",
                "Property Name": "",
                "RBA": 82257,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-7634"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.936789,
                    33.425965
                ]
            },
            "properties": {
                "Property Address": "200 E 5th St",
                "Property Name": "",
                "RBA": 40000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9643464,
                    33.4126466
                ]
            },
            "properties": {
                "Property Address": "1515 W 14th St",
                "Property Name": "1515 Corporate Center",
                "RBA": 225000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-6910"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9664556,
                    33.4109451
                ]
            },
            "properties": {
                "Property Address": "1616 W 17th St",
                "Property Name": "",
                "RBA": 111349,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-6217"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9676813,
                    33.412538
                ]
            },
            "properties": {
                "Property Address": "1401 S 52nd St",
                "Property Name": "Tempe Tech Center",
                "RBA": 169907,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-6988"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8608614,
                    33.4335057
                ]
            },
            "properties": {
                "Property Address": "1130 N Alma School Rd",
                "Property Name": "WayPoint 3",
                "RBA": 153134,
                "City": "Mesa",
                "State": "AZ",
                "Zip": 85201
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8605949,
                    33.4349786
                ]
            },
            "properties": {
                "Property Address": "1138 N Alma School Rd",
                "Property Name": "WayPoint 1",
                "RBA": 83264,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-6695"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8589098,
                    33.4360553
                ]
            },
            "properties": {
                "Property Address": "1146 N Alma School Rd",
                "Property Name": "WayPoint 2",
                "RBA": 81597,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-3000"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8572517,
                    33.4354086
                ]
            },
            "properties": {
                "Property Address": "1150 N Alma School Rd",
                "Property Name": "WayPoint 4",
                "RBA": 108956,
                "City": "Mesa",
                "State": "AZ",
                "Zip": "85201-3000"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8941097,
                    33.406531
                ]
            },
            "properties": {
                "Property Address": "2141 E Broadway Rd",
                "Property Name": "Broadway 101",
                "RBA": 82369,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-1892"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8929089,
                    33.4066045
                ]
            },
            "properties": {
                "Property Address": "2151 E Broadway Rd",
                "Property Name": "Broadway 101",
                "RBA": 82370,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-1893"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9599213,
                    33.4456061
                ]
            },
            "properties": {
                "Property Address": "1600 N Desert Dr",
                "Property Name": "Papago Technology Center – 1600 Building",
                "RBA": 87714,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1797"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9603677,
                    33.4472137
                ]
            },
            "properties": {
                "Property Address": "1700 N Desert Dr",
                "Property Name": "Papago Technology Center",
                "RBA": 75034,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1228"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9099629,
                    33.4495964
                ]
            },
            "properties": {
                "Property Address": "1700 N McClintock Dr",
                "Property Name": "Oakland Construction Offices",
                "RBA": 39156,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1646"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.940349,
                    33.4280519
                ]
            },
            "properties": {
                "Property Address": "222 S Mill Ave",
                "Property Name": "Tempe Gateway",
                "RBA": 263937,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9409513,
                    33.4238326
                ]
            },
            "properties": {
                "Property Address": "660 S Mill Ave",
                "Property Name": "Bldg A",
                "RBA": 79288,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3665"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9395428,
                    33.4234983
                ]
            },
            "properties": {
                "Property Address": "699 S Mill Ave",
                "Property Name": "ASU Building",
                "RBA": 232614,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9389077,
                    33.423867
                ]
            },
            "properties": {
                "Property Address": "699 S Mill Ave",
                "Property Name": "",
                "RBA": 97685,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3673"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9403162,
                    33.4227295
                ]
            },
            "properties": {
                "Property Address": "740 S Mill Ave",
                "Property Name": "Bldg D",
                "RBA": 51035,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9269948,
                    33.4227787
                ]
            },
            "properties": {
                "Property Address": "777 S Novus Pl",
                "Property Name": "777 Tower at Novus Innovation Corridor",
                "RBA": 169500,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.956197,
                    33.444652
                ]
            },
            "properties": {
                "Property Address": "1500 N Priest Dr",
                "Property Name": "Phase I",
                "RBA": 269016,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1213"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.954932,
                    33.448083
                ]
            },
            "properties": {
                "Property Address": "1667 N Priest Dr",
                "Property Name": "JB Rogers",
                "RBA": 40000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1231"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.939527,
                    33.430432
                ]
            },
            "properties": {
                "Property Address": "40 E Rio Salado Pky",
                "Property Name": "Hayden Ferry Lakeside III",
                "RBA": 264236,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9393656,
                    33.4312489
                ]
            },
            "properties": {
                "Property Address": "60 E Rio Salado Pky",
                "Property Name": "Hayden Ferry Lakeside II",
                "RBA": 299540,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9383471,
                    33.4313862
                ]
            },
            "properties": {
                "Property Address": "80 E Rio Salado Pky",
                "Property Name": "Hayden Ferry Lakeside - Phase I",
                "RBA": 203113,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.934296,
                    33.430624
                ]
            },
            "properties": {
                "Property Address": "300 E Rio Salado Pky",
                "Property Name": "State Farm - Bldg A",
                "RBA": 377573,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.933371,
                    33.430325
                ]
            },
            "properties": {
                "Property Address": "400 E Rio Salado Pky",
                "Property Name": "State Farm - Bldg B",
                "RBA": 584318,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.932432,
                    33.430111
                ]
            },
            "properties": {
                "Property Address": "450 E Rio Salado Pky",
                "Property Name": "State Farm - Bldg C",
                "RBA": 265971,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.931306,
                    33.429725
                ]
            },
            "properties": {
                "Property Address": "500 E Rio Salado Pky",
                "Property Name": "State Farm - Bldg D",
                "RBA": 372741,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.930065,
                    33.429506
                ]
            },
            "properties": {
                "Property Address": "600 E Rio Salado Pky",
                "Property Name": "State Farm - Bldg E",
                "RBA": 430690,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8948113,
                    33.4320196
                ]
            },
            "properties": {
                "Property Address": "2100 E Rio Salado Pky",
                "Property Name": "Rio2100 Phase V",
                "RBA": 169000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3002"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8967999,
                    33.43451
                ]
            },
            "properties": {
                "Property Address": "2100 E Rio Salado Pky",
                "Property Name": "RIO2100 Bldg 3",
                "RBA": 150000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8980902,
                    33.4347622
                ]
            },
            "properties": {
                "Property Address": "2100 E Rio Salado Pky",
                "Property Name": "RIO2100 Bldg 2",
                "RBA": 150000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8972991,
                    33.4317072
                ]
            },
            "properties": {
                "Property Address": "2120 E Rio Salado Pky",
                "Property Name": "RIO2100 Bldg 1",
                "RBA": 100102,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9420039,
                    33.4289729
                ]
            },
            "properties": {
                "Property Address": "111 W Rio Salado Pky",
                "Property Name": "ADP",
                "RBA": 225000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-2880"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9487744,
                    33.4317819
                ]
            },
            "properties": {
                "Property Address": "850 W Rio Salado Pky",
                "Property Name": "I.D.E.A. Tempe Phase I",
                "RBA": 185833,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.954989,
                    33.430082
                ]
            },
            "properties": {
                "Property Address": "1155 W Rio Salado Pky",
                "Property Name": "Building B",
                "RBA": 37643,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.955922,
                    33.4302542
                ]
            },
            "properties": {
                "Property Address": "1215 W Rio Salado Pky",
                "Property Name": "Phase II Building A",
                "RBA": 45118,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9567052,
                    33.4303584
                ]
            },
            "properties": {
                "Property Address": "1255 W Rio Salado Pky",
                "Property Name": "Phase II Bldg B",
                "RBA": 45118,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9638523,
                    33.4309308
                ]
            },
            "properties": {
                "Property Address": "1720 W Rio Salado Pky",
                "Property Name": "Bldg VI",
                "RBA": 96000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9657951,
                    33.4305884
                ]
            },
            "properties": {
                "Property Address": "1721 W Rio Salado Pky",
                "Property Name": "Bldg C",
                "RBA": 40812,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9653817,
                    33.4319393
                ]
            },
            "properties": {
                "Property Address": "1850 W Rio Salado Pky",
                "Property Name": "Bldg I",
                "RBA": 154029,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9657046,
                    33.4334481
                ]
            },
            "properties": {
                "Property Address": "1870 W Rio Salado Pky",
                "Property Name": "Bldg IV",
                "RBA": 236131,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9676524,
                    33.4320202
                ]
            },
            "properties": {
                "Property Address": "1910 W Rio Salado Pky",
                "Property Name": "Bldg II",
                "RBA": 156583,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9675663,
                    33.4334391
                ]
            },
            "properties": {
                "Property Address": "1930 W Rio Salado Pky",
                "Property Name": "Liberty Center at Rio Salado - Bldg III",
                "RBA": 135663,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.969273,
                    33.431632
                ]
            },
            "properties": {
                "Property Address": "2010 W Rio Salado Pky",
                "Property Name": "",
                "RBA": 70000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.8936098,
                    33.4236434
                ]
            },
            "properties": {
                "Property Address": "615 S River Dr",
                "Property Name": "The Circuit",
                "RBA": 185000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3099"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.898054,
                    33.4324608
                ]
            },
            "properties": {
                "Property Address": "56 S Rockford Dr",
                "Property Name": "Benchmark At Rio2100",
                "RBA": 63500,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-6070"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9543879,
                    33.4398352
                ]
            },
            "properties": {
                "Property Address": "1033 W Roosevelt Way",
                "Property Name": "The Grand at Papago Park Phase II",
                "RBA": 345795,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9274991,
                    33.4336322
                ]
            },
            "properties": {
                "Property Address": "410 N Scottsdale Rd",
                "Property Name": "The Watermark Phase I",
                "RBA": 265000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9158516,
                    33.3938439
                ]
            },
            "properties": {
                "Property Address": "1400 E Southern Ave",
                "Property Name": "Tempe City Center",
                "RBA": 133871,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-5691"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9391329,
                    33.4221911
                ]
            },
            "properties": {
                "Property Address": "20 E University Dr",
                "Property Name": "Tempe Town Centre",
                "RBA": 21737,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-5617"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9408971,
                    33.4224658
                ]
            },
            "properties": {
                "Property Address": "100 W University Dr",
                "Property Name": "100 Centerpoint",
                "RBA": 179025,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3725"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9417745,
                    33.4221924
                ]
            },
            "properties": {
                "Property Address": "150 W University Dr",
                "Property Name": "",
                "RBA": 119929,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3640"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9677139,
                    33.4226141
                ]
            },
            "properties": {
                "Property Address": "1900 W University Dr",
                "Property Name": "Regents Centre",
                "RBA": 63320,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3291"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9690973,
                    33.4224575
                ]
            },
            "properties": {
                "Property Address": "1910 W University Dr",
                "Property Name": "Regents Centre",
                "RBA": 42000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-3262"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.961553,
                    33.450664
                ]
            },
            "properties": {
                "Property Address": "5555 E Van Buren St",
                "Property Name": "5555 EVB",
                "RBA": 59459,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85008-3411"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9443827,
                    33.4377594
                ]
            },
            "properties": {
                "Property Address": "350 W Washington St",
                "Property Name": "Papago Gateway Center",
                "RBA": 246770,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9533567,
                    33.4410493
                ]
            },
            "properties": {
                "Property Address": "1050 W Washington St",
                "Property Name": "The Reserve at Papago Park",
                "RBA": 84150,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9557429,
                    33.4402633
                ]
            },
            "properties": {
                "Property Address": "1101 W Washington St",
                "Property Name": "The Grand at Papago Park Center Phase I",
                "RBA": 213026,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.952824,
                    33.443057
                ]
            },
            "properties": {
                "Property Address": "1144 W Washington St",
                "Property Name": "One Papago Hills",
                "RBA": 91000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1200"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.954071,
                    33.44263
                ]
            },
            "properties": {
                "Property Address": "1150 W Washington St",
                "Property Name": "Wells Fargo Office Building",
                "RBA": 214303,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1480"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9574795,
                    33.4427365
                ]
            },
            "properties": {
                "Property Address": "1225 W Washington St",
                "Property Name": "Papago Spectrum Office Building",
                "RBA": 159261,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1236"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9569328,
                    33.4445521
                ]
            },
            "properties": {
                "Property Address": "1230 W Washington St",
                "Property Name": "Phase II",
                "RBA": 166800,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1245"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9579939,
                    33.4449713
                ]
            },
            "properties": {
                "Property Address": "1250 W Washington St",
                "Property Name": "Phase III",
                "RBA": 96000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.959665,
                    33.4423313
                ]
            },
            "properties": {
                "Property Address": "1255 W Washington St",
                "Property Name": "Papago Arroyo",
                "RBA": 118000,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1210"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9600792,
                    33.4433864
                ]
            },
            "properties": {
                "Property Address": "1275 W Washington St",
                "Property Name": "Papago Arroyo",
                "RBA": 95694,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1858"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9592523,
                    33.4442433
                ]
            },
            "properties": {
                "Property Address": "1295 W Washington St",
                "Property Name": "Papago Arroyo",
                "RBA": 65809,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-1232"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.959293,
                    33.428464
                ]
            },
            "properties": {
                "Property Address": "1305 W 1st St",
                "Property Name": "",
                "RBA": 49100,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-2458"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9643083,
                    33.4103105
                ]
            },
            "properties": {
                "Property Address": "1516 W 17th St",
                "Property Name": "Bldg A",
                "RBA": 106747,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-6218"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9645775,
                    33.4297622
                ]
            },
            "properties": {
                "Property Address": "1621 W Rio Salado Pky",
                "Property Name": "Bldg D - Phase II",
                "RBA": 51789,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-2608"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.966586,
                    33.429824
                ]
            },
            "properties": {
                "Property Address": "1821 W Rio Salado Pky",
                "Property Name": "Phase I - Bldg E US Airways",
                "RBA": 99607,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.967428,
                    33.4305552
                ]
            },
            "properties": {
                "Property Address": "1921 W Rio Salado Pky",
                "Property Name": "US Airways Bldg B - Phase I",
                "RBA": 48066,
                "City": "Tempe",
                "State": "AZ",
                "Zip": 85281
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.968822,
                    33.4301183
                ]
            },
            "properties": {
                "Property Address": "2021 W Rio Salado Pky",
                "Property Name": "Phase II - Bldg A",
                "RBA": 56389,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85281-2701"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9703885,
                    33.3985085
                ]
            },
            "properties": {
                "Property Address": "2900 S Diablo Way",
                "Property Name": "Bldg A",
                "RBA": 137500,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3201"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.968794,
                    33.395616
                ]
            },
            "properties": {
                "Property Address": "1919 W Fairmont Dr",
                "Property Name": "Fairmont Commerce Center",
                "RBA": 85890,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3183"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-111.9614525,
                    33.3975361
                ]
            },
            "properties": {
                "Property Address": "2980 S Priest Dr",
                "Property Name": "State Farm Building 4",
                "RBA": 40971,
                "City": "Tempe",
                "State": "AZ",
                "Zip": "85282-3456"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-112.11757,
                    33.483001
                ]
            },
            "properties": {
                "Property Address": "3002 N 27th Ave",
                "Property Name": "",
                "RBA": 30345,
                "City": "Phoenix",
                "State": "AZ",
                "Zip": "85017-5028"
            }
        }
    ]
};