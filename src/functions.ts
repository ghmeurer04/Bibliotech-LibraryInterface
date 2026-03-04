import Quagga from "quagga";

export async function accessCamera(): Promise<string | null> {
    const video : HTMLVideoElement = document.getElementById("camera") as HTMLVideoElement;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
        });
        video.srcObject = stream;

        Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.getElementById("camera") as HTMLVideoElement
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
        },
        err => {
            if (err) {
            console.error(err);
            return;
            }
            Quagga.start();
        }
        );

        Quagga.onDetected(data => {
            console.log(data.codeResult.code);
            Quagga.stop();
            return data.codeResult.code
        });
    
        return ""; // Placeholder return value, as the actual code is returned in the onDetected callback

    } catch (err) {
        console.log(err)
        console.error("Camera access denied:", err);
        return null;
    }
}

export function stopCamera() {
    const video : HTMLVideoElement = document.getElementById("camera") as HTMLVideoElement;
    const stream: MediaStream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
}