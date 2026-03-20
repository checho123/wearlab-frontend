/** @jsxImportSource react */
import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

interface UnityViewerProps {
  userGuid:  string;
  itemGuid:  string;
}

export default function UnityViewer({ userGuid, itemGuid }: UnityViewerProps) {
  const [isReady, setIsReady] = useState(false);

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl:     "/unity/Build/WearLab.loader.js",
      dataUrl:       "/unity/Build/WearLab.data",
      frameworkUrl:  "/unity/Build/WearLab.framework.js",
      codeUrl:       "/unity/Build/WearLab.wasm",
    });

  // Unity → Astro: cuando Unity está listo
  useEffect(() => {
    function onReady() {
      setIsReady(true);
      // Enviar datos del usuario y prenda a Unity
      sendMessage("GameManager", "SetUser", userGuid);
      sendMessage("GameManager", "LoadItem", itemGuid);
    }

    addEventListener("OnUnityReady", onReady);
    return () => removeEventListener("OnUnityReady", onReady);
  }, [addEventListener, removeEventListener, sendMessage, userGuid, itemGuid]);

  // Unity → Astro: cuando el usuario hace click en comprar
  useEffect(() => {
    function onAddToCart(itemId: string) {
      window.dispatchEvent(
        new CustomEvent("wearlab:addToCart", { detail: { itemId } })
      );
    }

    addEventListener("OnAddToCart", onAddToCart);
    return () => removeEventListener("OnAddToCart", onAddToCart);
  }, [addEventListener, removeEventListener]);

  return (
    <div className="relative w-full h-full bg-black">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-white font-serif italic text-2xl mb-2">
              Wear<span className="text-red-700 not-italic">Lab</span>
            </div>
            <p className="text-neutral-500 text-xs tracking-widest uppercase">
              Cargando configurador 3D...
            </p>
          </div>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        className="w-full h-full"
      />
    </div>
  );
}