# Super Mario Realista VR - Meta Quest (WebXR)

Juego 3D completo e inmersivo en primera persona desarrollado con **Three.js** y **WebXR**, optimizado para el navegador **Meta Quest Browser (Meta Quest 3 / 3S / 2 / Pro)**.

![WebXR](https://img.shields.io/badge/WebXR-Meta%20Quest%203%2F3S-brightgreen)
![Three.js](https://img.shields.io/badge/Three.js-r160-blue)
![PBR](https://img.shields.io/badge/Graphics-PBR%20Procedural-orange)

---

## 🌟 Características Principales

1. **Arquitectura XRRig / Dolly a Prueba de Fallos:**
   - La cámara y los controladores se encuentran anidados dentro de un grupo `cameraRig`.
   - La locomoción continua, gravedad y saltos se aplican **exclusivamente sobre `cameraRig.position`**, protegiendo el tracking local 6DoF que el runtime de Meta asigna a la cámara.

2. **Lectura Robusta de Mandos Meta Quest Touch:**
   - **Mando Izquierdo:** Locomoción continua proyectada en el plano XZ relativa a la orientación de la cabeza (`camera.getWorldDirection`) con zona muerta configurable (`deadzone = 0.15`).
   - **Mando Derecho:** **Snap Turn** (giro angular instantáneo de 45° con debounce para prevenir cinetosis) y botón de salto unificado (Botón A, Gatillo o Grip).

3. **Mecánicas Clásicas de Mario en 3D:**
   - **Bloques Interrogante (`?`):** Golpeables desde abajo con la cabeza o directamente con los guantes 6DoF. Desprenden monedas doradas con animación física y vibración háptica.
   - **Goombas:** Patrullan el escenario con animación de marcha. Aplastables al caer sobre ellos (*Stomp* con rebote vertical); infligen daño por contacto lateral.
   - **Tuberías y Plantas Piraña:** Tuberías sólidas transitables y plantas piraña carnívoras animadas con dientes que muerden al jugador si se acerca.
   - **Mástil y Fortaleza Final:** Al alcanzar la meta, la bandera desciende, la estrella gira y se dispara la fanfarria de victoria.

4. **Gráficos PBR y Texturas Procedurales (Canvas API):**
   - Sin dependencias de imágenes externas ni riesgo de enlaces caídos. Todas las texturas (ladrillo rústico, bloque interrogación dorado, tuberías de hierro con óxido, pieles de enemigos y mampostería) se generan procedimentalmente en memoria.
   - Iluminación PBR con sombras dinámicas suaves (`PCFSoftShadowMap`), luz hemisférica y niebla atmosférica.
   - Modelos 3D de **Guantes Blancos de Fontanero** anclados a cada mando con tracking 6DoF.

5. **Audio Sintetizado Procedural (Web Audio API):**
   - Efectos sonoros nativos en tiempo real: salto, monedas, golpe a bloques, aplastamiento de Goomba, daño al jugador, mordisco y victoria.

6. **HUD Holográfico Dual:**
   - Reloj/pantalla holográfica 3D montada en la muñeca izquierda del guante (vidas, monedas, distancia a la meta).
   - HUD 2D para visualización en monitor o modo de escritorio.

---

## 🎮 Controles

### En Visor Meta Quest (VR 6DoF)
| Mando | Entrada | Acción |
|---|---|---|
| **Izquierdo** | Joystick analógico | Locomoción continua (XZ hacia donde miras) |
| **Derecho** | Joystick analógico (Horizontal) | Snap Turn (Giro rápido 45°) |
| **Derecho / Cualquiera** | Botón A / Gatillo / Grip | Salto |
| **Ambos** | Movimiento físico 6DoF | Golpear bloques '?' o empujar |

### En PC / Escritorio (Modo 2D)
| Tecla / Dispositivo | Acción |
|---|---|
| **W, A, S, D** | Movimiento en 4 direcciones |
| **Ratón** | Mirar alrededor (Pointer Lock activado) |
| **Barra Espaciadora** | Saltar |

---

## 🚀 Cómo Ejecutar

### Opción 1: Servidor Local
Ejecuta un servidor web local en la carpeta del proyecto:
```bash
python -m http.server 8080
```
o con Node.js:
```bash
npx serve .
```

### Opción 2: Meta Quest Browser
WebXR requiere un contexto seguro (`localhost` o `https://`):
1. **Con cable/ADB:** Reenvía el puerto ejecutando:
   ```bash
   adb reverse tcp:8080 tcp:8080
   ```
   Abre `http://localhost:8080` en el Meta Quest Browser.
2. **Vía GitHub Pages:** Al alojar este repositorio con GitHub Pages, obtendrás una URL HTTPS directa accesible desde el visor sin cables.
