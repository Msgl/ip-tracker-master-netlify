const axios = require('axios');


exports.handler = async (event, context) => {

  const API_IPIFY_KEY =process.env.API_IPIFY_KEY;
  const subject = event.queryStringParameters.ipaddress || "";
  const url = `https://geo.ipify.org/api/v1?apiKey=${API_IPIFY_KEY}&ipAddress=${subject}`;

  try {
    const {data} = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch(error) {
    return {
      statusCode: 500,
      body: error.toString()
    }
  }

}

