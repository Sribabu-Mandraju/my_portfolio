"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeJSText() {
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Get the container element
    const container = mountRef.current;
    if (!container) return;

    // Scene setup - dark background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup - perspective camera for 3D view
    const camera = new THREE.PerspectiveCamera(
      50, // Field of view (reduced for better view)
      container.clientWidth / container.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(0, 0, 40); // Closer to see better

    // Renderer setup - WebGL renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting setup - bright lights for metallic shine effect
    // Ambient light - minimal for contrast
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Bright directional light from the front-right
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    // Bright directional light from the front-left
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight2.position.set(-10, 10, 10);
    scene.add(directionalLight2);

    // Directional light from the back for rim lighting
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight3.position.set(-5, -5, -5);
    scene.add(directionalLight3);

    // Bright point light for strong highlights
    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    // Additional point light for more shine
    const pointLight2 = new THREE.PointLight(0xffffff, 1.0);
    pointLight2.position.set(-15, 15, 15);
    scene.add(pointLight2);

    // Spot light for focused shine
    const spotLight = new THREE.SpotLight(0xffffff, 2.0);
    spotLight.position.set(0, 20, 20);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Text to display
    const text = "ᴀᴠɢ ꜱᴘɪᴅᴇʏ࿐";

    // Create canvas to render text with proper Unicode support
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas size - larger for better quality
    canvas.width = 2048;
    canvas.height = 512;

    // Clear canvas with transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set text style - much larger font with bright white
    context.fillStyle = "#ffffff";
    context.font = "bold 200px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Add bright white stroke for better visibility
    context.strokeStyle = "#ffffff";
    context.lineWidth = 6;

    // Draw text on canvas (this properly handles Unicode characters)
    context.strokeText(text, canvas.width / 2, canvas.height / 2);
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Calculate text dimensions (approximate)
    const textWidth = 50; // Increased width
    const textHeight = 12; // Increased height
    const depth = 3; // Increased depth for more 3D effect
    const layerCount = 30; // More layers for smoother extrusion

    // Create a group to hold all layers
    const textGroup = new THREE.Group();

    // Create extruded layers
    for (let i = 0; i < layerCount; i++) {
      const layerGeometry = new THREE.PlaneGeometry(textWidth, textHeight);
      const layerMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: i === 0 ? 1 : 0.9, // Front layer fully opaque
        color: 0xaaaaaa, // Lighter gray for better visibility
        metalness: 0.95, // High metalness for metallic look
        roughness: 0.05, // Very low roughness for shiny surface
        emissive: 0x111111, // Slight emission for visibility
      });

      const layer = new THREE.Mesh(layerGeometry, layerMaterial);
      layer.position.z = -(i * (depth / layerCount)); // Stack layers back
      textGroup.add(layer);
    }

    // Add side panels for depth with metallic material
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x111111,
    });

    // Left side
    const leftSide = new THREE.Mesh(
      new THREE.PlaneGeometry(textHeight, depth),
      sideMaterial
    );
    leftSide.rotation.y = Math.PI / 2;
    leftSide.position.set(-textWidth / 2, 0, -depth / 2);
    textGroup.add(leftSide);

    // Right side
    const rightSide = new THREE.Mesh(
      new THREE.PlaneGeometry(textHeight, depth),
      sideMaterial
    );
    rightSide.rotation.y = -Math.PI / 2;
    rightSide.position.set(textWidth / 2, 0, -depth / 2);
    textGroup.add(rightSide);

    // Top side
    const topSide = new THREE.Mesh(
      new THREE.PlaneGeometry(textWidth, depth),
      sideMaterial
    );
    topSide.rotation.x = Math.PI / 2;
    topSide.position.set(0, textHeight / 2, -depth / 2);
    textGroup.add(topSide);

    // Bottom side
    const bottomSide = new THREE.Mesh(
      new THREE.PlaneGeometry(textWidth, depth),
      sideMaterial
    );
    bottomSide.rotation.x = -Math.PI / 2;
    bottomSide.position.set(0, -textHeight / 2, -depth / 2);
    textGroup.add(bottomSide);

    // Center the group
    textGroup.position.set(0, 0, 0);
    scene.add(textGroup);

    // Mouse interaction handlers
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (event) => {
      isMouseDown = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      container.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      isMouseDown = false;
      container.style.cursor = "grab";
    };

    const onMouseMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      // Update target rotation based on mouse movement
      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x += deltaY * 0.01;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const onMouseWheel = (event) => {
      event.preventDefault();
      // Zoom in/out with mouse wheel
      camera.position.z += event.deltaY * 0.05;
      camera.position.z = Math.max(20, Math.min(100, camera.position.z)); // Limit zoom
    };

    // Add event listeners for mouse interaction
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("wheel", onMouseWheel);
    container.style.cursor = "grab";

    // Animation loop - smooth rotation with mouse interaction
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Smooth interpolation towards target rotation
      textGroup.rotation.y +=
        (targetRotationRef.current.y - textGroup.rotation.y) * 0.1;
      textGroup.rotation.x +=
        (targetRotationRef.current.x - textGroup.rotation.x) * 0.1;

      // Add subtle automatic rotation if not being dragged
      if (!isMouseDown) {
        targetRotationRef.current.y += 0.005; // Subtle Y-axis rotation
        targetRotationRef.current.x += 0.002; // Subtle X-axis rotation
      }

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("wheel", onMouseWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      texture.dispose();
      // Dispose of all geometries and materials in the group
      textGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          } else if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ background: "#000000" }}
    />
  );
}
