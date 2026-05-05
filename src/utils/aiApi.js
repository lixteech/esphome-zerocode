const DEFAULT_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_MAX_TOKENS = 4096;
const REQUEST_TIMEOUT = 30000;

async function fetchWithTimeout(url, options, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}

export async function generateConfig(prompt, options = {}) {
  const apiKey = options.apiKey || import.meta.env.VITE_AI_API_KEY;
  const apiUrl = options.apiUrl || DEFAULT_API_URL;
  const model = options.model || DEFAULT_MODEL;
  const maxTokens = options.maxTokens || DEFAULT_MAX_TOKENS;
  const systemPrompt = options.systemPrompt || buildSystemPrompt();
  const secrets = options.secrets || {};

  if (!apiKey) {
    throw new Error("AI API key not configured");
  }

  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty");
  }

  const requestBody = {
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  };

  try {
    const response = await fetchWithTimeout(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      },
      REQUEST_TIMEOUT
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API error: ${response.status}`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in API response");
    }

    let yaml = parseAIResponse(content);

    // Replace WiFi and API secrets if provided
    if (secrets.wifiSsid) {
      yaml = yaml.replace(/\[ssid\]/g, secrets.wifiSsid);
    }
    if (secrets.wifiPass) {
      yaml = yaml.replace(/\[password\]/g, secrets.wifiPass);
    }
    if (secrets.apiKey) {
      yaml = yaml.replace(/\[api_key\]/g, secrets.apiKey);
    }

    return yaml;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error - check your connection");
    }
    throw error;
  }
}

function buildSystemPrompt() {
  return `You are an ESPHome YAML generator. Your ONLY job is to output valid ESPHome YAML configuration.

OUTPUT REQUIREMENTS (CRITICAL):
- Output ONLY raw YAML text, NEVER use code blocks (no triple backticks)
- NEVER include explanations, comments, or markdown formatting
- Start immediately with "esphome:" on the first line
- All 4 required sections MUST be present at root level (no indentation)

REQUIRED STRUCTURE (in this exact order):
esphome:
  name: [device-name]
  friendly_name: "[Device Name]"

[esp32 or esp8266]:
  board: [board-model]

wifi:
  ssid: "[ssid]"
  password: "[password]"

api:
ota:
  platform: esphome

logger:

[optional component sections]

EXAMPLE OUTPUT (copy this format exactly):
esphome:
  name: my-sensor
  friendly_name: "My Sensor Device"

esp32:
  board: esp32dev

wifi:
  ssid: "home-network"
  password: "password123"

api:
ota:
  platform: esphome

logger:

sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Temperature"
    humidity:
      name: "Humidity"

Rules:
- Device name: kebab-case (my-device, not My Device)
- Use 2-space indentation for YAML
- GPIO format: GPIO4, GPIO21, GPIO32
- For ESP8266 sections, use: esp8266: with board: esp01_1m
- Include friendly_name in esphome section
- Always include wifi, api, ota, and logger sections
- Component sections (sensor, binary_sensor, switch, etc) go at the end

PLATFORMS & COMPONENTS:
- DHT11/DHT22: Use "platform: dht" with pin
- DS18B20: Use "platform: dallas_temp" (needs one_wire first)
- BME280: Use "platform: bme280_i2c" (needs i2c section)
- PIR Motion: Use "platform: gpio" in binary_sensor with "device_class: motion"
- Relay/Switch: Use "platform: gpio" in switch section
- LED: Use "platform: ledc" or "platform: gpio" in light section
- Display: Use "platform: ssd1306_i2c" or other i2c display

REMEMBER: Output ONLY YAML. No markdown. No code blocks. No explanations.`;
}

export function parseAIResponse(response) {
  // Remove code block markers if present
  let yaml = response;
  
  // Try to extract from code blocks first
  const codeBlockMatch = yaml.match(/```(?:yaml)?\s*\n?([\s\S]*?)\n?```/);
  if (codeBlockMatch) {
    yaml = codeBlockMatch[1];
  }
  
  // Clean up any remaining markdown formatting
  yaml = yaml
    .replace(/^```yaml\s*\n?/gm, "")
    .replace(/^```\s*\n?$/gm, "")
    .replace(/^```\s*$/gm, "")
    .trim();

  // Remove any leading/trailing whitespace and blank lines
  yaml = yaml.split('\n').filter(line => line.trim()).join('\n').trim();

  if (!yaml) {
    throw new Error("Empty response - no YAML generated");
  }

  if (!yaml.includes("esphome:")) {
    throw new Error("Invalid response: missing esphome section. Response starts with: " + yaml.substring(0, 50));
  }

  return yaml;
}

export function validateYAML(yaml) {
  const errors = [];

  if (!yaml || typeof yaml !== "string") {
    errors.push("YAML is empty or invalid");
    return { valid: false, errors };
  }

  // Check for required sections (case-insensitive, but must be at line start)
  const requiredSections = [
    { key: "esphome:", pattern: /^esphome:/m },
    { key: "wifi:", pattern: /^wifi:/m },
    { key: "logger:", pattern: /^logger:/m },
  ];

  for (const section of requiredSections) {
    if (!section.pattern.test(yaml)) {
      errors.push(`Missing required section: ${section.key}`);
    }
  }

  // Check for platform section (esp32 or esp8266)
  const platformMatch = yaml.match(/^(esp32|esp8266):/m);
  if (!platformMatch) {
    errors.push("Missing platform section (esp32 or esp8266)");
  }

  const hasComponents = /sensor:|binary_sensor:|switch:|light:|fan:|display:/.test(yaml);

  return {
    valid: errors.length === 0,
    errors,
    hasComponents,
  };
}

export async function testConnection(apiKey) {
  try {
    const response = await fetchWithTimeout(
      DEFAULT_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          max_tokens: 10,
          messages: [{ role: "user", content: "test" }],
        }),
      },
      5000
    );

    return response.ok;
  } catch {
    return false;
  }
}