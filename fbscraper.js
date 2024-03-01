//Things to do, in no particular order:



//TODO: ban protection, refresh marketplace random number of times - switch between refreshing page and navigating to new page. Throw in random searches w/ diff filters etc - (dont return random search results)
//TODO: return "listed x num of hrs ago"

//TODO: change location and range based on input


//TODO: break code down into functions
//TODO: dynamically return amount of new listing since last refreshed - loop thru and compare .textContent of listings in array, only return the ones that are new since last refresh
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

    
    const baseUrl = "https://www.facebook.com/marketplace"
    
    //pulls out substrings (each word)
    searchTerm = searchTerm.split(" ")

    let searchUrl = "/?query="
    let processedTerms = ""
    for (i = 0; i < searchTerm.length; i++) {
        processedTerms += searchTerm[i] + "%20";
    }


    // make inital search
    await page.waitForNavigation( {waitUntil: 'networkidle0'} )
    await page.goto(baseUrl + searchUrl + processedTerms, {
        waitUntil: "networkidle0",
    });

 
    //sets price limits
    // await page.waitForNavigation({ waitUntil: 'networkidle0' })

    let currentUrl = baseUrl + "/search?" + "minPrice=" + lowerLimit + "&maxPrice=" + upperLimit + "&query=" + processedTerms 
    await page.goto(currentUrl, {
        waitUntil: "networkidle0",
    });


        
    console.log( "bp 1 " + currentUrl)

    
    //sorts listings by newest to oldest
    await page.goto(currentUrl + "&sortBy=creation_time_descend&exact=false", {
        waitUntil: "networkidle0",
    });

    //reloads page x # of ms and returns new content to output
        
    console.log("bp 2 " + currentUrl)

    await refresh()
    
    // refresh() reloads page and wait for elements to load in, stores data in an array
    async function refresh() {
        
            console.log("Started refresh");
        
            await page.reload();
            //await page.waitForNavigation({waitUntil: 'networkidle0'})
    
            const priceSpan = 'span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u"]'
            // stores textcontent of above <span> in an array
            let arrPrices = await page.$$eval(priceSpan, prices => prices.map(price => price.textContent) )

            const titleSpan = 'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6"]' 
            // stores textcontent of above <span> in an array
            let arrTitles = await page.$$eval(titleSpan, titles => titles.map(title => title.textContent) )
    
            const locationSpan = 'span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84"]'
            // stores textcontent of above <span> in an array
            let arrLocations = await page.$$eval(locationSpan, locations => locations.map(location => location.textContent) )
    
            const linkLocation = 'a[class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv"]'
            // stores href of above <a> in an array
            const arrLinks = await page.$$eval(linkLocation, links => links.map(link => link.href) )

            const imageLocation = 'img[class="xt7dq6l xl1xv1r x6ikm8r x10wlt62 xh8yej3"]'
            // stores src of above <img> in an array
            const arrImages = await page.$$eval(imageLocation, images => images.map(image => image.src) )
        
            const arrays = [arrTitles, arrPrices, arrLocations, arrImages, arrLinks];

            //console.log(arrays)

            //const message = "Listings:\n" + arrTitles[0] + "\n" + arrPrices[0] + "\n" + arrLocations[0] + "\n" + arrImages[0] + "\n" + arrLinks[0] + "\n" + arrTitles[1] + "\n" + arrPrices[1] + "\n" + arrLocations[1] + "\n" + arrImages[1] + "\n" + arrLinks[1] + "\n" + arrTitles[2] + "\n" + arrPrices[2] + "\n" + arrLocations[2] + "\n" + arrImages[2] + "\n" + arrLinks[2] + "\n_________________________________________________________________________________________________________________________________________________________________________________________________"

            let title0 = arrTitles[0]
            let price0 = arrPrices[0]
            let location0 = arrLocations[0]
            let image0 = arrImages[0]
            let link0 = arrLinks[0]

            let title1 = arrTitles[1]
            let price1 = arrPrices[1]
            let location1 = arrLocations[1]
            let image1 = arrImages[1]
            let link1 = arrLinks[1]

            let title2 = arrTitles[2]
            let price2 = arrPrices[2]
            let location2 = arrLocations[2]
            let image2 = arrImages[2]
            let link2 = arrLinks[2]
                  
            Hook.setPayload({
                "embeds": [{
                "title": "Link to listing",
                "color": 15257231,
                "fields": [
                    {
                        
                        "name": " ",
                        "value": `${title0}`,    
                    },
                    {
                        "name": " ",
                        "value": `${price0}`,
                    },
                    {
                        "name": " ",
                        "value": `${location0}`,
                    }


                ],

                
                "url": `${link0}`, 
                
                
                "image": {
                    "url": `${image0}`
                }
                }]
            }).fire();  
            
            Hook.setPayload({
                "embeds": [{
                "title": "Link to listing",
                "color": 15257231,
                "fields": [
                    {
                        
                        "name": " ",
                        "value": `${title1}`,    
                    },
                    {
                        "name": " ",
                        "value": `${price1}`,
                    },
                    {
                        "name": " ",
                        "value": `${location1}`,
                    }


                ],

                
                "url": `${link1}`, 
                
                
                "image": {
                    "url": `${image1}`
                }
                }]
            }).fire();

            Hook.setPayload({
                "embeds": [{
                "title": "Link to listing",
                "color": 15257231,
                "fields": [
                    {
                        
                        "name": " ",
                        "value": `${title2}`,    
                    },
                    {
                        "name": " ",
                        "value": `${price2}`,
                    },
                    {
                        "name": " ",
                        "value": `${location2}`,
                    }


                ],

                
                "url": `${link2}`, 
                
                
                "image": {
                    "url": `${image2}`
                }
                }]
            }).fire();

            let min = 3600000; // 60 min
            let max = 4500000; // 75 min 

            let randMs = Math.floor(Math.random() * (max - min + 1)) + min;
            let msToMins = randMs / 60000;
            console.log("Calling refresh again in " + msToMins + " minutes");

            Hook.setPayload({
                "embeds": [{
                "title": "New results in:",
                "color": 15257231,
                "fields": [
                    {
                        "name": " Minutes:",
                        "value": `${msToMins}`,
                        
                    }
                ]
                }]
            }).fire();
        
            setTimeout(refresh, randMs);
    }

})
  .catch((error) => {
    console.log(error);
  });