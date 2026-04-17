// Simple YAML parser for converting between config and YAML
// Not a full YAML parser, just enough for ESPHome configs

export function parseYAMLToConfig(yamlStr) {
  try {
    const lines = yamlStr.split('\n');
    const config = {};
    
    // Simple parser - look for key: value patterns
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      // Parse device_name
      if (trimmed.startsWith('substitutions:')) {
        const nextIdx = lines.indexOf(line) + 1;
        if (nextIdx < lines.length) {
          const deviceLine = lines[nextIdx];
          const match = deviceLine.match(/device_name:\s*"?([^"]+)"?/);
          if (match) config.deviceName = match[1];
        }
      }
      
      // Parse WiFi SSID
      if (trimmed.startsWith('- ssid:')) {
        const match = trimmed.match(/ssid:\s*"?([^"]+)"?/);
        if (match) config.wifiSsid = match[1];
      }
      
      // Parse WiFi password  
      if (trimmed.startsWith('password:')) {
        const match = trimmed.match(/password:\s*"?([^"]+)"?/);
        if (match) config.wifiPass = match[1];
      }
      
      // Parse board (from esp32: line)
      if (trimmed.startsWith('esp32:') || trimmed.startsWith('esp8266:')) {
        config.boardFamily = trimmed.split(':')[0];
      }
    }
    
    return config;
  } catch (e) {
    console.error('YAML parse error:', e);
    return {};
  }
}

export function configToYAML(config) {
  // Generate YAML from config object
  // This is handled by generateYAML in utils
  return '';
}
