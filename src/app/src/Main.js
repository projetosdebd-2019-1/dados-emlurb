(function Main(Leaflet, axios, $) {

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

  const loadMapData = (situacao, bairro, ano=null) => {
    var x = {situacao, bairro, ano}
    var keys = Object.keys(x)
    var reduzido = keys.reduce((prev, curr) => { if(x[curr]) {prev[curr] = x[curr]  } return prev }, {})
    var queryString = $.param(reduzido);
    
    console.log(queryString);
    axios.get(`api/heat-map/TodosChamados?${queryString}`)
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


  const setSituacaoDropdown = (myOptions) => {
    var mySelect = $('#inputSituacao');
    mySelect.append(
      $(`<option></option>`).val(null).html(null)
    );
    $.each(myOptions, (i, data) => {
      console.log(i, data);
      mySelect.append(
        $(`<option></option>`).val(data.situacao).html(data.situacao)
      );
    });
  }

  const setBairroDropdown = (myOptions) => {
    var mySelect = $('#inputBairro');
    mySelect.append(
      $(`<option></option>`).val(null).html(null)
    );
    $.each(myOptions, (i, data) => {
      console.log(i, data);
      mySelect.append(
        $(`<option></option>`).val(data.bairro).html(data.bairro)
      );
    });
  }

  const loadSituacao = async () => {
    try {
      const response = await axios.get(`${baseurl}/Situacao`);
      const { data } = response;
      setSituacaoDropdown(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBairro = async () => {
    try {
      const response = await axios.get(`${baseurl}/Bairros`);
      const { data } = response;
      setBairroDropdown(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFormData = () => {
    return {
      ano: $( "#inputAno" ).val(),
      situacao: $( "#inputSituacao" ).val(),
      bairro: $( "#inputBairro" ).val()
    }
  };

  const filter = () => {
    let { ano, situacao, bairro } = getFormData();
    if (ano === "todos") ano = null;
    loadMapData(situacao, bairro, ano);
  }

  // run
  const run = async () => {

    setupMap();
    await loadSituacao();
    await loadBairro();
    filter();

    $("#filters").submit(function(e){
      e.preventDefault();
      filter();
    });

  };


  run();
})(L, axios, $);




