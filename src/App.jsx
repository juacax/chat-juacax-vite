import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader,BarcodeFormat } from "@zxing/library";

const App = () => {


  const hints = new Map();
  const formats = [BarcodeFormat.PDF_417];
  hints.set(formats);

  const codeReader = new BrowserMultiFormatReader(hints);

  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState("");
  const [device,setDevice] = useState(0);
  const [cantDevices, setCantDevices] = useState(0);
  const [infoDevice, setInfoDevice] = useState("");
  

  function cambiarDevice(){
    let camaraActual = device;
    if(camaraActual==cantDevices-1){
      setDevice(0)
    }else{
      setDevice(camaraActual+1);
    }
  }

  const obtenerDevices = async() => {
    const d = await codeReader.listVideoInputDevices()
    console.log(d)
    return d;
  }

  useEffect(() => {
    
    const camaras = obtenerDevices();
    
    camaras.then((mediaDevices)=>{
      setCantDevices(mediaDevices.length)
   

    codeReader.format
    setInfoDevice(JSON.stringify(mediaDevices))
    console.log(mediaDevices)
    codeReader.decodeFromVideoDevice(undefined,videoRef.current,(result,error)=>{

      if(result){
        if(result?.format == 10){
          console.log(result)
          console.log(JSON.stringify(result.resultMetadata))
          setBarcode(result.text)
        }else{
          setBarcode("Código no válido, formato número: " + result.format)
        }
      }
    })
 })
    return () => {
      codeReader.reset();
    };
  }, [device]);

  return (
    <div>
      <button onClick={cambiarDevice}>Cambiar Device</button>
      <h1>Lector de codigos</h1>
      <p>Lectura: {barcode}</p>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
      <p>Info: {infoDevice}</p>
    </div>
  );
}

export default App;
