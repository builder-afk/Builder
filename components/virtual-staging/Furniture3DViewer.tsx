"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MaterialVariant } from "@/lib/data/virtualStagingData";
import { RotateCw, ZoomIn, ZoomOut, Sparkles } from "lucide-react";

interface Furniture3DViewerProps {
  modelType: "bed" | "table" | "painting" | "sofa" | "chair" | "lamp" | "rug" | "decor";
  activeVariant?: MaterialVariant;
  interactive?: boolean;
  trackCursor?: boolean;
  autoRotate?: boolean;
  height?: string | number;
  width?: string | number;
  className?: string;
  showControls?: boolean;
  lightingTheme?: "studio" | "warm" | "daylight" | "cyber";
}

export default function Furniture3DViewer({
  modelType,
  activeVariant,
  interactive = true,
  trackCursor = true,
  autoRotate = true,
  height = "100%",
  width = "100%",
  className = "",
  showControls = true,
  lightingTheme = "studio",
}: Furniture3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 0.6 });
  const currentRotationRef = useRef({ x: 0.2, y: 0.6 });
  const targetZoomRef = useRef(3.5);
  const currentZoomRef = useRef(3.5);

  const [isLoading, setIsLoading] = useState(true);

  // Helper to create procedural 3D furniture models
  const buildModel = (
    type: string,
    variant: MaterialVariant | undefined,
    scene: THREE.Scene
  ) => {
    const group = new THREE.Group();

    const color = variant?.colorHex ? new THREE.Color(variant.colorHex) : new THREE.Color("#d8cfc4");
    const roughness = variant?.roughness ?? 0.7;
    const metalness = variant?.metalness ?? 0.1;

    // Base material for the primary furniture piece
    const primaryMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      bumpScale: 0.05,
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3c2a21"),
      roughness: 0.6,
      metalness: 0.05,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"),
      roughness: 0.3,
      metalness: 0.85,
    });

    const whiteLinenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f8f6f0"),
      roughness: 0.9,
      metalness: 0.02,
    });

    const marbleMat = new THREE.MeshStandardMaterial({
      color: variant?.materialType === "marble" ? color : new THREE.Color("#f0ede6"),
      roughness: 0.2,
      metalness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });

    switch (type) {
      case "bed": {
        // Bed base / platform
        const baseGeo = new THREE.BoxGeometry(2.4, 0.3, 2.6);
        const base = new THREE.Mesh(baseGeo, darkWoodMat);
        base.position.y = 0.15;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // Mattress
        const matGeo = new THREE.BoxGeometry(2.2, 0.45, 2.4);
        const mattress = new THREE.Mesh(matGeo, primaryMat);
        mattress.position.y = 0.5;
        mattress.castShadow = true;
        mattress.receiveShadow = true;
        group.add(mattress);

        // Tufted / Fluted Headboard
        const headboardGeo = new THREE.BoxGeometry(2.6, 1.4, 0.25);
        const headboard = new THREE.Mesh(headboardGeo, primaryMat);
        headboard.position.set(0, 1.0, -1.2);
        headboard.castShadow = true;
        group.add(headboard);

        // Headboard vertical flutes / slats
        for (let i = -1.1; i <= 1.1; i += 0.25) {
          const fluteGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 16);
          const flute = new THREE.Mesh(fluteGeo, brassMat);
          flute.position.set(i, 1.0, -1.06);
          flute.castShadow = true;
          group.add(flute);
        }

        // Pillows (Back pair)
        const pillowBackGeo = new THREE.BoxGeometry(0.85, 0.22, 0.45);
        const pillowL1 = new THREE.Mesh(pillowBackGeo, whiteLinenMat);
        pillowL1.position.set(-0.55, 0.85, -0.85);
        pillowL1.rotation.x = -Math.PI / 8;
        pillowL1.castShadow = true;
        group.add(pillowL1);

        const pillowR1 = new THREE.Mesh(pillowBackGeo, whiteLinenMat);
        pillowR1.position.set(0.55, 0.85, -0.85);
        pillowR1.rotation.x = -Math.PI / 8;
        pillowR1.castShadow = true;
        group.add(pillowR1);

        // Pillows (Front accent pair)
        const pillowFrontGeo = new THREE.BoxGeometry(0.7, 0.2, 0.35);
        const pillowL2 = new THREE.Mesh(pillowFrontGeo, primaryMat);
        pillowL2.position.set(-0.55, 0.82, -0.55);
        pillowL2.rotation.x = -Math.PI / 7;
        pillowL2.castShadow = true;
        group.add(pillowL2);

        const pillowR2 = new THREE.Mesh(pillowFrontGeo, primaryMat);
        pillowR2.position.set(0.55, 0.82, -0.55);
        pillowR2.rotation.x = -Math.PI / 7;
        pillowR2.castShadow = true;
        group.add(pillowR2);

        // Folded Duvet / Blanket Throw
        const duvetGeo = new THREE.BoxGeometry(2.24, 0.12, 1.4);
        const duvet = new THREE.Mesh(duvetGeo, whiteLinenMat);
        duvet.position.set(0, 0.76, 0.55);
        duvet.castShadow = true;
        group.add(duvet);

        // Accent bed runner
        const runnerGeo = new THREE.BoxGeometry(2.26, 0.04, 0.5);
        const runner = new THREE.Mesh(runnerGeo, brassMat);
        runner.position.set(0, 0.83, 0.85);
        group.add(runner);

        targetZoomRef.current = 4.2;
        break;
      }

      case "table": {
        // Sculptural Round / Elliptical Coffee Table or Dining Table
        const topGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.1, 48);
        const topMesh = new THREE.Mesh(topGeo, marbleMat);
        topMesh.position.y = 0.85;
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        group.add(topMesh);

        // Fluted / Pedestal Column
        const baseColGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.8, 32);
        const baseCol = new THREE.Mesh(baseColGeo, primaryMat);
        baseCol.position.y = 0.4;
        baseCol.castShadow = true;
        group.add(baseCol);

        // Flutes around pedestal
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
          const flGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.78, 12);
          const fl = new THREE.Mesh(flGeo, brassMat);
          const r = 0.48;
          fl.position.set(Math.cos(a) * r, 0.4, Math.sin(a) * r);
          fl.castShadow = true;
          group.add(fl);
        }

        // Brass Floor Ring
        const ringGeo = new THREE.TorusGeometry(0.65, 0.04, 16, 48);
        const ring = new THREE.Mesh(ringGeo, brassMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.04;
        group.add(ring);

        // Minimalist ceramic vase on table
        const vaseGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.4, 24);
        const vase = new THREE.Mesh(vaseGeo, whiteLinenMat);
        vase.position.set(0.2, 1.1, -0.1);
        vase.castShadow = true;
        group.add(vase);

        // Botanical stem inside vase
        const stemGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8);
        const stem = new THREE.Mesh(stemGeo, darkWoodMat);
        stem.position.set(0.2, 1.45, -0.1);
        stem.rotation.z = -0.2;
        group.add(stem);

        targetZoomRef.current = 3.2;
        break;
      }

      case "painting": {
        // Museum-grade gallery Floater Frame
        const frameGeo = new THREE.BoxGeometry(2.4, 1.7, 0.12);
        const frame = new THREE.Mesh(frameGeo, brassMat);
        frame.castShadow = true;
        group.add(frame);

        // Inset Canvas
        const canvasGeo = new THREE.BoxGeometry(2.2, 1.5, 0.06);
        const canvasMat = new THREE.MeshStandardMaterial({
          color: color,
          roughness: 0.95,
          metalness: 0.05,
        });
        const canvas = new THREE.Mesh(canvasGeo, canvasMat);
        canvas.position.z = 0.04;
        group.add(canvas);

        // 3D Textured Relief Geometries on Canvas
        const relief1Geo = new THREE.TorusGeometry(0.45, 0.08, 16, 32);
        const relief1 = new THREE.Mesh(relief1Geo, whiteLinenMat);
        relief1.position.set(-0.4, 0.15, 0.08);
        relief1.castShadow = true;
        group.add(relief1);

        const relief2Geo = new THREE.BoxGeometry(0.7, 0.7, 0.06);
        const relief2 = new THREE.Mesh(relief2Geo, marbleMat);
        relief2.position.set(0.4, -0.2, 0.08);
        relief2.rotation.z = Math.PI / 6;
        relief2.castShadow = true;
        group.add(relief2);

        // Accent gold sphere element
        const sphereGeo = new THREE.SphereGeometry(0.12, 24, 24);
        const sphere = new THREE.Mesh(sphereGeo, brassMat);
        sphere.position.set(0.35, 0.35, 0.14);
        sphere.castShadow = true;
        group.add(sphere);

        targetZoomRef.current = 3.0;
        break;
      }

      case "sofa": {
        // Curved Bouclé Lounge Sectional Sofa
        const seatGeo = new THREE.BoxGeometry(2.6, 0.45, 1.4);
        const seat = new THREE.Mesh(seatGeo, primaryMat);
        seat.position.y = 0.4;
        seat.castShadow = true;
        seat.receiveShadow = true;
        group.add(seat);

        // Curved Backrest
        const backGeo = new THREE.BoxGeometry(2.6, 0.75, 0.4);
        const back = new THREE.Mesh(backGeo, primaryMat);
        back.position.set(0, 0.85, -0.5);
        back.castShadow = true;
        group.add(back);

        // Left Armrest
        const armLGeo = new THREE.BoxGeometry(0.35, 0.65, 1.4);
        const armL = new THREE.Mesh(armLGeo, primaryMat);
        armL.position.set(-1.35, 0.75, 0);
        armL.castShadow = true;
        group.add(armL);

        // Right Armrest
        const armRGeo = new THREE.BoxGeometry(0.35, 0.65, 1.4);
        const armR = new THREE.Mesh(armRGeo, primaryMat);
        armR.position.set(1.35, 0.75, 0);
        armR.castShadow = true;
        group.add(armR);

        // 4 Sleek tapered legs
        const legGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.25, 16);
        const positions = [
          [-1.3, 0.1, -0.55],
          [1.3, 0.1, -0.55],
          [-1.3, 0.1, 0.55],
          [1.3, 0.1, 0.55],
        ];
        positions.forEach(([x, y, z]) => {
          const leg = new THREE.Mesh(legGeo, brassMat);
          leg.position.set(x, y, z);
          group.add(leg);
        });

        // Throw Pillows
        const throwPillowGeo = new THREE.BoxGeometry(0.45, 0.45, 0.2);
        const throwP1 = new THREE.Mesh(throwPillowGeo, whiteLinenMat);
        throwP1.position.set(-0.9, 0.8, -0.2);
        throwP1.rotation.y = 0.3;
        throwP1.rotation.z = -0.15;
        throwP1.castShadow = true;
        group.add(throwP1);

        const throwP2 = new THREE.Mesh(throwPillowGeo, brassMat);
        throwP2.position.set(0.9, 0.8, -0.2);
        throwP2.rotation.y = -0.3;
        throwP2.rotation.z = 0.15;
        throwP2.castShadow = true;
        group.add(throwP2);

        targetZoomRef.current = 3.6;
        break;
      }

      case "chair": {
        // Swivel Lounge Armchair / Dining Chair
        const seatGeo = new THREE.CylinderGeometry(0.65, 0.6, 0.22, 32);
        const seat = new THREE.Mesh(seatGeo, primaryMat);
        seat.position.y = 0.55;
        seat.castShadow = true;
        group.add(seat);

        // Curved Ergonomic Back Shell
        const backCurveGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.7, 32, 1, true, 0, Math.PI);
        const backShell = new THREE.Mesh(backCurveGeo, primaryMat);
        backShell.position.set(0, 0.9, 0);
        backShell.rotation.y = Math.PI / 2;
        backShell.castShadow = true;
        group.add(backShell);

        // Central Swivel Column & 4-Star Base
        const centerColGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
        const col = new THREE.Mesh(centerColGeo, brassMat);
        col.position.y = 0.25;
        group.add(col);

        // Star legs
        for (let i = 0; i < 4; i++) {
          const legArmGeo = new THREE.BoxGeometry(0.04, 0.04, 0.55);
          const legArm = new THREE.Mesh(legArmGeo, brassMat);
          legArm.position.y = 0.05;
          legArm.rotation.y = (i * Math.PI) / 2;
          legArm.position.x = Math.sin((i * Math.PI) / 2) * 0.25;
          legArm.position.z = Math.cos((i * Math.PI) / 2) * 0.25;
          group.add(legArm);
        }

        targetZoomRef.current = 2.8;
        break;
      }

      case "lamp": {
        // Arched Floor Lamp
        const baseGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32);
        const base = new THREE.Mesh(baseGeo, marbleMat);
        base.position.y = 0.04;
        base.castShadow = true;
        group.add(base);

        // Vertical stem with arch
        const stemGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.8, 16);
        const stem = new THREE.Mesh(stemGeo, brassMat);
        stem.position.set(-0.25, 0.95, 0);
        stem.castShadow = true;
        group.add(stem);

        const archGeo = new THREE.TorusGeometry(0.65, 0.025, 16, 32, Math.PI / 1.5);
        const arch = new THREE.Mesh(archGeo, brassMat);
        arch.position.set(0.1, 1.8, 0);
        arch.rotation.z = -Math.PI / 3;
        group.add(arch);

        // Lampshade
        const shadeGeo = new THREE.ConeGeometry(0.32, 0.35, 32, 1, true);
        const shade = new THREE.Mesh(shadeGeo, brassMat);
        shade.position.set(0.65, 1.7, 0);
        shade.rotation.x = Math.PI;
        group.add(shade);

        // Glowing Bulb inside shade
        const bulbGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff3d0 });
        const bulb = new THREE.Mesh(bulbGeo, bulbMat);
        bulb.position.set(0.65, 1.62, 0);
        group.add(bulb);

        // Point Light source on bulb
        const lampLight = new THREE.PointLight(0xffecd0, 2, 4);
        lampLight.position.set(0.65, 1.55, 0);
        group.add(lampLight);

        targetZoomRef.current = 3.2;
        break;
      }

      default: {
        // Sculptural Object / Decor
        const objGeo = new THREE.DodecahedronGeometry(0.7, 1);
        const obj = new THREE.Mesh(objGeo, primaryMat);
        obj.position.y = 0.7;
        obj.castShadow = true;
        group.add(obj);

        const standGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.2, 32);
        const stand = new THREE.Mesh(standGeo, brassMat);
        stand.position.y = 0.1;
        group.add(stand);

        targetZoomRef.current = 2.8;
      }
    }

    // Floor shadow catcher plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(6, 6);
    const shadowPlaneMat = new THREE.ShadowMaterial({
      opacity: 0.25,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    group.add(shadowPlane);

    return group;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.5, 2.0, 3.5);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing & physical lighting
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear old children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting based on theme
    const ambientLight = new THREE.AmbientLight(
      lightingTheme === "warm" ? 0xfff1e0 : lightingTheme === "cyber" ? 0x90a0ff : 0xffffff,
      lightingTheme === "warm" ? 1.2 : 0.9
    );
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(
      lightingTheme === "warm" ? 0xffd4a3 : 0xffffff,
      2.5
    );
    mainSpot.position.set(4, 6, 4);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.6;
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    mainSpot.shadow.bias = -0.0001;
    scene.add(mainSpot);

    const fillLight = new THREE.DirectionalLight(0xfff5ea, 0.8);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 5. Build and attach model
    const modelGroup = buildModel(modelType, activeVariant, scene);
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    setIsLoading(false);

    // 6. Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Smooth interpolation for rotation
      if (modelGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          targetRotationRef.current.y += 0.004;
        }

        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

        modelGroupRef.current.rotation.x = currentRotationRef.current.x;
        modelGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Smooth zoom interpolation
      if (cameraRef.current) {
        currentZoomRef.current += (targetZoomRef.current - currentZoomRef.current) * 0.1;
        const dist = currentZoomRef.current;
        cameraRef.current.position.set(dist * 0.7, dist * 0.5, dist * 0.9);
        cameraRef.current.lookAt(0, 0.4, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [modelType, lightingTheme]);

  // Update model colors/materials when activeVariant changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }
    const newGroup = buildModel(modelType, activeVariant, sceneRef.current);
    sceneRef.current.add(newGroup);
    modelGroupRef.current = newGroup;
  }, [activeVariant]);

  // Mouse / Touch Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && interactive) {
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;
      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x = Math.max(
        -0.4,
        Math.min(0.8, targetRotationRef.current.x + deltaY * 0.01)
      );
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else if (trackCursor && !isDraggingRef.current) {
      // Subtle cursor tracking tilt
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationRef.current.y = 0.6 + mouseX * 0.8;
        targetRotationRef.current.x = 0.2 + mouseY * 0.4;
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    targetZoomRef.current = Math.max(2.0, Math.min(6.5, targetZoomRef.current + e.deltaY * 0.003));
  };

  const resetView = () => {
    targetRotationRef.current = { x: 0.2, y: 0.6 };
    targetZoomRef.current = 3.5;
  };

  const zoomIn = () => {
    targetZoomRef.current = Math.max(2.0, targetZoomRef.current - 0.6);
  };

  const zoomOut = () => {
    targetZoomRef.current = Math.min(6.5, targetZoomRef.current + 0.6);
  };

  return (
    <div
      className={`relative select-none overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs">
          <div className="w-8 h-8 rounded-full border-2 border-[#F26522] border-t-transparent animate-spin" />
        </div>
      )}

      {/* Floating 3D Interaction HUD Controls */}
      {showControls && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white z-10">
          <button
            onClick={resetView}
            title="Reset View"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={zoomIn}
            title="Zoom In"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={zoomOut}
            title="Zoom Out"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xs"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Real-time 3D badge */}
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
        <span className="w-2 h-2 rounded-full bg-[#10b981] -ml-3.5" />
        <span>Real-Time 3D Mesh</span>
      </div>
    </div>
  );
}
