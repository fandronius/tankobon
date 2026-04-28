export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Only POST allowed', {
        status: 405
      });
    }

    try {
      const body = await request.text();

      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'MangaTrackerApp'
        },
        body
      });

      const text = await response.text();

      return new Response(text, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({
        error: err.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
