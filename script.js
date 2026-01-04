// 地図の初期化
const map = L.map('map').setView([20, 0], 2);

// OpenStreetMapタイルレイヤーを追加
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// カテゴリごとの色とアイコン設定
const categoryConfig = {
    strongOppose: {
        color: '#dc3545',
        icon: '🔴',
        label: '強く非難（反対）',
        className: 'strong-oppose'
    },
    concern: {
        color: '#ffc107',
        icon: '🟡',
        label: '懸念表明・中立的立場',
        className: 'concern'
    },
    support: {
        color: '#28a745',
        icon: '🟢',
        label: '支持・肯定的反応',
        className: 'support'
    },
    noResponse: {
        color: '#6c757d',
        icon: '⚪',
        label: '公式反応なし',
        className: 'no-response'
    }
};

// カスタムアイコンの作成
function createCustomIcon(color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}

// マーカーを地図に追加
function addMarkersToMap() {
    Object.keys(categoryConfig).forEach(category => {
        const config = categoryConfig[category];
        const countries = countryData[category];
        
        countries.forEach(country => {
            const marker = L.marker([country.lat, country.lng], {
                icon: createCustomIcon(config.color)
            }).addTo(map);
            
            // ポップアップに情報を表示
            marker.bindPopup(`
                <div style="text-align: center; padding: 5px;">
                    <strong style="font-size: 1.2em;">${config.icon} ${country.name}</strong><br>
                    <span style="color: ${config.color}; font-weight: bold;">${config.label}</span><br>
                    <div style="margin-top: 10px; text-align: left; font-size: 0.9em;">
                        ${country.reaction}
                    </div>
                    <div style="margin-top: 10px; font-size: 0.8em; color: #666; font-style: italic;">
                        出典: ${country.source}
                    </div>
                </div>
            `);
            
            // マーカーにカテゴリ情報を保存
            marker.category = category;
            marker.countryData = country;
        });
    });
}

// 各国の詳細カードを生成
function createCountryCards() {
    const container = document.getElementById('country-details');
    container.innerHTML = '';
    
    Object.keys(categoryConfig).forEach(category => {
        const config = categoryConfig[category];
        const countries = countryData[category];
        
        countries.forEach(country => {
            const card = document.createElement('div');
            card.className = `country-card ${config.className}`;
            card.innerHTML = `
                <h3>${config.icon} ${country.name}</h3>
                <div class="reaction-type">${config.label}</div>
                <div class="reaction-content">${country.reaction}</div>
                <div class="source">出典: ${country.source}</div>
            `;
            
            // カードクリック時に地図の該当位置に移動
            card.addEventListener('click', () => {
                map.setView([country.lat, country.lng], 5);
                // 該当するマーカーのポップアップを開く
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker && layer.countryData && layer.countryData.name === country.name) {
                        layer.openPopup();
                    }
                });
            });
            
            card.style.cursor = 'pointer';
            container.appendChild(card);
        });
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    addMarkersToMap();
    createCountryCards();
});
