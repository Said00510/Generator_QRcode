const download = document.querySelector(".download"),
      dark = document.querySelector(".dark"),
      light = document.querySelector(".light"),
      qrContainer = document.querySelector("#qr-code"),
      qrText = document.querySelector(".qr-text"),
      shareBtn = document.querySelector(".share-btn"),
      sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://twitter.com/XAradiiaX"

let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e){
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e){
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e){
    const value = e.target.value;
    text = value;
    if(!value){
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode('qr-code', {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
};

async function handleShare() {
    setTimeout(async () => {

        try{
            const base64url = resolveDataUrl()
            const blob = await(await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png",{
                type: blob.type,
            })
            await navigator.share({
                files: [file],
                title: text,
            })
        }catch(e){
            alert('El navegador no soporta el compartimiento.')
        }

    },100);
};

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
};

function resolveDataUrl() { 
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const img = document.querySelector('#qr-code img');
            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }

            const canvas = document.querySelector('canvas');
            resolve(canvas.toDataURL);
        },50);
    });
};

generateQRCode();