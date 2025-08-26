const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const apiUrl =
            'https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=&targets=title&fields=contentId,title,viewCounter&_sort=-viewCounter&_offset=0&_limit=3&_context=apiguide';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to fetch from external API' })
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*' // ブラウザからのアクセスを許可
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', detail: error.message })
        };
    }
};
