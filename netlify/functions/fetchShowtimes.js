exports.handler = async (event, context) => {
  const apiToken = process.env.API_TOKEN; // Access the environment variable
  const url = `https://in.bookmyshow.com/api/movies-data/showtimes-by-event?appCode=MOBAND2&appVersion=14304&language=en&eventCode=ET00310216&regionCode=HYD&subRegion=HYD&bmsId=1.21345445.1703250084656&token=${apiToken}&lat=12.971599&lon=77.59457&query=`;

  const headers = {
    "Host": "in.bookmyshow.com",
    "x-bms-id": "1.21345445.1703250084656",
    "x-region-code": "CHEN",
    "x-subregion-code": "CHEN",
    "x-region-slug": "chennai",
    "x-platform": "AND",
    "x-platform-code": "ANDROID",
    "x-app-code": "MOBAND2",
    "x-device-make": "Google-Pixel XL",
    "x-screen-height": "2392",
    "x-screen-width": "1440",
    "x-screen-density": "3.5",
    "x-app-version": "14.3.4",
    "x-app-version-code": "14304",
    "x-network": "Android | WIFI",
    "x-latitude": "12.971599",
    "x-longitude": "77.59457",
    "x-ab-testing": "adtechHPSlug=default&...&tncLocation=variant",
    "x-advertiser-id": "a9b0e8d0-b8f3-49f0-a662-7e96354def78",
    "x-geohash": "tdr",
    "x-li-flow": "false",
    "x-location-selection": "manual",
    "x-location-shared": "false",
    "lang": "en",
    "user-agent": "Dalvik/2.1.0 (Linux; U; Android 12; Pixel XL Build/SP2A.220505.008)"
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `HTTP error! status: ${response.status}` })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' })
    };
  }
};
