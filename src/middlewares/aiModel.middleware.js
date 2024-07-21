import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser, CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,  
  model: "llama3-8b-8192",
  temperature: 0,
});

const systemMessage = "You will recieve a comment from the user, only return a comma separated list of sentiments such as positive, negative, sugggestion, etc. based on the comment"

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemMessage],
    ["user", "{userMessage}"]
])
const parser = new CommaSeparatedListOutputParser();

const chain = promptTemplate.pipe(model).pipe(parser)




export const aiParser = async (req, res, next) => {
  try {
    const modelTags = await chain.invoke({userMessage: req.body.commentBody})
    req.body.tags = modelTags;
    next();
  } catch (error) {
    console.log("error in model response: ", error.message)
  }  
};
