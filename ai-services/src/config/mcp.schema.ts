import { IntentCategory, IntentName } from "../interfaces/nlpInterface";

const general_schema: Partial<Record<IntentName, string[]>> = {
    elber_general_fallback: [ 'responseText', 'type' ]
}

const mcpSchema: Record<IntentCategory, Partial<Record<IntentName, string[]>>> = {
    general: general_schema
}

export default mcpSchema
