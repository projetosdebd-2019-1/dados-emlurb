(function ServicosMaisRecorrentes(Leaflet, axios, $) {


  const baseurl = 'api/heat-map';
  const map = Leaflet.map('map').setView([-8.056925, -34.883004], 13); // Recife view
  let addressPoints = [];
  let heatLayer;
  let distinctServices;

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


  const loadMapData = (bairro, ano=null) => {
    axios.get(`${baseurl}/ServicosRecorrentes${bairro ? '?bairro='+bairro : '' }${ano ? '&ano='+ano : '' }`)
      .then((response) => {
        const { data } = response;
        console.log(data);
        setMapDescription(data.definition);
        setAddressPoints(data.data);
        setMapPoints(addressPoints);
        var distinctServices = [...new Set(data.data.map(x => x.descricao))]
        console.log(distinctServices);
        for (var service in distinctServices) {
          document.getElementById('top-3-services').innerHTML += '<li>' + distinctServices.pop(service) + '</li>';
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  const setBairroDropdown = (myOptions) => {
    var mySelect = $('#inputBairroServicoRecorr');
    $.each(myOptions, (i, data) => {
      console.log(i, data);
      mySelect.append(
        $(`<option></option>`).val(data.bairro).html(data.bairro)
      );
    });
  }

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
      ano: $( "#inputAnoServicoRecorr" ).val(),
      bairro: $( "#inputBairroServicoRecorr" ).val(),
    }
  };


  const filter = () => {
    let { ano, bairro } = getFormData();
    if (ano === "todos") ano = null;
    loadMapData(bairro, ano);
  }


    // run
    const run = async () => {

        setupMap();
        await loadBairro();
        filter();
    
        $("#filters").submit(function(e){
          e.preventDefault();
          filter();
        });
    
      };

  run();
})(L, axios, $);