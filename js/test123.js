//Things to do, in no particular order:



//TODO: ban protection, refresh marketplace random number of times - switch between refreshing page and navigating to new page. Throw in random searches w/ diff filters etc - (dont return random search results)
//TODO: return "listed x num of hrs ago"

//TODO: change location and range based on input


//TODO: break code down into functions
//TODO: implement proxy usage
//FIXME: fix "requesting mainframe too early" when using stealth/headless - works fine in head mode
//TODO: add feature to take unlimited amount of search terms + price limits, searching a diff term + price each interval


const puppeteer = require("puppeteer-extra");
const readline = require('readline-sync'); 
const hookcord = require('hookcord');
const stealth = require("puppeteer-extra-plugin-stealth");


puppeteer.use(stealth());
 
// init hookcord to send to webhook
const Hook = new hookcord.Hook()
Hook.login('1208975570180902932', 'QrmCiRrtQUHpz06NXNpNZ8B86clgWhWhUAp0EcRB8mXoJJewUFKyGNSWs984x5ohboj1')

console.log(" ")
console.log("Fill out the following questions to narrow your search")
let searchTerm = readline.question("Enter search term: ");
const lowerLimit = readline.question("Enter low price: ")
const upperLimit = readline.question("Enter high price: ")
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
      width: 1280,
      height: 800,
      isMobile: false,
    });
    
    
    
    await login();

    async function login() {
    
        page.goto("https://www.facebook.com/", {
    });

    let email = "fischbach.louis12@gmail.com"
    let password = "Louis123321!"
    
    await page.waitForSelector('input[name="email"]');

    await page.type('input[name="email"]', email, {
        delay: 5,
      });

    await page.type('input[name="pass"]', password, {
        delay: 5,
    });

    await page.click('button[name="login"]')
    await page.waitForNavigation({waitUntil: 'networkidle0'});
}
 
    async function storePreviousListings() {
        let imgLocation = 'img[class="xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3"]';
        await page.waitForNavigation( {waitUntil: 'networkidle0'} );
        
        return page.$$eval(imgLocation, images => images.map(image => image.src) );
    }
    
    await search();
    
    
    //seperates each words and stores them in seperatedTerms - returns seperated terms
    
    function seperateTerms(search) {
    
    search = search.split(" ")
    let seperatedTerms = " ";
    for (i = 0; i < search.length; i++) {
        seperatedTerms += search[i] + "%20";
    }
    return seperatedTerms;
    }

    // search, with filters applied
    async function search() {
    
        let searchUrl = seperateTerms(searchTerm);
    await page.goto("https://www.facebook.com/marketplace/search?query=" + searchUrl + "&minPrice=" + lowerLimit + "&maxPrice=" + upperLimit + "&sortBy=creation_time_descend&exact=false", {
        waitUntil: "networkidle0",
    });

    }
    
    //( async () => {
    //    let previousListings = await storePreviousListings();
    //    console.log(previousListings);
    //})();
    
    let oldListings = {
        titles: [],
        prices: [],
        locations: [],
        images: [],
        links: []
    };
    // refresh() reloads page and wait for elements to load in, stores data in an array
    async function refresh() {
        
            console.log("Started refresh");
        
            await page.reload();
            //await page.waitForNavigation({waitUntil: 'networkidle0'})
    
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
            
            //let newestListings = lodash.difference(currentListings.images, oldListings.images);
            
            let imageIndices = [];
            currentListings.images.forEach((image, i) => {
                if (!oldListings.images.includes(image)) {
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
        

            let min = 3600000; // 60 min
            let max = 4500000; // 75 min 
            
            //let max = 10000;
            //let min = 20000;

            let randMs = Math.floor(Math.random() * (max - min + 1)) + min;
            let msToMins = randMs / 60000;
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
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
    }

    await refresh();
    
})
  .catch((error) => {
    console.log(error);
  });