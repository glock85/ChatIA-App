import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openaiClient = new OpenAIApi(configuration);

export function getAIClient() :OpenAIApi {
    return openaiClient;
}
