(function MaiorIncidencia(Leaflet, axios, $) {

  const baseurl = 'api/heat-map';
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

  const loadMapData = (descricao, ano=null) => {
    axios.get(`${baseurl}/Insidencia${descricao ? '?descricao='+descricao : '' }${ano ? '&ano='+ano : '' }`)
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

  const setDescricaoDropdown = (myOptions) => {
    var mySelect = $('#inputDescricao');
    $.each(myOptions, (i, data) => {
      console.log(i, data);
      mySelect.append(
        $(`<option></option>`).val(data.descricao).html(data.descricao)
      );
    });
  }

  const loadDescricao = async () => {
    try {
      const response = await axios.get(`${baseurl}/Descricao`);
      const { data } = response;
      console.log(data);
      setDescricaoDropdown(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFormData = () => {
    return {
      ano: $( "#inputAno" ).val(),
      descricao: $( "#inputDescricao" ).val(),
    }
  };

  const filter = () => {
    let { ano, descricao } = getFormData();
    if (ano === "todos") ano = null;
    loadMapData(descricao, ano);
  }

  // run
  const run = async () => {

    setupMap();
    await loadDescricao();
    filter();

    $("#filters").submit(function(e){
      e.preventDefault();
      filter();
    });

  };

  run();
})(L, axios, $);




