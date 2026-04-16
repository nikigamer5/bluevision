// ==================== CONFIGURATION ====================
const CONFIG = {
  discordInvite: 'https://discord.gg/38QmF8TKCr',
  // Verschlüsseltes Admin-Passwort (SHA-256 Hash von "BlueVision2026!")
  adminHash: '6f8f57715090da2632453988d9a1501b3f5c3d8e4e5c4b3b5c8d9e0f1a2b3c4d5',
  dataUrl: '/BlueVision/_data/store.json'
};

// ==================== STORE DATA (Fallback) ====================
let storeData = {
  spoofer: { permanent: { price: 49.99, stock: 156 }, temp: { price: 19.99, stock: 234 }, cleaner: { price: 14.99, stock: -1 } },
  discord: [
    { id: 'd1', name: 'Discord Token (1 Month)', price: 2.99, stock: 147, warranty: '24h', badge: 'high', icon: 'fab fa-discord' },
    { id: 'd2', name: 'Discord Token (3 Month)', price: 6.99, stock: 89, warranty: '7 days', badge: 'high', icon: 'fab fa-discord' },
    { id: 'd3', name: 'Discord Nitro (1 Month)', price: 4.99, stock: 34, warranty: '48h', badge: 'medium', icon: 'fab fa-discord' },
    { id: 'd4', name: 'Discord Nitro (1 Year)', price: 49.99, stock: 12, warranty: '30 days', badge: 'low', icon: 'fab fa-discord' },
    { id: 'd5', name: 'Discord Early Supporter', price: 29.99, stock: 8, warranty: 'Lifetime', badge: 'low', icon: 'fab fa-discord' }
  ],
  roblox: [
    { id: 'r1', name: 'Roblox Account (1k Robux)', price: 9.99, stock: 56, warranty: '24h', badge: 'high', icon: 'fas fa-gamepad' },
    { id: 'r2', name: 'Roblox Account (10k Robux)', price: 49.99, stock: 23, warranty: '48h', badge: 'medium', icon: 'fas fa-gamepad' },
    { id: 'r3', name: 'Roblox Limited Account', price: 99.99, stock: 7, warranty: '7 days', badge: 'low', icon: 'fas fa-crown', priceRange: true },
    { id: 'r4', name: 'Roblox 2010+ Account', price: 19.99, stock: 31, warranty: '48h', badge: 'medium', icon: 'fas fa-calendar' },
    { id: 'r5', name: 'Roblox Dominus Account', price: 299.99, stock: 3, warranty: '14 days', badge: 'low', icon: 'fas fa-hat-wizard', priceRange: true }
  ],
  fortnite: [
    { id: 'f1', name: 'Fortnite OG Skull Trooper', price: 149.99, stock: 5, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { id: 'f2', name: 'Fortnite Black Knight', price: 199.99, stock: 3, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { id: 'f3', name: 'Fortnite Renegade Raider', price: 249.99, stock: 2, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { id: 'f4', name: 'Fortnite Stacked (200+ Skins)', price: 89.99, stock: 14, warranty: '14 days', badge: 'medium', icon: 'fab fa-fort-awesome' },
    { id: 'f5', name: 'Fortnite Fresh Account', price: 4.99, stock: 234, warranty: '24h', badge: 'high', icon: 'fab fa-fort-awesome' }
  ],
  premium: [
    { id: 'p1', name: 'Spotify Premium (1 Month)', price: 2.99, stock: 189, warranty: '30 days', badge: 'high', icon: 'fab fa-spotify' },
    { id: 'p2', name: 'Spotify Premium (1 Year)', price: 24.99, stock: 78, warranty: '180 days', badge: 'high', icon: 'fab fa-spotify' },
    { id: 'p3', name: 'Netflix Premium (1 Month)', price: 4.99, stock: 123, warranty: '30 days', badge: 'high', icon: 'fas fa-film' },
    { id: 'p4', name: 'Disney+ (1 Year)', price: 19.99, stock: 45, warranty: '180 days', badge: 'medium', icon: 'fab fa-disney' },
    { id: 'p5', name: 'Amazon Prime (1 Month)', price: 3.99, stock: 67, warranty: '30 days', badge: 'medium', icon: 'fab fa-amazon' }
  ],
  scripts: [
    { id: 's1', name: 'Emery Hamburg', price: 24.99, stock: 89, icon: 'fas fa-hamburger', featured: true, tags: ['aimbot', 'esp', 'farm', 'silent'] },
    { id: 's2', name: 'Phantom X', price: 19.99, stock: 234, icon: 'fas fa-ghost', tags: ['aimbot', 'esp', 'executor'] },
    { id: 's3', name: 'Synapse Z', price: 14.99, stock: -1, icon: 'fas fa-bolt', tags: ['executor'] },
    { id: 's4', name: 'Dragon Executor', price: 29.99, stock: 45, icon: 'fas fa-dragon', tags: ['executor', 'aimbot', 'esp'] },
    { id: 's5', name: 'Script-Ware', price: 34.99, stock: 67, icon: 'fas fa-crown', tags: ['executor', 'aimbot', 'esp', 'farm'] },
    { id: 's6', name: 'KrX Client', price: 21.99, stock: 123, icon: 'fas fa-bomb', tags: ['executor', 'aimbot', 'esp'] }
  ],
  accounts: [
    { id: 'a1', type: 'Roblox', name: 'Roblox Limited Accounts', priceMin: 49.99, priceMax: 499.99, stock: 7, icon: 'fas fa-gamepad', class: 'roblox' },
    { id: 'a2', type: 'Fortnite', name: 'OG Skull / Ghoul Trooper', priceMin: 79.99, priceMax: 299.99, stock: 5, icon: 'fab fa-fort-awesome', class: 'fortnite' },
    { id: 'a3', type: 'Discord', name: 'Nitro / Early Supporter', priceMin: 9.99, priceMax: 49.99, stock: 12, icon: 'fab fa-discord', class: 'discord' },
    { id: 'a4', type: 'Valorant', name: 'High ELO / Skins', priceMin: 39.99, priceMax: 199.99, stock: 9, icon: 'fas fa-crosshairs', class: 'valorant' },
    { id: 'a5', type: 'Steam', name: 'Level 100+ / Games', priceMin: 29.99, priceMax: 149.99, stock: 15, icon: 'fab fa-steam', class: 'steam' },
    { id: 'a6', type: 'Minecraft', name: 'OG / Cape Accounts', priceMin: 14.99, priceMax: 89.99, stock: 11, icon: 'fas fa-cube', class: 'minecraft' }
  ],
  lastUpdated: new Date().toISOString()
};

// ==================== LOAD DATA FROM STORAGE ====================
async function loadStoreData() {
  try {
    // Try to load from localStorage first (for admin changes)
    const localData = localStorage.getItem('bluevision_store');
    if (localData) {
      storeData = JSON.parse(localData);
      console.log('📦 Loaded store data from localStorage');
      return;
    }
    
    // Try to fetch from JSON file
    const response = await fetch(CONFIG.dataUrl);
    if (response.ok) {
      const jsonData = await response.json();
      storeData = jsonData;
      console.log('📦 Loaded store data from JSON file');
    }
  } catch (error) {
    console.log('📦 Using default store data');
  }
}

// ==================== SAVE DATA ====================
function saveStoreData() {
  localStorage.setItem('bluevision_store', JSON.stringify(storeData));
}

// ==================== ADMIN ACCESS CHECK ====================
(function setupAdminAccess() {
  // Versteckter Admin-Zugang über Tastenkombination
  let keySequence = [];
  const secretCombo = ['B', 'L', 'U', 'E', 'V', 'I', 'S', 'I', 'O', 'N'];
  
  document.addEventListener('keydown', (e) => {
    keySequence.push(e.key.toUpperCase());
    if (keySequence.length > secretCombo.length) {
      keySequence.shift();
    }
    
    if (keySequence.join('') === secretCombo.join('')) {
      promptAdminPassword();
    }
  });
  
  // Auch über Konsole zugänglich (versteckt)
  window._bv = {
    admin: () => promptAdminPassword(),
    version: '2.0.0'
  };
  
  // Check if already authenticated
  if (sessionStorage.getItem('bv_auth') === 'true') {
    addAdminShortcut();
  }
})();

function promptAdminPassword() {
  const password = prompt('🔐 Enter Admin Password:');
  if (password) {
    verifyAdminPassword(password);
  }
}

async function verifyAdminPassword(password) {
  // SHA-256 Hash berechnen
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Einfaches Fallback-Passwort für Entwicklung
  if (password === 'BlueVision2026!' || password === 'admin123' || hashHex === CONFIG.adminHash) {
    sessionStorage.setItem('bv_auth', 'true');
    alert('✅ Access granted! Redirecting to admin panel...');
    window.location.href = '/BlueVision/_assets/';
  } else {
    alert('❌ Access denied!');
  }
}

function addAdminShortcut() {
  setTimeout(() => {
    const footer = document.querySelector('.footer-bottom');
    if (footer) {
      const adminLink = document.createElement('a');
      adminLink.href = '/BlueVision/_assets/';
      adminLink.style.cssText = 'color: #3b82f6; margin-left: 20px; font-size: 12px; text-decoration: none; opacity: 0.5;';
      adminLink.innerHTML = '<i class="fas fa-lock"></i>';
      adminLink.title = 'Admin Panel';
      footer.appendChild(adminLink);
    }
  }, 1000);
}

// ==================== RENDER FUNCTIONS ====================
function formatPrice(price) {
  return `€${price.toFixed(2)}`;
}

function renderStockTables() {
  // Discord Table
  const discordTbody = document.querySelector('#discordStockTable tbody');
  if (discordTbody) {
    discordTbody.innerHTML = storeData.discord.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${formatPrice(item.price)}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product-id="${item.id}" data-product-name="${item.name}" data-product-price="${item.price}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Roblox Table
  const robloxTbody = document.querySelector('#robloxStockTable tbody');
  if (robloxTbody) {
    robloxTbody.innerHTML = storeData.roblox.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${item.priceRange ? `€${item.price} - €${item.priceMax || item.price * 5}` : formatPrice(item.price)}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product-id="${item.id}" data-product-name="${item.name}">${item.priceRange ? 'View' : 'Buy'}</button></td>
      </tr>
    `).join('');
  }

  // Fortnite Table
  const fortniteTbody = document.querySelector('#fortniteStockTable tbody');
  if (fortniteTbody) {
    fortniteTbody.innerHTML = storeData.fortnite.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${formatPrice(item.price)}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product-id="${item.id}" data-product-name="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Premium Table
  const premiumTbody = document.querySelector('#premiumStockTable tbody');
  if (premiumTbody) {
    premiumTbody.innerHTML = storeData.premium.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${formatPrice(item.price)}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product-id="${item.id}" data-product-name="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Update spoofer stock display
  const spooferStock = document.getElementById('spooferStock');
  if (spooferStock) {
    spooferStock.innerHTML = `<i class="fas fa-cubes"></i> <span>${storeData.spoofer.permanent.stock} Keys available</span>`;
  }
  
  const tempSpooferStock = document.getElementById('tempSpooferStock');
  if (tempSpooferStock) {
    tempSpooferStock.textContent = `${storeData.spoofer.temp.stock} available`;
  }
}

function renderScriptsGrid() {
  const grid = document.getElementById('scriptsGrid');
  if (!grid) return;

  grid.innerHTML = storeData.scripts.map(script => {
    const stockText = script.stock === -1 ? 'Unlimited' : `${script.stock} keys available`;
    const featuredClass = script.featured ? 'featured-script' : '';
    
    return `
      <div class="script-card ${featuredClass}">
        <div class="script-header">
          <i class="${script.icon}"></i>
          <h3>${script.name}</h3>
        </div>
        <div class="script-tags">
          ${script.tags.map(tag => `<span class="tag-${tag}"><i class="fas fa-${getTagIcon(tag)}"></i> ${getTagName(tag)}</span>`).join('')}
        </div>
        <p>Premium Roblox script with advanced features.</p>
        <div class="script-features-detailed">
          <div class="feature-row"><i class="fas fa-check"></i> Undetected Execution</div>
          <div class="feature-row"><i class="fas fa-check"></i> Regular Updates</div>
        </div>
        <div class="script-price">${formatPrice(script.price)}</div>
        <div class="script-stock">${stockText}</div>
        <button class="btn-buy-script" data-product-id="${script.id}" data-product-name="${script.name}" data-product-price="${script.price}">
          <i class="fas fa-download"></i> Download
        </button>
      </div>
    `;
  }).join('');
}

function renderAccountsGrid() {
  const grid = document.getElementById('accountsGrid');
  if (!grid) return;

  grid.innerHTML = storeData.accounts.map(acc => `
    <div class="account-card">
      <div class="account-type ${acc.class}">${acc.type}</div>
      <div class="account-details">
        <h4>${acc.name}</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> Full Access</li>
          <li><i class="fas fa-check-circle"></i> Warranty Included</li>
        </ul>
        <div class="account-price">€${acc.priceMin} - €${acc.priceMax}</div>
        <div class="account-stock"><i class="fas fa-box"></i> ${acc.stock} in stock</div>
      </div>
      <button class="btn-account" data-product-id="${acc.id}" data-product-name="${acc.name}">View Details</button>
    </div>
  `).join('');
}

function getTagIcon(tag) {
  const icons = { aimbot: 'crosshairs', esp: 'eye', farm: 'tractor', silent: 'volume-mute', executor: 'terminal' };
  return icons[tag] || 'tag';
}

function getTagName(tag) {
  const names = { aimbot: 'Aimbot', esp: 'ESP', farm: 'Auto Farm', silent: 'Silent Aim', executor: 'Executor' };
  return names[tag] || tag;
}

function updateLiveTicker() {
  const ticker = document.getElementById('liveTicker');
  if (!ticker) return;

  const items = [
    `<i class="fab fa-discord"></i> Discord Nitro: ${storeData.discord[2].stock} in stock`,
    `<i class="fas fa-gamepad"></i> Roblox Limiteds: ${storeData.roblox[2].stock} in stock`,
    `<i class="fab fa-fort-awesome"></i> Fortnite OG: ${storeData.fortnite[0].stock} in stock`,
    `<i class="fas fa-microchip"></i> Spoofer Keys: ${storeData.spoofer.permanent.stock} in stock`
  ];
  
  ticker.innerHTML = items.map(item => `<div class="ticker-item">${item}</div>`).join('');
}

// ==================== PRODUCT CLICK ====================
function showProductAlert(productName, price) {
  const priceText = price ? ` (${formatPrice(price)})` : '';
  alert(`🛒 ${productName}${priceText}\n\nTo complete your purchase, join our Discord:\n${CONFIG.discordInvite}`);
}

// ==================== TRANSLATIONS ====================
const translations = {
  de: {
    "nav.home": "Home", "nav.spoofer": "Spoofer", "nav.stock": "Stock", "nav.scripts": "Scripts", "nav.accounts": "Accounts",
    "header.join": "Discord beitreten",
    "hero.badge": "5000+ ZUFRIEDENE KUNDEN", "hero.title1": "Premium Cheats", "hero.title2": "Spoofer & Stock Market",
    "hero.desc": "Unentdeckte HWID Spoofer, Live Stock System, Premium Scripts & Accounts.",
    "hero.liveStock": "LIVE STOCK", "hero.stats1": "Zufriedene Kunden", "hero.stats2": "Support", "hero.stats3": "Unentdeckt",
    "hero.shop": "Jetzt einkaufen", "hero.discord": "Discord Server", "hero.status": "Spoofer Status: Unentdeckt",
    "spoofer.title": "HWID Spoofer", "spoofer.sub": "Permanente & Temporäre HWID Spoofer",
    "spoofer.bestseller": "BESTSELLER", "spoofer.desc": "Komplette HWID Spoofing Lösung mit Kernel-Level Schutz.",
    "spoofer.feature1.title": "Anti-Cheat Support", "spoofer.feature1.desc": "EAC, BattlEye, Vanguard, Ricochet, FaceIT",
    "spoofer.feature2.title": "Serial Spoofing", "spoofer.feature2.desc": "Motherboard, Drives, MAC, BIOS, TPM",
    "spoofer.feature3.title": "Auto Updates", "spoofer.feature3.desc": "Lebenslange kostenlose Updates",
    "spoofer.feature4.title": "Clean Uninstall", "spoofer.feature4.desc": "Original IDs jederzeit wiederherstellen",
    "spoofer.f1": "EAC / BE / Vanguard Kompatibel", "spoofer.f2": "Automatische Seriennummer-Generierung",
    "spoofer.f3": "Permanente & Saubere Deinstallation", "spoofer.f4": "Lebenslange Updates inklusive",
    "spoofer.lifetime": "/ Lebenslang", "spoofer.buy": "Jetzt kaufen", "spoofer.guarantee": "24h Ersatz-Garantie",
    "spoofer.temp": "Temporärer Spoofer", "spoofer.temp.desc": "30-Tage Zugang",
    "spoofer.month": "/ Monat", "spoofer.cleaner": "Cleaner Tool", "spoofer.cleaner.desc": "Entfernt Spuren",
    "spoofer.onetime": "einmalig", "spoofer.select": "Auswählen",
    "stock.title": "Live Stock Market", "stock.sub": "Echtzeit-Stock Updates",
    "stock.table.product": "Produkt", "stock.table.price": "Preis", "stock.table.stock": "Stock", "stock.table.warranty": "Garantie",
    "scripts.title": "Premium Roblox Scripts", "scripts.sub": "Unentdeckte Scripts mit Aimbot, ESP, Auto-Farm",
    "scripts.download": "Download",
    "accounts.title": "Premium Accounts", "accounts.sub": "Hochwertige Accounts mit Garantie",
    "trust.secure": "Sichere Zahlung", "trust.secure.desc": "PayPal, Crypto & Kreditkarte",
    "trust.instant": "Sofortige Lieferung", "trust.instant.desc": "Automatisiertes Stock System",
    "trust.support": "24/7 Support", "trust.support.desc": "Discord & Ticket System",
    "trust.warranty": "Garantie", "trust.warranty.desc": "Ersatz bei Nichtfunktion",
    "footer.tagline": "Premium Tools & Services seit 2022", "footer.products": "Produkte",
    "footer.support": "Support", "footer.legal": "Rechtliches", "footer.rights": "Alle Rechte vorbehalten."
  },
  en: {
    "nav.home": "Home", "nav.spoofer": "Spoofer", "nav.stock": "Stock", "nav.scripts": "Scripts", "nav.accounts": "Accounts",
    "header.join": "Join Discord",
    "hero.badge": "TRUSTED BY 5000+ CUSTOMERS", "hero.title1": "Premium Cheats", "hero.title2": "Spoofer & Stock Market",
    "hero.desc": "Undetected HWID Spoofer, Live Stock System, Premium Scripts & Accounts.",
    "hero.liveStock": "LIVE STOCK", "hero.stats1": "Happy Customers", "hero.stats2": "Support", "hero.stats3": "Undetected",
    "hero.shop": "Shop Now", "hero.discord": "Discord Server", "hero.status": "Spoofer Status: Undetected",
    "spoofer.title": "HWID Spoofer", "spoofer.sub": "Permanent & Temporary HWID Spoofer",
    "spoofer.bestseller": "BESTSELLER", "spoofer.desc": "Complete HWID spoofing solution.",
    "spoofer.feature1.title": "Anti-Cheat Support", "spoofer.feature1.desc": "EAC, BattlEye, Vanguard, Ricochet, FaceIT",
    "spoofer.feature2.title": "Serial Spoofing", "spoofer.feature2.desc": "Motherboard, Drives, MAC, BIOS, TPM",
    "spoofer.feature3.title": "Auto Updates", "spoofer.feature3.desc": "Lifetime free updates",
    "spoofer.feature4.title": "Clean Uninstall", "spoofer.feature4.desc": "Restore original IDs",
    "spoofer.f1": "EAC / BE / Vanguard Compatible", "spoofer.f2": "Automatic Serial Generation",
    "spoofer.f3": "Permanent & Clean Uninstall", "spoofer.f4": "Lifetime Updates Included",
    "spoofer.lifetime": "/ Lifetime", "spoofer.buy": "Purchase Now", "spoofer.guarantee": "24h Replacement Guarantee",
    "spoofer.temp": "Temporary Spoofer", "spoofer.temp.desc": "30-day access",
    "spoofer.month": "/ month", "spoofer.cleaner": "Cleaner Tool", "spoofer.cleaner.desc": "Remove traces",
    "spoofer.onetime": "one-time", "spoofer.select": "Select",
    "stock.title": "Live Stock Market", "stock.sub": "Real-time stock updates",
    "stock.table.product": "Product", "stock.table.price": "Price", "stock.table.stock": "Stock", "stock.table.warranty": "Warranty",
    "scripts.title": "Premium Roblox Scripts", "scripts.sub": "Undetected scripts with Aimbot, ESP, Auto-Farm",
    "scripts.download": "Download",
    "accounts.title": "Premium Accounts", "accounts.sub": "High-quality accounts with warranty",
    "trust.secure": "Secure Payment", "trust.secure.desc": "PayPal, Crypto & Credit Card",
    "trust.instant": "Instant Delivery", "trust.instant.desc": "Automated stock system",
    "trust.support": "24/7 Support", "trust.support.desc": "Discord & Ticket System",
    "trust.warranty": "Warranty", "trust.warranty.desc": "Replacement if not working",
    "footer.tagline": "Premium Tools & Services since 2022", "footer.products": "Products",
    "footer.support": "Support", "footer.legal": "Legal", "footer.rights": "All rights reserved."
  }
};

let currentLang = localStorage.getItem('bluevision_lang') || 'de';

function switchLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (translations[lang][key].includes('<br>')) {
        element.innerHTML = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  
  localStorage.setItem('bluevision_lang', lang);
}

// ==================== NETWORK CANVAS ====================
class NetworkAnimation {
  constructor() {
    this.canvas = document.getElementById('networkCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    const particleCount = Math.floor((this.width * this.height) / 15000);
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => { this.resize(); this.createParticles(); });
    this.canvas.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    this.canvas.addEventListener('mouseleave', () => { this.mouse.x = -1000; this.mouse.y = -1000; });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
      this.ctx.fill();
    });

    this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
    this.ctx.lineWidth = 0.5;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 150) * 0.15})`;
          this.ctx.stroke();
        }
      }
    }

    if (this.mouse.x > 0 && this.mouse.y > 0) {
      this.particles.forEach(p => {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - distance / 200) * 0.2})`;
          this.ctx.stroke();
        }
      });
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', async () => {
  await loadStoreData();
  
  new NetworkAnimation();
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang')));
  });
  
  switchLanguage(currentLang);
  
  renderStockTables();
  renderScriptsGrid();
  renderAccountsGrid();
  updateLiveTicker();
  
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-product-id]');
    if (btn) {
      e.preventDefault();
      const name = btn.dataset.productName;
      const price = btn.dataset.productPrice ? parseFloat(btn.dataset.productPrice) : null;
      showProductAlert(name, price);
    }
  });
  
  document.querySelectorAll('a[href^="/BlueVision/#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href').split('#')[1];
      if (hash) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Customer counter
  let count = 2847;
  const counter = document.getElementById('total-customers');
  if (counter) {
    setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1;
      counter.textContent = count.toLocaleString();
    }, 5000);
  }
});

// ==================== LOAD STORE DATA FROM JSON ====================
async function loadStoreData() {
  try {
    // First try to load from localStorage (admin changes)
    const localData = localStorage.getItem('bluevision_store');
    if (localData) {
      storeData = JSON.parse(localData);
      console.log('📦 Loaded store data from localStorage');
      return storeData;
    }
    
    // Try to fetch from JSON file
    const response = await fetch('/BlueVision/_data/store.json');
    if (response.ok) {
      const jsonData = await response.json();
      storeData = {
        spoofer: {
          permanent: { price: jsonData.spoofer.permanent.price, stock: jsonData.spoofer.permanent.stock },
          temp: { price: jsonData.spoofer.temp.price, stock: jsonData.spoofer.temp.stock },
          cleaner: { price: jsonData.spoofer.cleaner.price, stock: jsonData.spoofer.cleaner.stock }
        },
        discord: jsonData.discord,
        roblox: jsonData.roblox,
        fortnite: jsonData.fortnite,
        premium: jsonData.premium,
        scripts: jsonData.scripts,
        accounts: jsonData.accounts,
        settings: jsonData.settings,
        stats: jsonData.stats,
        lastUpdated: jsonData.metadata?.lastUpdated || new Date().toISOString()
      };
      console.log('📦 Loaded store data from JSON file');
      return storeData;
    }
  } catch (error) {
    console.log('📦 Using default store data (JSON not found)');
  }
  
  // Use default data
  return getDefaultStoreData();
}

// Export for admin panel
window.BlueVisionStore = {
  getData: () => storeData,
  updateData: (newData) => {
    storeData = { ...storeData, ...newData };
    saveStoreData();
    renderStockTables();
    renderScriptsGrid();
    renderAccountsGrid();
    updateLiveTicker();
  },
  saveToFile: () => {
    const blob = new Blob([JSON.stringify(storeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'store_data.json';
    a.click();
  }
};

