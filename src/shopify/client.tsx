import Client from 'shopify-buy';

// Creates the client with Shopify-Buy and store info
export const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN ?? '',
  domain: process.env.SHOPIFY_STORE_DOMAIN ?? '',
});
