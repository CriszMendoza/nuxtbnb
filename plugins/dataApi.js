export default (context, inject) => {
  const appID = "0VGW1ILZPF";
  const apiKey = "62a09516768ec4ba30bcfe68d355bf2e";
  const url = `https://${appID}-dsn.algolia.net/1/indexes`;
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appID,
  };

  const unWrap = async (response) => {
    const { ok, status, statusText } = response;
    return {
      ok,
      statusCode: status,
      message: statusText,
      json: await response.json(),
    };
  };

  const getErrorResponse = (error) => ({
    ok: false,
    statusCode: 500,
    message: error.message,
    json: {},
  });

  const apiGet = async (url) => {
    try {
      return unWrap(await fetch(url, { headers }));
    } catch (error) {
      return getErrorResponse(error);
    }
  };

  const apiPost = async (url, homeId) => {
    try {
      return unWrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            hitsPerPage: 6,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  };

  const apiPostLocation = async (url, lat, lng, radiusInMeters) => {
    try {
      return unWrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radiusInMeters,
            hitsPerPage: 10,
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  };

  const getHome = async (homeID) => await apiGet(`${url}/homes/${homeID}`);

  const getHomes = async () => await apiGet(`${url}/homes/`);

  const getReviewsByHomeId = async (homeID) =>
    await apiPost(`${url}/reviews/query`, homeID);

  const getUserByHomeId = async (homeID) =>
    await apiPost(`${url}/users/query`, homeID);

  const getUserByLocation = async (lat, lng, radiusInMeters = 1500) =>
    await apiPostLocation(`${url}/homes/query`, lat, lng, radiusInMeters);

  inject("dataApi", {
    getHome,
    getHomes,
    getReviewsByHomeId,
    getUserByHomeId,
    getUserByLocation,
  });
};
