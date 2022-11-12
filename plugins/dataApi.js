export default async (context, inject) => {
  const url = `https://${process.env.ALGOLIA_ID}-dsn.algolia.net/1/indexes`;
  const headers = {
    "X-Algolia-API-Key": process.env.ALGOLIA_APIKEY,
    "X-Algolia-Application-Id": process.env.ALGOLIA_ID,
  };

  const unWrap = async (response) => {
    const { ok, status, statusText } = response;

    if (!ok) {
      return {
        ok,
        statusCode: status,
        message: statusText,
      };
    }

    return {
      ok,
      json: await response.json(),
    };
  };

  const getErrorResponse = (error) => ({
    ok: false,
    statusCode: 500,
    message: error.message,
    json: {},
  });

  const get = async (url) => {
    try {
      return await unWrap(await fetch(url, { headers }));
    } catch (error) {
      return getErrorResponse(error);
    }
  };

  const post = async (url, body) => {
    try {
      return await unWrap(
        await fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify({
            attributesToHighlight: [],
            ...body,
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  };

  const getHome = async (homeID) => await get(`${url}/homes/${homeID}`);
  const getHomes = async () => await get(`${url}/homes`);

  const getReviewsByHomeId = async (homeID) =>
    await post(`${url}/reviews/query`, {
      filters: `homeId:${homeID}`,
    });

  const getUserByHomeId = async (homeID) =>
    await post(`${url}/users/query`, {
      filters: `homeId:${homeID}`,
      hitsPerPage: 6,
    });

  const getHomeByLocation = async (lat, lng, radiusInMeters = 1500) =>
    await post(`${url}/homes/query`, {
      aroundLatLng: `${lat},${lng}`,
      aroundRadius: radiusInMeters,
      hitsPerPage: 10,
    });

  inject("dataApi", {
    getHome,
    getHomes,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomeByLocation,
  });
};
