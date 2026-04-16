// ==================== CONFIGURATION ====================
const CONFIG = {
  discordInvite: 'https://discord.gg/38QmF8TKCr',
  adminSecret: 'AdminBlueTrigger=F(s5jodhCm=K>6,L'
};

// ==================== ADMIN SECRET CHECK ====================
(function checkAdminAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminKey = window.location.pathname + window.location.search;
  
  if (adminKey.includes(CONFIG.adminSecret) || urlParams.get('admin') === 'true') {
    sessionStorage.setItem('bluevision_admin', 'true');
    window.location.href = '/BlueVision/admin/';
  }
  
  // Check if user is admin
  if (sessionStorage.getItem('bluevision_admin') === 'true') {
    console.log('%c🔷 BlueVision Admin Mode Active', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
  }
})();

// ==================== NETWORK CANVAS ANIMATION ====================
class NetworkAnimation {
  constructor() {
    this.canvas = document.getElementById('networkCanvas');
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
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Update and draw particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
      this.ctx.fill();
    });

    // Draw connections
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
          
          const opacity = (1 - distance / 150) * 0.15;
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          this.ctx.stroke();
        }
      }
    }

    // Draw connections to mouse
    if (this.mouse.x > 0 && this.mouse.y > 0) {
      this.particles.forEach(p => {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          
          const opacity = (1 - distance / 200) * 0.2;
          this.ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
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

// Initialize network animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('networkCanvas')) {
    new NetworkAnimation();
  }
});

