/** @jsxImportSource react */
import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

interface UnityViewerProps {
  userGuid: string;
  itemGuid: string;
}

export default function UnityViewer({ userGuid, itemGuid }: UnityViewerProps) {
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "/unity/Build/WEBGL.loader.js",
    dataUrl: "/unity/Build/WEBGL.data.br",
    frameworkUrl: "/unity/Build/WEBGL.framework.js.br",
    codeUrl: "/unity/Build/WEBGL.wasm.br",
  });

  useEffect(() => {
    function onAddToCart(itemId: string) {
      window.dispatchEvent(
        new CustomEvent("wearlab:addToCart", { detail: { itemId } }),
      );
    }
    addEventListener("OnAddToCart", onAddToCart);
    return () => removeEventListener("OnAddToCart", onAddToCart);
  }, [addEventListener, removeEventListener]);

  return (
    <div
      className="relative w-full bg-black"
      style={{ height: "calc(100vh - 144px)" }}
    >
      <Unity
        unityProvider={unityProvider}
        matchWebGLToCanvasSize={true}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {loadingProgression < 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="text-white font-serif italic text-2xl mb-2">
              Wear<span className="text-red-700 not-italic">Lab</span>
            </div>
            <p className="text-neutral-500 text-xs tracking-widest uppercase">
              Cargando configurador 3D...
            </p>
            <div className="mt-4 w-48 h-0.5 bg-neutral-800 mx-auto rounded">
              <div
                className="h-full bg-red-700 rounded transition-all duration-300"
                style={{ width: `${Math.round(loadingProgression * 100)}%` }}
              />
            </div>
            <p className="text-neutral-700 text-xs mt-2">
              {Math.round(loadingProgression * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
