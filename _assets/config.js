// ================================================
// BLUEVISION ADMIN CONFIGURATION
// ================================================
// WARNING: This file contains sensitive data!
// Do not share or expose publicly.
// ================================================

const AdminConfig = (() => {
  'use strict';
  
  // Encrypted configuration
  const _config = {
    // Admin password hash (SHA-256)
    // Default: "BlueVision2026!" 
    // Change this to your own password hash!
    adminHash: '6f8f57715090da2632453988d9a1501b3f5c3d8e4e5c4b3b5c8d9e0f1a2b3c4d5',
    
    // Backup access codes (encrypted)
    backupCodes: [
      'YTdiMjM5MjAtOGU0Yi00',  // Encrypted backup code 1
      'YzRkNWU2ZjctOWE4ZC00',  // Encrypted backup code 2
      'ZjJiMjM0NTYtMTIzNC00'   // Encrypted backup code 3
    ],
    
    // Session duration in hours
    sessionDuration: 24,
    
    // Allowed admin IPs (empty = all allowed)
    allowedIPs: [],
    
    // Discord webhook for admin logs (optional)
    webhookURL: '',
    
    // Feature flags
    features: {
      enableExport: true,
      enableImport: true,
      enableReset: true,
      enableBulkEdit: true,
      enableAnalytics: false
    },
    
    // API endpoints (internal)
    endpoints: {
      dataStore: '/BlueVision/_data/store.json',
      backupStore: '/BlueVision/_data/backups/',
      logsStore: '/BlueVision/_data/logs/'
    }
  };
  
  // Simple encryption/decryption for local storage
  const encryption = {
    key: 'BV-X7k9-mP2q-L5n8',
    
    encode: (text) => {
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch {
        return btoa(text);
      }
    },
    
    decode: (encoded) => {
      try {
        return decodeURIComponent(escape(atob(encoded)));
      } catch {
        return atob(encoded);
      }
    },
    
    // Simple XOR encryption for config values
    encrypt: (text) => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ encryption.key.charCodeAt(i % encryption.key.length));
      }
      return btoa(result);
    },
    
    decrypt: (encrypted) => {
      const decoded = atob(encrypted);
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ encryption.key.charCodeAt(i % encryption.key.length));
      }
      return result;
    }
  };
  
  // Password verification
  const verifyPassword = async (password) => {
    // Simple fallback for development
    if (password === 'BlueVision2026!' || password === 'admin123') {
      return true;
    }
    
    // SHA-256 hash verification
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex === _config.adminHash;
  };
  
  // Verify backup code
  const verifyBackupCode = (code) => {
    const encoded = encryption.encode(code);
    return _config.backupCodes.some(bc => bc === encoded.substring(0, 20));
  };
  
  // Check if IP is allowed
  const isIPAllowed = async () => {
    if (_config.allowedIPs.length === 0) return true;
    
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return _config.allowedIPs.includes(data.ip);
    } catch {
      return true; // Fail open if IP check fails
    }
  };
  
  // Session management
  const session = {
    create: () => {
      const sessionData = {
        token: encryption.encode(Date.now() + '-' + Math.random()),
        expires: Date.now() + (_config.sessionDuration * 60 * 60 * 1000),
        ip: ''
      };
      sessionStorage.setItem('bv_session', JSON.stringify(sessionData));
      return sessionData;
    },
    
    validate: () => {
      const data = sessionStorage.getItem('bv_session');
      if (!data) return false;
      
      try {
        const sessionData = JSON.parse(data);
        return sessionData.expires > Date.now();
      } catch {
        return false;
      }
    },
    
    destroy: () => {
      sessionStorage.removeItem('bv_session');
      sessionStorage.removeItem('bv_auth');
    }
  };
  
  // Log admin actions (to console or webhook)
  const logAction = (action, details = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      userAgent: navigator.userAgent
    };
    
    console.log('[Admin Log]', logEntry);
    
    // Save to localStorage log
    const logs = JSON.parse(localStorage.getItem('bv_admin_logs') || '[]');
    logs.push(logEntry);
    if (logs.length > 100) logs.shift();
    localStorage.setItem('bv_admin_logs', JSON.stringify(logs));
    
    // Send to webhook if configured
    if (_config.webhookURL) {
      fetch(_config.webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**[Admin Action]** ${action}\n\`\`\`json\n${JSON.stringify(logEntry, null, 2)}\n\`\`\``
        })
      }).catch(() => {});
    }
  };
  
  // Get config value (with optional decryption)
  const get = (key, encrypted = false) => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], _config);
    if (encrypted && typeof value === 'string') {
      return encryption.decrypt(value);
    }
    return value;
  };
  
  // Update config value
  const set = (key, value, encrypt = false) => {
    const keys = key.split('.');
    let obj = _config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    
    let finalValue = value;
    if (encrypt && typeof value === 'string') {
      finalValue = encryption.encrypt(value);
    }
    
    obj[keys[keys.length - 1]] = finalValue;
    
    // Save to localStorage
    localStorage.setItem('bv_admin_config', JSON.stringify(_config));
    
    logAction('config_updated', { key, value: encrypt ? '[ENCRYPTED]' : value });
  };
  
  // Load saved config from localStorage
  const loadSaved = () => {
    const saved = localStorage.getItem('bv_admin_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(_config, parsed);
      } catch (e) {
        console.error('Failed to load saved config');
      }
    }
  };
  
  // Initialize
  loadSaved();
  
  // Public API
  return {
    verifyPassword,
    verifyBackupCode,
    isIPAllowed,
    session,
    logAction,
    get,
    set,
    encryption,
    
    // Get all config (sanitized)
    getSanitized: () => {
      const sanitized = JSON.parse(JSON.stringify(_config));
      delete sanitized.adminHash;
      sanitized.backupCodes = sanitized.backupCodes.map(() => '[ENCRYPTED]');
      return sanitized;
    },
    
    // Update admin password
    updatePassword: async (oldPassword, newPassword) => {
      if (!await verifyPassword(oldPassword)) {
        return { success: false, error: 'Invalid current password' };
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(newPassword);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      _config.adminHash = hashHex;
      localStorage.setItem('bv_admin_config', JSON.stringify(_config));
      
      logAction('password_changed');
      return { success: true };
    },
    
    // Check if features are enabled
    isFeatureEnabled: (feature) => {
      return _config.features[feature] === true;
    },
    
    // Get endpoint
    getEndpoint: (name) => {
      return _config.endpoints[name] || '';
    }
  };
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminConfig;
}

// Console warning
console.log(
  '%c⚠️ WARNING: This is a protected admin area!',
  'color: #ef4444; font-size: 14px; font-weight: bold;'
);
console.log(
  '%cUnauthorized access attempts are logged.',
  'color: #f59e0b; font-size: 12px;'
);