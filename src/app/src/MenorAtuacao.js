(function MenorAtuacao(Leaflet, axios, $) {

  const map = Leaflet.map('map').setView([-8.056925, -34.883004], 13); // Recife view
  let addressPoints = [];
  let heatLayer;

  const setupMap = () => {
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    heatLayer = Leaflet.heatLayer(addressPoints).addTo(map);
  };

  const setMapPoints = (latlngs) => {
    heatLayer.setLatLngs(latlngs).addTo(map);
  };

  const setAddressPoints = (addresses) => {
    addressPoints = addresses.map((address) => [address.lat, address.lng]);
  };

  const setMapDescription = (description) => {
    $('#heatmap-desc').text(description);
  }

  const loadMapData = (ano=null) => {
    axios.get(`api/heat-map/MenorAtuacao${ano ? '?ano='+ano : '' }`)
      .then((response) => {
        const { data } = response;
        console.log(data);
        setMapDescription(data.definition);
        setAddressPoints(data.data);
        setMapPoints(addressPoints);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getFormData = () => {
    return {
      ano: $( "#inputAno" ).val()
    }
  };

  const filter = () => {
    let { ano } = getFormData();
    if (ano === "todos") ano = null;
    loadMapData(ano);
  }

  // run
  const run = async () => {

    setupMap();
    loadMapData();

    $("#filters").submit(function(e){
      e.preventDefault();
      filter();
      // console.log()
    });

  };

  run();
})(L, axios, $);




