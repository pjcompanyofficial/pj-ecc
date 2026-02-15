/**
 * PJ-ECC CORE SYSTEM
 * Feature: QR Logo Integration & Holographic Watermark
 * Updated Image: 1770956528605.png
 */

// 1. CONFIGURATION FOR LOGO (Updated with your file name)
const LOGO_SRC = '1770956528605.png'; 

// 2. STYLING THE HOLOGRAPHIC CARD WITH WATERMARK
const injectWatermarkStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .verified-card {
            position: relative;
            background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
            overflow: hidden;
            z-index: 1;
            border: 1px solid rgba(0,0,0,0.1);
        }

        /* The Logo Watermark Background - Using 1770956528605.png */
        .verified-card::before {
            content: "";
            position: absolute;
            top: 55%; /* Slightly lower for better look */
            left: 50%;
            transform: translate(-50%, -50%);
            width: 85%;
            height: 85%;
            background-image: url('${LOGO_SRC}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            opacity: 0.12; /* Subtle watermark opacity */
            z-index: -1;
            filter: grayscale(100%); /* Professional subtle look */
        }

        /* Animated Holographic Overlay */
        .verified-card::after {
            content: "";
            position: absolute;
            top: -150%;
            left: -150%;
            width: 400%;
            height: 400%;
            background: linear-gradient(
                45deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.05) 45%,
                rgba(255,255,255,0.4) 50%,
                rgba(255,255,255,0.05) 55%,
                rgba(255,255,255,0) 100%
            );
            transform: rotate(25deg);
            animation: holo-shine 5s infinite linear;
            pointer-events: none;
        }

        @keyframes holo-shine {
            0% { transform: translate(-15%, -15%) rotate(25deg); }
            100% { transform: translate(15%, 15%) rotate(25deg); }
        }

        #qrcode {
            position: relative;
            display: inline-block;
            padding: 12px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* Center Logo Circle for QR Code - Using 1770956528605.png */
        .qr-logo-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px; /* Perfect size for readability */
            height: 60px;
            background: white;
            border-radius: 50%; 
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid #fff;
        }

        .qr-logo-overlay img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
        }
    `;
    document.head.appendChild(style);
};

// 3. ENHANCED QR GENERATOR WITH CENTER LOGO
function generateSecureQR() {
    const n = document.getElementById('mName').value;
    const d = document.getElementById('mDate').value;
    const a = document.getElementById('mAddr').value;
    const r = document.getElementById('mRef').value;
    
    if(!n || !r) return alert("Please fill Name and Ref ID!");

    const qrd = document.getElementById('qrcode');
    qrd.innerHTML = ""; 
    document.getElementById('qr-display-section').classList.remove('hidden');

    const link = `${window.location.origin}${window.location.pathname}?pjecc=1&n=${encodeURIComponent(n)}&d=${encodeURIComponent(d)}&a=${encodeURIComponent(a)}&r=${encodeURIComponent(r)}`;
    
    // Create QR Code with High Correction level for Logo
    new QRCode(qrd, {
        text: link,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H 
    });

    // Add 1770956528605.png as center logo overlay
    setTimeout(() => {
        const qrContainer = document.getElementById('qrcode');
        const logoOverlay = document.createElement('div');
        logoOverlay.className = 'qr-logo-overlay';
        
        const logoImg = document.createElement('img');
        logoImg.src = LOGO_SRC;
        
        logoOverlay.appendChild(logoImg);
        qrContainer.appendChild(logoOverlay);
    }, 150);
}

// Initialize
injectWatermarkStyles();
