import { IntentCategory, IntentName } from "../interfaces/nlpInterface";

const general_schema: Partial<Record<IntentName, string[]>> = {
    elber_general_fallback: [ 'responseText', 'type' ]
}

const vision_schema: Partial<Record<IntentName, string[]>> = {
    elber_vision_main: [],
}

const mcpSchema: Record<IntentCategory, Partial<Record<IntentName, string[]>>> = {
    general: general_schema,
    vision: vision_schema
}

export default mcpSchema
