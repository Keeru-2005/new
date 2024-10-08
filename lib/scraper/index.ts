import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency,extractDescription,extractPrice } from '../../lib/utils';

export async function scrapeAmazonProduct(url: string)
{
    if(!url) return;
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id= (1000000 * Math.random()) | 0;

    const options={
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }
    try{
        //Fetch the product page
        const response= await axios.get(url,options);
        const $ = cheerio.load(response.data);
        //Extract product title
        const title=$('#productTitle').text().trim();
        const currentPrice= extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-colour-price'),
            $('.a-button-selected .a-colour-base')

    );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('a-size-base.a-colour-price')
        );

        const outOfStock = $('#availability span').text().trim().toLowerCase
        () === 'currently unavailable';
        //const rating=$('span.a-size-base span.a-color-base')//class="a-size-base a-color-base"
        const images= $('#imgBlkFront').attr('data-a-dynamic-image') || 
                     $('#landingImage').attr('data-a-dynamic-image')||
                     '{}' 

        const imageUrls= Object.keys(JSON.parse(images));

        //
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
        const description = extractDescription($)
        //construct data object with scraped information
        const data={
            url,
            currency: currency || '₹',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice)
        }
        return data;

    }catch(error: any){
        throw new Error(`Failed to scrape product: ${error.message}`)

    }
}