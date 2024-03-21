//TODO: ban protection, refresh marketplace random number of times - switch between refreshing page and navigating to new page. Throw in random searches w/ diff filters etc - (dont return random search results)
//TODO: return "listed x num of hrs ago"

//TODO: change location and range based on input

//TODO: implement proxy usage
//FIXME: fix "requesting mainframe too early" when using stealth/headless - works fine in head mode ??

// NO NEED TO LOGIN. Can search w/o account  - add functionality to get rid of fb pop up
// add auto messager - can only be used with an acct
//dont spit back all listings to user on first refresh call - use count variable w/in refresh
// look into diff results, acct vs no acct

//NO ACCOUNT returns different results - look into graphql requests.

const puppeteer = require("puppeteer-extra");
const readline = require('readline-sync'); 
const hookcord = require('hookcord');
const stealth = require("puppeteer-extra-plugin-stealth");
const { Keyboard } = require("puppeteer");

puppeteer.use(stealth());

// init hookcord to send to webhook
const Hook = new hookcord.Hook()
Hook.login('1208975570180902932', 'QrmCiRrtQUHpz06NXNpNZ8B86clgWhWhUAp0EcRB8mXoJJewUFKyGNSWs984x5ohboj1')

console.log(" ")
let searchTerm = readline.question("Enter search term: ");
const lowerLimit = readline.question("Enter low price: ")
const upperLimit = readline.question("Enter high price: ")
const location = readline.question("Enter search location: (City, state) ");
const radius = readline.question("Enter radius: (Choose 1-11) 1(1mi) 2(2mi) 3(5mi) 4(10mi) 5(20mi) 6(40) 7(60mi) 8(80mi) 9(100mi) 10(250mi) 11(500mi) ");
console.log(" ")
console.log(" ")

let page = null;
let browser = null;

