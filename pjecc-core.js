/**
 * PJ-ECC CORE SYSTEM
 * Feature: QR Logo Integration & Holographic Watermark
 */

// 1. CONFIGURATION FOR LOGO
const LOGO_SRC = '1000041076.png'; // Place your image file in the same folder

// 2. STYLING THE HOLOGRAPHIC CARD WITH WATERMARK
const injectWatermarkStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .verified-card {
            position: relative;
            background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
            overflow: hidden;
            z-index: 1;
        }

        /* The Logo Watermark Background */
        .verified-card::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background-image: url('${LOGO_SRC}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            opacity: 0.15; /* Subtle watermark effect */
            z-index: -1;
            filter: grayscale(100%);
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
                rgba(255,255,255,0.1) 45%,
                rgba(255,255,255,0.5) 50%,
                rgba(255,255,255,0.1) 55%,
                rgba(255,255,255,0) 100%
            );
            transform: rotate(25deg);
            animation: holo-shine 6s infinite;
            pointer-events: none;
        }

        @keyframes holo-shine {
            0% { transform: translate(-10%, -10%) rotate(25deg); }
            100% { transform: translate(10%, 10%) rotate(25deg); }
        }

        #qrcode {
            position: relative;
            display: inline-block;
            padding: 10px;
            background: white;
            border-radius: 10px;
        }

        /* Center Logo Styling for QR */
        .qr-logo-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px; /* Adjust size of center logo */
            height: 50px;
            background: white;
            border-radius: 50%; /* Circle shape as requested */
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }

        .qr-logo-overlay img {
            width: 100%;
            height: 100%;
            object-fit: contain;
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
    
    if(!n || !r) return alert("All fields are mandatory!");

    const qrd = document.getElementById('qrcode');
    qrd.innerHTML = ""; // Clear old QR
    document.getElementById('qr-display-section').classList.remove('hidden');

    const link = `${window.location.origin}${window.location.pathname}?pjecc=1&n=${encodeURIComponent(n)}&d=${encodeURIComponent(d)}&a=${encodeURIComponent(a)}&r=${encodeURIComponent(r)}`;
    
    // Create QR Code
    new QRCode(qrd, {
        text: link,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H // High level allows for logo overlay
    });

    // Wait a moment for QR to render, then add center logo
    setTimeout(() => {
        const qrContainer = document.getElementById('qrcode');
        const logoOverlay = document.createElement('div');
        logoOverlay.className = 'qr-logo-overlay';
        
        const logoImg = document.createElement('img');
        logoImg.src = LOGO_SRC;
        
        logoOverlay.appendChild(logoImg);
        qrContainer.appendChild(logoOverlay);
    }, 100);
}

// Initialize styles
injectWatermarkStyles();

