import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader,BarcodeFormat } from "@zxing/library";

const App = () => {

  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    let contador=0;
    const hints = new Map();
    const formats = [BarcodeFormat.PDF_417];
    hints.set(formats);

    const codeReader = new BrowserMultiFormatReader(hints);
    const devices = codeReader.listVideoInputDevices()
    codeReader.format
    codeReader.decodeFromVideoDevice(devices[0],videoRef.current,(result,error)=>{

      if(result){
        contador++;
        console.log("inteto "+contador);
        if(result?.format == 10){
          console.log(result)
          console.log(JSON.stringify(result.resultMetadata))
          setBarcode(result.text)
        }else{
          setBarcode("Código no válido, formato número: " + result.format)
        }
      }
    })

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h1>Lector de codigos</h1>
      <p>Lectura: {barcode}</p>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default App;