browser = puppeteer
  .launch({ headless: false, args: ["--disable-notifications"] })
  .then(async (browser) => {
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    page.setViewport({
      width: 1920,
      height: 1280,
      isMobile: false,
    });
     
    //seperates each word and stores them in seperatedTerms - returns seperated terms
    
    function seperateTerms(search) {
    
    search = search.split(" ")
    let seperatedTerms = " ";
    for (i = 0; i < search.length; i++) {
        seperatedTerms += search[i] + "%20";
    }
    return seperatedTerms;
    }
  
    async function setLocation() {
        console.log("Setting location...");
        
        // close login popup
        
        await page.waitForSelector('input[class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 xzsf02u x1uxerd5 x1fcty0u x132q4wb x1a8lsjc x1pi30zi x1swvt13 x9desvi xh8yej3 x15h3p50 x10emqs4"]');
        
        await page.click('input[class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 xzsf02u x1uxerd5 x1fcty0u x132q4wb x1a8lsjc x1pi30zi x1swvt13 x9desvi xh8yej3 x15h3p50 x10emqs4"]');
        await page.keyboard.press('Escape');
        
        /*
        // close zip code pop up
        await page.waitForSelector('input[class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1yc453h xhb22t3 xb5gni xcj1dhv x2s2ed0 xq33zhf xjyslct xjbqb8w xnwf7zb x40j3uw x1s7lred x15gyhx8 x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xzsf02u xdl72j9 x1iyjqo2 xs83m0k xjb2p0i x6prxxf xeuugli x1a2a7pz xm7lytj xn6708d xdvlbce x1ye3gou x1n2onr6 x15h3p50 xc9qbxq"]');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        */
        
        //open change location window
        await page.waitForSelector('div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz x1xmf6yo"]');
        await page.click('div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz x1xmf6yo"]');
        await page.click('div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz x1xmf6yo"]');

        //set location
        await page.waitForSelector('input[class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 xzsf02u x1uxerd5 x1fcty0u x132q4wb x1a8lsjc x1pi30zi x1swvt13 x9desvi xh8yej3 x15h3p50 x10emqs4"]');
        await page.click('input[class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 xzsf02u x1uxerd5 x1fcty0u x132q4wb x1a8lsjc x1pi30zi x1swvt13 x9desvi xh8yej3 x15h3p50 x10emqs4"]');
        await page.keyboard.type(location);

        await page.waitForSelector('span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa xo1l8bm xi81zsa x1yc453h"]');
        await page.keyboard.press('ArrowDown'); 
        await page.keyboard.press('Enter'); 

        //set radius
        await page.waitForSelector('div[class="xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xzsf02u x78zum5 x1jchvi3 x1fcty0u x132q4wb xdj266r x11i5rnm xat24cr x1mh8g0r x1a2a7pz x9desvi x1pi30zi x1a8lsjc x1swvt13 x1n2onr6 x16tdsg8 xh8yej3 x1ja2u2z"]');
        await page.click('div[class="xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xzsf02u x78zum5 x1jchvi3 x1fcty0u x132q4wb xdj266r x11i5rnm xat24cr x1mh8g0r x1a2a7pz x9desvi x1pi30zi x1a8lsjc x1swvt13 x1n2onr6 x16tdsg8 xh8yej3 x1ja2u2z"]');

        //implement variable to choose radius
        for (let i = 0; i < 10; ++i) {
            await page.keyboard.press('ArrowDown'); 
 
        }

        await page.keyboard.press('Enter');
        
        await page.waitForSelector('div[class="x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xn6708d x1ye3gou xtvsq51 x1r1pt67"]');
        await page.click('div[class="x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xn6708d x1ye3gou xtvsq51 x1r1pt67"]');
        console.log("Location set!");
    }
    
    async function setRadius() {
        
        console.log("resetting radius....")

        await page.waitForSelector('div[class=""xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xzsf02u x78zum5 x1jchvi3 x1fcty0u x132q4wb xdj266r x11i5rnm xat24cr x1mh8g0r x1a2a7pz x9desvi x1pi30zi x1a8lsjc x1swvt13 x1n2onr6 x16tdsg8 xh8yej3 x1ja2u2z""]');
        await page.click('div[class="xjyslct xjbqb8w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xzsf02u x78zum5 x1jchvi3 x1fcty0u x132q4wb xdj266r x11i5rnm xat24cr x1mh8g0r x1a2a7pz x9desvi x1pi30zi x1a8lsjc x1swvt13 x1n2onr6 x16tdsg8 xh8yej3 x1ja2u2z"]');

        for (let i = 0; i < 10; ++i) {
            await page.keyboard.press('ArrowDown'); 
        }
        
        // 1 sec delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.keyboard.press('Enter');

        // 1 sec delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // waits on apply button, and presses it
        await page.waitForSelector('div[class="x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xn6708d x1ye3gou xtvsq51 x1r1pt67"]');
        await page.click('div[class="x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xn6708d x1ye3gou xtvsq51 x1r1pt67"]');

        console.log("radius reset") 

    }

    // search, with filters applied
    async function search() {
        console.log("Searching...");
        let searchUrl = seperateTerms(searchTerm);
        await page.goto("https://www.facebook.com/marketplace/search?query=" + searchUrl + "&minPrice=" + lowerLimit + "&maxPrice=" + upperLimit + "&sortBy=creation_time_descend&exact=false", {
            waitUntil: "networkidle0",
        });
        console.log("Search completed");

    }
    
    let oldListings = {
        titles: [],
        prices: [],
        locations: [],
        images: [],
        links: []
    };
    
    await search();
    await setLocation();
    await refresh();

    // refresh() reloads page and wait for elements to load in, stores data in an array
    async function refresh() {
        
            console.log("Started refresh");
            // let count = 0;

            //delays reloading by 2 seconds - prevents location changing to san fran
            await new Promise(resolve => setTimeout(resolve, 4000));
            await page.reload();
            //setting delay to avoid mainframe error after refreshing
            await new Promise(resolve => setTimeout(resolve, 2000));

            //closes login popup
            await page.waitForSelector('div[class="x1egiwwb x4l50q0"]');
            await page.click('div[class="x1egiwwb x4l50q0"]');
            await page.keyboard.press('Escape');

            await new Promise(resolve => setTimeout(resolve, 2000));

            await setRadius();

            await new Promise(resolve => setTimeout(resolve, 2000));

            const selectors = {
                priceSpan: 'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u"]',
                titleSpan: 'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6"]',
                locationSpan: 'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84"]',
                linkLocation: 'a[class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv"]',
                imageLocation: 'img[class="xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3"]'
            };
            
            let currentListings = {
                titles: await page.$$eval(selectors.titleSpan, titles => titles.map(title => title.textContent) ),
                prices: await page.$$eval(selectors.priceSpan, prices => prices.map(price => price.textContent) ),
                locations: await page.$$eval(selectors.locationSpan, locations => locations.map(location => location.textContent) ),
                links: await page.$$eval(selectors.linkLocation, links => links.map(link => link.href) ),
                images: await page.$$eval(selectors.imageLocation, images => images.map(image => image.src) )

            }
                        
            let imageIndices = [];

            currentListings.titles.forEach((title, i) => {
                if (!oldListings.titles.includes(title)) {
                    imageIndices.push(i);
                }
            });

            let newestListings = {
                titles: imageIndices.map(i => currentListings.titles[i]),
                prices: imageIndices.map(i => currentListings.prices[i]),
                locations: imageIndices.map(i => currentListings.locations[i]),
                links: imageIndices.map(i => currentListings.images[i]),
                images: imageIndices.map(i => currentListings.links[i])
            }

            oldListings = currentListings;
        
            //let min = 3600000; // 60 min
            //let max = 4500000; // 75 min 
            
            let max = 240000; // 4 min
            let min = 381000; // 6.35 min

            let randMs = Math.floor(Math.random() * (max - min + 1)) + min;
            let msToMins = randMs / 60000;
            
            /*
            if (count < 1) {
                console.log(" ");
                return;
            }
            */
            console.log("Calling refresh again in " + msToMins + " minutes");
        
            setTimeout(refresh, randMs);

            for (let i = 0; i < newestListings.images.length; ++i) {
                
                Hook.setPayload({
                    "embeds": [{
                    "title": "Link to listing",
                    "color": 15257231,
                    "fields": [
                        {
                            "name": " ",
                            "value": `${newestListings.titles[i]}`,
                        },
                        {
                            "name": " ",
                            "value": `${newestListings.prices[i]}`
                        },
                        {
                            "name": " ",
                            "value": `${newestListings.locations[i]}`
                        },
                    ],

                    "url": `${newestListings.images[i]}`,

                    "image": {
                        "url": `${newestListings.links[i]}`
                    }
                    }]
                }).fire();
                
                // sets delay to avoid rate limit - only necessary on the first call to refresh
                await new Promise(resolve => setTimeout(resolve, 1500));

            }
            // count += 1;
    }
    
})
  .catch((error) => {
    console.log(error);
  });