// File Name: security-engine.js
// Description: Background Security Engine for PJ-ECC

const SecurityEngine = {
    // 1. Authorized Domain (Aapka Specific GitHub Username)
    authorizedDomain: "pjcompanyofficial.github.io", 

    init: function() {
        this.checkDomain();
        this.preventInspection();
        console.log("%c 🛡️ PJ-ECC Security Engine Active ", "background: #FF6A00; color: #000; font-weight: bold; padding: 5px; border-radius: 5px;");
    },

    // 2. Domain Lock: Agar koi code copy karke dusri jagah chalayega toh block ho jayega
    checkDomain: function() {
        const host = window.location.hostname;
        // Local testing allow hai, baki sirf aapke GitHub domain par chalega
        if (host !== "localhost" && host !== "127.0.0.1" && !host.includes(this.authorizedDomain)) {
            document.body.innerHTML = `
                <div style="background:#050505; color:#FF3131; height:100vh; display:flex; align-items:center; justify-content:center; font-family:'Orbitron', sans-serif; text-align:center; padding:20px; flex-direction:column; border: 5px solid #FF3131;">
                    <h1 style="font-size: 3rem; text-shadow: 0 0 20px #FF3131;">⚠️ SECURITY VIOLATION</h1>
                    <p style="color:white; font-size: 1.2rem; letter-spacing: 2px;">Unauthorized Domain Detected. Access is permanently restricted.</p>
                    <p style="opacity:0.5;">Engine: PJ-ECC V4.2 Protection</p>
                </div>`;
            throw new Error("Violation: Unauthorized Host Detection");
        }
    },

    // 3. Anti-Hack: Right click aur Inspect Element band karne ki koshish
    preventInspection: function() {
        // Right click disabled
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // F12, Ctrl+Shift+I, Ctrl+U (View Source) block
        document.onkeydown = function(e) {
            if (
                e.keyCode == 123 || 
                (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
                (e.ctrlKey && e.keyCode == 85)
            ) {
                alert("PJ-ECC Security: DevTools access is restricted.");
                return false;
            }
        };
    },

    // 4. Decryption Logic: QR data ko wapas readable banane ke liye
    secureDecrypt: function(encryptedData) {
        try {
            // Reverse order -> Base64 Decode
            let reversed = encryptedData.split('').reverse().join('');
            return atob(reversed);
        } catch (e) {
            console.error("Decryption Error: Invalid Token Structure");
            return null;
        }
    }
};

// Engine ko start karna
SecurityEngine.init();
