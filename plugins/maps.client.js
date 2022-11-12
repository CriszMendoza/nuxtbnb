export default (_, inject) => {
  let isLoaded = false;
  let waiting = [];

  const initGoogleMaps = () => {
    isLoaded = true;

    waiting.forEach(({ fn, args }) => {
      if (typeof fn === "function") {
        fn(...args);
      }
    });
    waiting = [];
  };

  const makeAutoComplete = (input) => {
    if (!isLoaded) {
      waiting.push({ fn: makeAutoComplete, args: [input] });
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

  const showMap = (canvas, lat, lng, markers = []) => {
    if (!isLoaded) {
      waiting.push({ fn: showMap, args: [canvas, lat, lng] });
      return;
    }

    const position = new window.google.maps.LatLng(lat, lng);

    const mapOptions = {
      zoom: 18,
      zoomControl: true,
      center: position,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "poi.business",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    const map = new window.google.maps.Map(canvas, mapOptions);

    if (markers.length === 0) {
      const marker = new window.google.maps.Marker({
        position,
        clickable: false,
      });
      marker.setMap(map);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    markers.forEach(({ lat, lng, pricePerNight, id }) => {
      const position = new window.google.maps.LatLng(lat, lng);
      const marker = new window.google.maps.Marker({
        position,
        clickable: false,
        label: {
          text: `$${pricePerNight}`,
          className: `marker home-${id}`,
        },
        icon: "https://maps.gstatic.com/mapfiles/transparent.png",
      });
      marker.setMap(map);
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  };

  // Add script
  (() => {
    window.initGoogleMaps = initGoogleMaps;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GM_TOKEN}&libraries=places&callback=initGoogleMaps`;
    script.async = true;

    document.head.appendChild(script);
  })();

  inject("maps", {
    showMap,
    makeAutoComplete,
  });
};