// ==================== TRANSLATIONS ====================
const translations = {
  de: {
    "nav.home": "Home",
    "nav.spoofer": "Spoofer",
    "nav.stock": "Stock",
    "nav.scripts": "Scripts",
    "nav.accounts": "Accounts",
    "header.join": "Discord beitreten",
    
    "hero.badge": "5000+ ZUFRIEDENE KUNDEN",
    "hero.title1": "Premium Cheats",
    "hero.title2": "Spoofer & Stock Market",
    "hero.desc": "Unentdeckte HWID Spoofer, Live Stock System, Premium Scripts & Accounts. Trete der vertrauenswürdigsten Community seit 2022 bei.",
    "hero.liveStock": "LIVE STOCK",
    "hero.stats1": "Zufriedene Kunden",
    "hero.stats2": "Support",
    "hero.stats3": "Unentdeckt",
    "hero.shop": "Jetzt einkaufen",
    "hero.discord": "Discord Server",
    "hero.status": "Spoofer Status: Unentdeckt (Letztes Update: Heute)",
    
    "spoofer.title": "HWID Spoofer",
    "spoofer.sub": "Permanente & Temporäre HWID Spoofer - Unentdeckt seit 2022",
    "spoofer.bestseller": "BESTSELLER",
    "spoofer.desc": "Komplette HWID Spoofing Lösung mit Kernel-Level Schutz. Funktioniert mit allen großen Anti-Cheats.",
    "spoofer.feature1.title": "Anti-Cheat Support",
    "spoofer.feature1.desc": "EAC, BattlEye, Vanguard, Ricochet, FaceIT",
    "spoofer.feature2.title": "Serial Spoofing",
    "spoofer.feature2.desc": "Motherboard, Drives, MAC, BIOS, TPM",
    "spoofer.feature3.title": "Auto Updates",
    "spoofer.feature3.desc": "Lebenslange kostenlose Updates",
    "spoofer.feature4.title": "Clean Uninstall",
    "spoofer.feature4.desc": "Original IDs jederzeit wiederherstellen",
    "spoofer.f1": "EAC / BE / Vanguard Kompatibel",
    "spoofer.f2": "Automatische Seriennummer-Generierung",
    "spoofer.f3": "Permanente & Saubere Deinstallation",
    "spoofer.f4": "Lebenslange Updates inklusive",
    "spoofer.lifetime": "/ Lebenslang",
    "spoofer.buy": "Jetzt kaufen",
    "spoofer.guarantee": "24h Ersatz-Garantie",
    "spoofer.temp": "Temporärer Spoofer",
    "spoofer.temp.desc": "30-Tage Zugang, perfekt zum Testen",
    "spoofer.month": "/ Monat",
    "spoofer.cleaner": "Cleaner Tool",
    "spoofer.cleaner.desc": "Entfernt Spuren & Ban-Beweise",
    "spoofer.onetime": "einmalig",
    "spoofer.select": "Auswählen",
    
    "stock.title": "Live Stock Market",
    "stock.sub": "Echtzeit-Stock Updates - Sofortige Lieferung nach Kauf",
    "stock.table.product": "Produkt",
    "stock.table.price": "Preis",
    "stock.table.stock": "Stock",
    "stock.table.warranty": "Garantie",
    
    "scripts.title": "Premium Roblox Scripts",
    "scripts.sub": "Unentdeckte Scripts mit Aimbot, ESP, Auto-Farm & mehr",
    "scripts.download": "Download",
    
    "accounts.title": "Premium Accounts",
    "accounts.sub": "Hochwertige Accounts mit Garantie & Ersatz",
    
    "trust.secure": "Sichere Zahlung",
    "trust.secure.desc": "PayPal, Crypto & Kreditkarte",
    "trust.instant": "Sofortige Lieferung",
    "trust.instant.desc": "Automatisiertes Stock System",
    "trust.support": "24/7 Support",
    "trust.support.desc": "Discord & Ticket System",
    "trust.warranty": "Garantie",
    "trust.warranty.desc": "Ersatz bei Nichtfunktion",
    
    "footer.tagline": "Premium Tools & Services seit 2022",
    "footer.products": "Produkte",
    "footer.support": "Support",
    "footer.legal": "Rechtliches",
    "footer.rights": "Alle Rechte vorbehalten."
  },
  
  en: {
    "nav.home": "Home",
    "nav.spoofer": "Spoofer",
    "nav.stock": "Stock",
    "nav.scripts": "Scripts",
    "nav.accounts": "Accounts",
    "header.join": "Join Discord",
    
    "hero.badge": "TRUSTED BY 5000+ CUSTOMERS",
    "hero.title1": "Premium Cheats",
    "hero.title2": "Spoofer & Stock Market",
    "hero.desc": "Undetected HWID Spoofer, Live Stock System, Premium Scripts & Accounts. Join the most trusted community since 2022.",
    "hero.liveStock": "LIVE STOCK",
    "hero.stats1": "Happy Customers",
    "hero.stats2": "Support",
    "hero.stats3": "Undetected",
    "hero.shop": "Shop Now",
    "hero.discord": "Discord Server",
    "hero.status": "Spoofer Status: Undetected (Last Update: Today)",
    
    "spoofer.title": "HWID Spoofer",
    "spoofer.sub": "Permanent & Temporary HWID Spoofer - Undetected since 2022",
    "spoofer.bestseller": "BESTSELLER",
    "spoofer.desc": "Complete HWID spoofing solution with kernel-level protection. Works on all major anti-cheats.",
    "spoofer.feature1.title": "Anti-Cheat Support",
    "spoofer.feature1.desc": "EAC, BattlEye, Vanguard, Ricochet, FaceIT",
    "spoofer.feature2.title": "Serial Spoofing",
    "spoofer.feature2.desc": "Motherboard, Drives, MAC, BIOS, TPM",
    "spoofer.feature3.title": "Auto Updates",
    "spoofer.feature3.desc": "Lifetime free updates & new offsets",
    "spoofer.feature4.title": "Clean Uninstall",
    "spoofer.feature4.desc": "Restore original IDs anytime",
    "spoofer.f1": "EAC / BE / Vanguard Compatible",
    "spoofer.f2": "Automatic Serial Generation",
    "spoofer.f3": "Permanent & Clean Uninstall",
    "spoofer.f4": "Lifetime Updates Included",
    "spoofer.lifetime": "/ Lifetime",
    "spoofer.buy": "Purchase Now",
    "spoofer.guarantee": "24h Replacement Guarantee",
    "spoofer.temp": "Temporary Spoofer",
    "spoofer.temp.desc": "30-day access, perfect for testing",
    "spoofer.month": "/ month",
    "spoofer.cleaner": "Cleaner Tool",
    "spoofer.cleaner.desc": "Remove traces & ban evidence",
    "spoofer.onetime": "one-time",
    "spoofer.select": "Select",
    
    "stock.title": "Live Stock Market",
    "stock.sub": "Real-time stock updates - Instant delivery after purchase",
    "stock.table.product": "Product",
    "stock.table.price": "Price",
    "stock.table.stock": "Stock",
    "stock.table.warranty": "Warranty",
    
    "scripts.title": "Premium Roblox Scripts",
    "scripts.sub": "Undetected scripts with Aimbot, ESP, Auto-Farm & more",
    "scripts.download": "Download",
    
    "accounts.title": "Premium Accounts",
    "accounts.sub": "High-quality accounts with warranty & replacement",
    
    "trust.secure": "Secure Payment",
    "trust.secure.desc": "PayPal, Crypto & Credit Card",
    "trust.instant": "Instant Delivery",
    "trust.instant.desc": "Automated stock system",
    "trust.support": "24/7 Support",
    "trust.support.desc": "Discord & Ticket System",
    "trust.warranty": "Warranty",
    "trust.warranty.desc": "Replacement if not working",
    
    "footer.tagline": "Premium Tools & Services since 2022",
    "footer.products": "Products",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved."
  }
};

