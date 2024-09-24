exports.handler = async (event, context) => {
  console.log('Function fetchShowtimes invoked');

  const apiToken = process.env.API_TOKEN;
  if (!apiToken) {
    console.error('API_TOKEN environment variable is not set.');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error.' })
    };
  }

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
    "x-ab-testing": "adtechHPSlug=default&adtechHPCarousel=variant&adQtySelection=default&cinemaListingRevamp=variant&cinemaChipFilters=default&comingSoonPznV1=default&dealsReward=default&dealsRewardV2=default&dealHeaderTypeExp2=default&discoveryOnlineEvents=variant&ehpChristmas=default&ehpCollectionV1=default&ehpCollectionV2=default&ehpMarqueePosV3=null&ehpSneakPeekPzn=default&eventCollection=null&fnbPTDE=null&fnbPTDEV2=default&leDropOffV2=default&leMultiDayPassV2=default&leSoldOutSimilar=variant&leCoupons=default&leHLPExp1=default&leHLPExp2=default&leHLPExp3=default&leHLPExp4=default&locationIntelligenceFeature=default&locIntelligenceV3=&locIntelligenceV4=variant&mlpTrailerIngress=default&mlpTrailerIngressV2=default&moviesBestSeatsV2=default&moviesBestSeatsV3=default&moviesCoachmarkV3=variant&moviesHPV4=default&moviesHPV5=default&mspInnovativeAdV2=default&offersFilmyPassV2=null&offersRevampExp1=default&ospQuickpay=variant&peppoPaymentType=null&playLPRevamp=default&pricingExp7=default&ptcxModifyBook=default&ptdeCollateral=default&ptdeDeals=default&ptmDealsFnBWidget=null&ptmDiwaliCollateral=default&ptmRewardsWidgetTypeV2=variant&ptmXmasCollateral=default&pznHnyWidgetV1=default&showtimeRevampV1=default&showtimeRevExp12=default&showTimeViewLocation=default&showTimeViewRegion=default&skipCVV=Default&socialNudgeExp8=default&surfaceReviewsMSPV2=variant&surfaceOfferMSPSL=variant&tncLocation=variant",
    "x-advertiser-id": "a9b0e8d0-b8f3-49f0-a662-7e96354def78",
    "x-geohash": "tdr",
    "x-li-flow": "false",
    "x-location-selection": "manual",
    "x-location-shared": "false",
    "lang": "en",
    "user-agent": "Dalvik/2.1.0 (Linux; U; Android 12; Pixel XL Build/SP2A.220505.008)"
  };

  console.log('API URL:', url);
  console.log('Headers:', headers);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `HTTP error! status: ${response.status}` })
      };
    }

    const data = await response.json();
    console.log('API Response Data:', JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' })
    };
  }
};
