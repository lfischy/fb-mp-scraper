
const getData = async () => {

    const res = await fetch('https://www.facebook.com/api/graphql/', {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'viewport-width': '277',
        },
        referer:
          'https://www.facebook.com/marketplace/madison/search/?query=skidoo%20850&sortBy=creation_time_descend',
        referrerPolicy: 'origin-when-cross-origin',
        // body: `variables=${JSON.stringify(variables)}&doc_id=2022753507811174`,
        body:
            //'av=100066606256383&__aaid=0&__user=100066606256383&__a=1&__req=1b&__hs=19799.HYP%3Acomet_pkg.2.1..2.1&dpr=1&__ccg=EXCELLENT&__rev=1012113019&__s=y5fu6t%3Afxqprv%3Av6p37q&__hsi=7347404264389940804&__dyn=7AzHK4HwkEng5K8G6EjBAg2owIxu13wFwkUKewSwAyUco2qwJyE2OwpUe8hwaG1sw9u0LVEtwMw65xO321Rwwwqo462mcwfG1Rx62G5Usw9m1YwBgK7o884y0Mo4G1hx-3m1mzXw8W58jwGzEaE5e7oqBwJK2W5olwuEjUlDw-wUwxwjFovUaU3VBwFKq2-azo6O14wkQ0z8c86-bwHwNxe6Uak0zU8oC1Hg6C13whEeE4WVU-4Edouw&__csr=gzOlFFh5iOiPbkll9lWaJOn9YTsZOFh_tWHlpcBttTnsFaQp8O-pbKQprytGRXi-JaUCem8BAG8qVpbCAgCqcgqAKm8AJ6yVV9AbAmqmE-cCyoyqjxGCQELUtG2uaxu15yUyudxC4oC6opx68wzKeh85nxW2C2e18wk8KU8Foy3y2qaxi0EUmzE4Si2q0ge7U420Xo5W1kwbe17w1I-08Aw13u00kth02VAdyk0ezw2LE1ZE0jAw5Xw5Yw0h6o0NZ00pzE1jEduUx2FU1wE&__comet_req=15&fb_dtsg=NAcO5Lmpw1oDrW35Z67KGFNXlgZ4yEfNOdCAQVO49pwuWGLdJVMJoXw%3A11%3A1710700837&jazoest=25332&lsd=q15fCaDQWK_v-B86FJVVe9&__spin_r=1012113019&__spin_b=trunk&__spin_t=1710700864&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometMarketplaceSearchContentPaginationQuery&variables=%7B%22count%22%3A24%2C%22cursor%22%3A%22%7B%5C%22pg%5C%22%3A0%2C%5C%22b2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22%5C%22%2C%5C%22it%5C%22%3A0%2C%5C%22hmsr%5C%22%3Afalse%2C%5C%22tbi%5C%22%3A0%7D%2C%5C%22c2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22AbqO881XC3uZm0dpMOuVy-Xcrze3y-pM5RQao_EXGOVdk7q6BLSyy9d_wHnuDwm9qee_6Xd_6f7ajPeBOpF9iZKHn7EtQ1ASv8qDCTPO_xWEtcXaBPVdNV3nrz7WdgfwfiI-REbkuSA5O4eASSpwKtA0tdQnB3OoU8AgGL9vCeTByJi_6cFViHTrqbXe11Yj6Dcmk2eTaERAKv6VtfJpHdzi76ENIOS4IkIwXVHYWwR2SwuODamx4Vb8hY4i0NBN19oWa4Ft4tknuI5PxDL4qxkebpvLbh7fWhwLgnKWJO_-b-3Ss9v9vbdRA_5ZJi13ycSU1_uAx25a11u6uEzWr8S21QBNqkDg8drixHJMI25kLquy3SWxCajJSv6CIh4R4amkveB0EFwr-3pydXjNQdNVdRJnUvog5d4WRH6IVkxP2UTcoDR4yXuo1bemJSMoIMmsaNj_98pzQdCtdJZJ8iV0U5P57w2UuP2znsNeNayN4Ohmxy5VRJjd2kkxjMTf6d9clnwsMAe7doFl39p6xhCaxLt5nstv60lUXtPYbS7FJnclzoxbIcyQnljUiK1zNsR-hvjToaZbkjp_RZp-n5q1%5C%22%2C%5C%22it%5C%22%3A24%2C%5C%22rpbr%5C%22%3A%5C%22%5C%22%2C%5C%22rphr%5C%22%3Afalse%2C%5C%22rmhr%5C%22%3Afalse%7D%2C%5C%22irr%5C%22%3Afalse%2C%5C%22serp_cta%5C%22%3Afalse%2C%5C%22rui%5C%22%3A%5B%5D%2C%5C%22mpid%5C%22%3A%5B%5D%2C%5C%22ubp%5C%22%3Anull%2C%5C%22ncrnd%5C%22%3A0%2C%5C%22irsr%5C%22%3Afalse%2C%5C%22bmpr%5C%22%3A%5B%5D%2C%5C%22bmpeid%5C%22%3A%5B%5D%2C%5C%22nmbmp%5C%22%3Afalse%2C%5C%22skrr%5C%22%3Afalse%2C%5C%22ioour%5C%22%3Afalse%2C%5C%22ise%5C%22%3Afalse%7D%22%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22skidoo%20summit%20850%22%7D%2C%22browse_request_params%22%3A%7B%22commerce_enable_local_pickup%22%3Atrue%2C%22commerce_enable_shipping%22%3Atrue%2C%22commerce_search_and_rp_available%22%3Atrue%2C%22commerce_search_and_rp_category_id%22%3A%5B%5D%2C%22commerce_search_and_rp_condition%22%3Anull%2C%22commerce_search_and_rp_ctime_days%22%3Anull%2C%22filter_location_latitude%22%3A46.544713324654%2C%22filter_location_longitude%22%3A-90.862298693178%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%2C%22filter_radius_km%22%3A402%7D%2C%22custom_request_params%22%3A%7B%22browse_context%22%3Anull%2C%22contextual_filters%22%3A%5B%5D%2C%22referral_code%22%3Anull%2C%22saved_search_strid%22%3Anull%2C%22search_vertical%22%3A%22C2C%22%2C%22seo_url%22%3Anull%2C%22surface%22%3A%22SEARCH%22%2C%22virtual_contextual_filters%22%3A%5B%5D%7D%7D%2C%22scale%22%3A1%2C%22__relay_internal__pv__VideoPlayerRelayReplaceDashManifestWithPlaylistrelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=7700125886673136',
            'av=0&__user=0&__a=1&__dyn=7xeUmBwjbgmwCwKKEKEW74jFwn84a2i5U4e1FxebzEdF989Euxa0z8S2S4okwAwxxicw9m7oqx61BwvU2Vwb-q3q5Voy6o2xwbG783pwKx-8wlU-cBweq0wXAy85iaxq3m7Eaoy15wJwBgK7o88vwEwf62W2C4U2IzUuxy485W1dxe5o&__csr=&__req=3&__pc=PHASED%3ADEFAULT&dpr=1&__rev=1001480872&__s=f2tba8%3A86i7l7%3Ab63no8&__hsi=6765868467750761585-0&lsd=AVpb1DF9&jazoest=2605&__spin_r=1001480872&__spin_b=trunk&__spin_t=1575301510&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=MarketplaceSearchResultsPageContainerNewQuery&variables=%7B%22MARKETPLACE_FEED_ITEM_IMAGE_WIDTH%22%3A196%2C%22VERTICALS_LEAD_GEN_PHOTO_HEIGHT_WIDTH%22%3A40%2C%22MERCHANT_LOGO_SCALE%22%3Anull%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22skidoo%20850%22%7D%2C%22browse_request_params%22%3A%7B%22filter_location_id%22%3A%22madison%22%2C%22commerce_search_sort_by%22%3A%22BEST_MATCH%22%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%7D%2C%22custom_request_params%22%3A%7B%22surface%22%3A%22SEARCH%22%2C%22search_vertical%22%3A%22C2C%22%7D%7D%7D&doc_id=3456763434364354',
        method: 'POST',
        mode: 'cors',
      });
      
      /*
      const { data } = await res.json();
      const { edges } = data.marketplace_search.feed_units;
      const nodes = edges.map(edge => {
        const { listing } = edge.node;
        const { marketplace_listing_title, listing_price, location } = listing;
        console.log("Title: " + marketplace_listing_title);
        console.log("Price: " + listing_price);
        console.log("Location: " + location)

        return {
          title: marketplace_listing_title,
          price: listing_price,
          location: location
        };
      });
      */
    
    const { data } = await res.json();

    const { edges } = data.marketplace_search.feed_units;
    const nodes = edges.map(edge => {
    const { listing } = edge.node;
    console.log(listing);
    return {
      listing,
    };
  });

};

getData();