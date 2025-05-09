import mcpSchema from "../config/mcp.schema";
import { MCPAction } from "../interfaces/mcpInterface";
import { IntentCategory, IntentName, NLPResponse } from "../interfaces/nlpInterface";
import aiFunctionsMap from "./aiService";

const actionsMap: Record<IntentCategory, Partial<Record<IntentName, (...args: any[]) => NLPResponse >>> = {
    general: {
        elber_general_fallback: aiFunctionsMap.generateTextResponse
    }
}

const validateRequest = (action: MCPAction) => {
    const {category, intent, params} = action

    if(!actionsMap[category] || !actionsMap[category][intent]) {
        return false
    }

    if(typeof actionsMap[category][intent] !== 'function') {
        return false
    }

    const requiredParams = mcpSchema[category][intent]
    return requiredParams && requiredParams.every(p => params.hasOwnProperty(p))
}

const mcpHandleRequest = (action: MCPAction): NLPResponse => {
    if(validateRequest(action)) {
        const { category, intent, params } = action
        const result = actionsMap[category][intent]!(params)
        return result
    } else {
        throw new Error('Invalid MCP Request')
    }
}

export default mcpHandleRequest