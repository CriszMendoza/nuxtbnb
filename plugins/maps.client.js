export default (_, inject) => {
  let isLoaded = false;
  let waiting = [];

  const addScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsZLvAAaSYGUy5nUHGTwkUBOeQK_ynCho&libraries=places&callback=initGoogleMaps";
    script.async = true;

    window.initGoogleMaps = initGoogleMaps;
    document.head.appendChild(script);
  };

  const initGoogleMaps = () => {
    isLoaded = true;
    waiting.forEach(({ fn, params }) => {
      if (typeof fn === "function") fn(...params);
    });
    waiting = [];
  };

  const showMaps = (canvas, lat, lng) => {
    if (!isLoaded) {
      waiting.push({ fn: showMaps, params: [canvas, lat, lng] });
      return;
    }
    const position = new window.google.maps.LatLng(lat, lng);

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true,
    };

    const map = new window.google.maps.Map(canvas, mapOptions);
    const marker = new window.google.maps.Marker({ position });

    marker.setMap(map);
  };

  const makeAutocomplete = (input) => {
    if (!isLoaded) {
      waiting.push({ fn: makeAutocomplete, params: [input] });
      return;
    }
    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      types: ["(cities)"],
    });

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      input.dispatchEvent(new CustomEvent("changed", { detail: place }));
    });
  };

  addScript();

  inject("maps", {
    showMaps,
    makeAutocomplete,
  });
};
