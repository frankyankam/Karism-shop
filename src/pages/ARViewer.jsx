import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ARViewer() {
  const { id } = useParams();
  const productModelURL = `/models/${id}/model.glb`;
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const aframeScript = document.createElement("script");
    aframeScript.src = "https://cdn.jsdelivr.net/npm/aframe@1.7.1/dist/aframe.min.js";
    aframeScript.async = true;

    const mindarScript = document.createElement("script");
    mindarScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.4/dist/mindar-image-aframe.prod.js";
    mindarScript.async = true;

    aframeScript.onload = () => {
      mindarScript.onload = () => {
        setScriptsLoaded(true);
      };
      document.body.appendChild(mindarScript);
    };

    document.body.appendChild(aframeScript);

    return () => {
      document.body.removeChild(aframeScript);
      document.body.removeChild(mindarScript);
    };
  }, []);

  useEffect(() => {
    console.log("Model path:", productModelURL);
  }, [productModelURL]);

  if (!scriptsLoaded) return <div>Chargement de la scène AR...</div>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <a-scene
  mindar-image="imageTargetSrc: /targets/card.mind; autoStart: true; uiScanning: yes; uiLoading: yes"
  embedded
>
  <a-assets>
    <a-asset-item id="model" src={productModelURL}></a-asset-item>
  </a-assets>
  <a-camera look-controls="enabled: false"></a-camera>
  <a-entity mindar-image-target="targetIndex: 0">
    <a-gltf-model
      src="#model"
      scale="0.05 0.05 0.05"
      animation-mixer
    ></a-gltf-model>
  </a-entity>
</a-scene>

    </div>
  );
}
