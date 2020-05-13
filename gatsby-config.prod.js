const { siteUrl } = require('./src/queries/site-url');
const { getMetadata } = require('./src/utils/get-metadata');
const { articleRssFeed } = require('./src/utils/setup/article-rss-feed');
const {
    stitchFetchDocuments,
} = require('./src/utils/setup/stitch-fetch-documents');
const { SNOOTY_STITCH_ID } = require('./src/build-constants');

require('dotenv').config({
    path: '.env.production',
});

const metadata = getMetadata();

module.exports = {
    pathPrefix: '',
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-source-mongodb-stitch',
            options: {
                stitchId: SNOOTY_STITCH_ID,
                functions: [stitchFetchDocuments(metadata)],
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                // Exclude paths we are using the noindex tag on
                exclude: [
                    '/language/*',
                    '/product/*',
                    '/storybook ',
                    '/tag/*',
                    '/type/*',
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-GDFN',
                includeInDevelopment: false,
            },
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: siteUrl,
                feeds: [articleRssFeed],
            },
        },
    ],
    siteMetadata: {
        ...metadata,
        title: 'MongoDB Developer Hub',
        siteUrl: 'https://developer.mongodb.com',
    },
};
