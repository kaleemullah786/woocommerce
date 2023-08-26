import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api/index.mjs";
export default defineEventHandler(async(event) => {
  const body=await readBody(event)
  const WooCommerce = new WooCommerceRestApi({
    url: 'https://woo-boldly-automatic-jellyfish.wpcomstaging.com',
    consumerKey: body.key,
    consumerSecret: body.secret,
    version: 'wc/v3'
  });
  let res
  await WooCommerce.put("orders/"+body.id,{status:body.status})
  .then((response) => {
    res=response.data;
  })
  .catch((error) => {
    res= error.response.data;
  });
  return res
  })
