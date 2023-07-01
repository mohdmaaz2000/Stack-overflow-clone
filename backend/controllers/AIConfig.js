const { Configuration, OpenAIApi } = require('openai');


const config = new Configuration({
    apiKey: "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"
});


const openai = new OpenAIApi(config);

module.exports = openai;