// ==================== STOCK DATA (Editable) ====================
let stockData = JSON.parse(localStorage.getItem('bluevision_stock')) || {
  spoofer: { permanent: 156, temp: 234 },
  discord: [
    { name: 'Discord Token (1 Month)', price: '€2.99', stock: 147, warranty: '24h', badge: 'high', icon: 'fab fa-discord' },
    { name: 'Discord Token (3 Month)', price: '€6.99', stock: 89, warranty: '7 days', badge: 'high', icon: 'fab fa-discord' },
    { name: 'Discord Nitro (1 Month)', price: '€4.99', stock: 34, warranty: '48h', badge: 'medium', icon: 'fab fa-discord' },
    { name: 'Discord Nitro (1 Year)', price: '€49.99', stock: 12, warranty: '30 days', badge: 'low', icon: 'fab fa-discord' },
    { name: 'Discord Early Supporter', price: '€29.99', stock: 8, warranty: 'Lifetime', badge: 'low', icon: 'fab fa-discord' }
  ],
  roblox: [
    { name: 'Roblox Account (1k Robux)', price: '€9.99', stock: 56, warranty: '24h', badge: 'high', icon: 'fas fa-gamepad' },
    { name: 'Roblox Account (10k Robux)', price: '€49.99', stock: 23, warranty: '48h', badge: 'medium', icon: 'fas fa-gamepad' },
    { name: 'Roblox Limited Account', price: '€99.99 - €499.99', stock: 7, warranty: '7 days', badge: 'low', icon: 'fas fa-crown' },
    { name: 'Roblox 2010+ Account', price: '€19.99', stock: 31, warranty: '48h', badge: 'medium', icon: 'fas fa-calendar' },
    { name: 'Roblox Dominus Account', price: '€299.99+', stock: 3, warranty: '14 days', badge: 'low', icon: 'fas fa-hat-wizard' }
  ],
  fortnite: [
    { name: 'Fortnite OG Skull Trooper', price: '€149.99', stock: 5, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { name: 'Fortnite Black Knight', price: '€199.99', stock: 3, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { name: 'Fortnite Renegade Raider', price: '€249.99', stock: 2, warranty: '30 days', badge: 'low', icon: 'fab fa-fort-awesome' },
    { name: 'Fortnite Stacked (200+ Skins)', price: '€89.99', stock: 14, warranty: '14 days', badge: 'medium', icon: 'fab fa-fort-awesome' },
    { name: 'Fortnite Fresh Account', price: '€4.99', stock: 234, warranty: '24h', badge: 'high', icon: 'fab fa-fort-awesome' }
  ],
  premium: [
    { name: 'Spotify Premium (1 Month)', price: '€2.99', stock: 189, warranty: '30 days', badge: 'high', icon: 'fab fa-spotify' },
    { name: 'Spotify Premium (1 Year)', price: '€24.99', stock: 78, warranty: '180 days', badge: 'high', icon: 'fab fa-spotify' },
    { name: 'Netflix Premium (1 Month)', price: '€4.99', stock: 123, warranty: '30 days', badge: 'high', icon: 'fas fa-film' },
    { name: 'Disney+ (1 Year)', price: '€19.99', stock: 45, warranty: '180 days', badge: 'medium', icon: 'fab fa-disney' },
    { name: 'Amazon Prime (1 Month)', price: '€3.99', stock: 67, warranty: '30 days', badge: 'medium', icon: 'fab fa-amazon' }
  ],
  scripts: [
    { name: 'Emery Hamburg', price: '€24.99', stock: 89, icon: 'fas fa-hamburger', featured: true, tags: ['aimbot', 'esp', 'farm', 'silent'] },
    { name: 'Phantom X', price: '€19.99', stock: 234, icon: 'fas fa-ghost', tags: ['aimbot', 'esp', 'executor'] },
    { name: 'Synapse Z', price: '€14.99', stock: -1, icon: 'fas fa-bolt', tags: ['executor'] },
    { name: 'Dragon Executor', price: '€29.99', stock: 45, icon: 'fas fa-dragon', tags: ['executor', 'aimbot', 'esp'] },
    { name: 'Script-Ware', price: '€34.99', stock: 67, icon: 'fas fa-crown', tags: ['executor', 'aimbot', 'esp', 'farm'] },
    { name: 'KrX Client', price: '€21.99', stock: 123, icon: 'fas fa-bomb', tags: ['executor', 'aimbot', 'esp'] }
  ],
  accounts: [
    { type: 'Roblox', name: 'Roblox Limited Accounts', price: '€49.99 - €499.99', stock: 7, icon: 'fas fa-gamepad', class: 'roblox' },
    { type: 'Fortnite', name: 'OG Skull / Ghoul Trooper', price: '€79.99 - €299.99', stock: 5, icon: 'fab fa-fort-awesome', class: 'fortnite' },
    { type: 'Discord', name: 'Nitro / Early Supporter', price: '€9.99 - €49.99', stock: 12, icon: 'fab fa-discord', class: 'discord' },
    { type: 'Valorant', name: 'High ELO / Skins', price: '€39.99 - €199.99', stock: 9, icon: 'fas fa-crosshairs', class: 'valorant' },
    { type: 'Steam', name: 'Level 100+ / Games', price: '€29.99 - €149.99', stock: 15, icon: 'fab fa-steam', class: 'steam' },
    { type: 'Minecraft', name: 'OG / Cape Accounts', price: '€14.99 - €89.99', stock: 11, icon: 'fas fa-cube', class: 'minecraft' }
  ]
};

// ==================== RENDER FUNCTIONS ====================
function renderStockTables() {
  // Discord Table
  const discordTbody = document.querySelector('#discordStockTable tbody');
  if (discordTbody) {
    discordTbody.innerHTML = stockData.discord.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${item.price}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Roblox Table
  const robloxTbody = document.querySelector('#robloxStockTable tbody');
  if (robloxTbody) {
    robloxTbody.innerHTML = stockData.roblox.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${item.price}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Fortnite Table
  const fortniteTbody = document.querySelector('#fortniteStockTable tbody');
  if (fortniteTbody) {
    fortniteTbody.innerHTML = stockData.fortnite.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${item.price}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Premium Table
  const premiumTbody = document.querySelector('#premiumStockTable tbody');
  if (premiumTbody) {
    premiumTbody.innerHTML = stockData.premium.map(item => `
      <tr>
        <td><i class="${item.icon}"></i> ${item.name}</td>
        <td>${item.price}</td>
        <td><span class="stock-badge-${item.badge}">${item.stock} in stock</span></td>
        <td>${item.warranty}</td>
        <td><button class="btn-table-buy" data-product="${item.name}">Buy</button></td>
      </tr>
    `).join('');
  }

  // Update spoofer stock
  const spooferStock = document.getElementById('spooferStock');
  if (spooferStock) {
    spooferStock.innerHTML = `<i class="fas fa-cubes"></i> <span>${stockData.spoofer.permanent} Keys available</span>`;
  }
}

function renderScriptsGrid() {
  const grid = document.getElementById('scriptsGrid');
  if (!grid) return;

  grid.innerHTML = stockData.scripts.map(script => {
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
        <div class="script-price">${script.price}</div>
        <div class="script-stock">${stockText}</div>
        <button class="btn-buy-script" data-product="${script.name}">
          <i class="fas fa-download"></i> Download
        </button>
      </div>
    `;
  }).join('');
}

function renderAccountsGrid() {
  const grid = document.getElementById('accountsGrid');
  if (!grid) return;

  grid.innerHTML = stockData.accounts.map(acc => `
    <div class="account-card">
      <div class="account-type ${acc.class}">${acc.type}</div>
      <div class="account-details">
        <h4>${acc.name}</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> Full Access</li>
          <li><i class="fas fa-check-circle"></i> Warranty Included</li>
        </ul>
        <div class="account-price">${acc.price}</div>
        <div class="account-stock"><i class="fas fa-box"></i> ${acc.stock} in stock</div>
      </div>
      <button class="btn-account" data-product="${acc.name}">View Details</button>
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
    `<i class="fab fa-discord"></i> Discord Nitro: ${stockData.discord[2].stock} in stock`,
    `<i class="fas fa-gamepad"></i> Roblox Limiteds: ${stockData.roblox[2].stock} in stock`,
    `<i class="fab fa-fort-awesome"></i> Fortnite OG: ${stockData.fortnite[0].stock} in stock`,
    `<i class="fas fa-microchip"></i> Spoofer Keys: ${stockData.spoofer.permanent} in stock`
  ];
  
  ticker.innerHTML = items.map(item => `<div class="ticker-item">${item}</div>`).join('');
}

// ==================== LANGUAGE SWITCH ====================
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

// ==================== PRODUCT CLICK ====================
function showProductAlert(productName) {
  alert(`🛒 ${productName} added to cart!\n\nJoin Discord to complete purchase:\n${CONFIG.discordInvite}`);
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  // Language switch
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang')));
  });
  
  switchLanguage(currentLang);
  
  // Render content
  renderStockTables();
  renderScriptsGrid();
  renderAccountsGrid();
  updateLiveTicker();
  
  // Product buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-product]')) {
      e.preventDefault();
      const btn = e.target.closest('[data-product]');
      showProductAlert(btn.getAttribute('data-product'));
    }
  });
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="/BlueVision/#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const hash = href.split('#')[1];
      if (hash) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop && scrollY < sectionTop + section.clientHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('nav-active');
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

// ==================== ADMIN FUNCTIONS (for admin panel) ====================
window.BlueVisionAdmin = {
  getStock: () => stockData,
  updateStock: (newData) => {
    stockData = { ...stockData, ...newData };
    localStorage.setItem('bluevision_stock', JSON.stringify(stockData));
    renderStockTables();
    renderScriptsGrid();
    renderAccountsGrid();
    updateLiveTicker();
    return stockData;
  },
  resetStock: () => {
    localStorage.removeItem('bluevision_stock');
    location.reload();
  }
};