# Montecarlo Sierra de las Quijadas

Simulador de Montecarlo del plan de negocios Volterra para la concesión en el Parque Nacional Sierra de las Quijadas (San Luis). Simula miles de trayectorias de visitantes y en cada una recalcula el plan completo: ingresos, OPEX, canon escalonado, CMAA, impuestos, D&A e inversiones. Calcula el VAN, la TIR, el VAN del Parque Nacional y la **inversión total en el año 1 que iguala la TIR al WACC**.

Es una app web instalable (PWA): se usa desde el navegador, se instala en el celular como cualquier app y, después de la primera visita, funciona sin conexión.

App publicada: `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`

## Publicarla en GitHub Pages

1. En GitHub, creá un repositorio **público** (por ejemplo `montecarlo-sierra-quijadas`) sin README.
2. Subí los archivos de esta carpeta a la raíz del repositorio, de una de estas dos formas:
   - **Desde el navegador:** en el repositorio, «Add file» → «Upload files». Arrastrá todo el contenido de la carpeta, incluida la carpeta `icons`, y confirmá con «Commit changes».
   - **Con git:**
     ```bash
     cd montecarlo-sierra-quijadas
     git init
     git add .
     git commit -m "Simulador Montecarlo Sierra de las Quijadas"
     git branch -M main
     git remote add origin https://github.com/<tu-usuario>/montecarlo-sierra-quijadas.git
     git push -u origin main
     ```
3. En el repositorio, «Settings» → «Pages». En «Build and deployment», elegí «Deploy from a branch», rama `main` y carpeta `/ (root)`, y guardá.
4. En uno o dos minutos la app queda en `https://<tu-usuario>.github.io/montecarlo-sierra-quijadas/`.

## Instalarla en el celular

- **Android (Chrome):** abrí el link, tocá el menú ⋮ y elegí «Instalar app» o «Agregar a la pantalla principal».
- **iPhone o iPad (Safari):** abrí el link, tocá «Compartir» y elegí «Agregar a pantalla de inicio».

La app se abre a pantalla completa. Después de la primera visita funciona sin conexión. Las tipografías se guardan la primera vez que se cargan; si no hay conexión, se usan las del sistema.

En el celular arranca con 1.000 escenarios para responder rápido. Se puede subir a 5.000 o más desde el panel.

## Actualizarla

1. Reemplazá `index.html` (u otro archivo) en el repositorio.
2. En `sw.js`, cambiá `VERSION` (por ejemplo, `v2-2026-11-05`). Así los celulares descartan la copia guardada y descargan la versión nueva la próxima vez que abren la app con conexión.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El simulador completo: motor de cálculo, controles y gráficos. No usa librerías externas. |
| `manifest.webmanifest` | Nombre, colores e íconos para instalar la app. |
| `sw.js` | Service worker: guarda la app para usarla sin conexión. |
| `icons/` | Íconos de la app (192, 512, adaptable para Android y Apple). |
| `.nojekyll` | Indica a GitHub Pages que publique los archivos tal cual. |

## Supuestos principales (planilla «Infraestructura revisada», 22/10/2026)

- **Visitas:** tendencia por tramos de crecimiento (20%, 7%, 3%, 2% y 1%) × cumplimiento del ramp-up (triangular 40%–100%–130%) × ruido anual lognormal AR(1) (σ 20%, ρ 0,15) × años de colapso (probabilidad 10%, caída 60–90%). Está calibrado con las visitas reales 2003–2025. También se puede usar la serie de visitas de la hoja KPI.
- **Ingresos:** experiencia ($32.000, 50% de uso, 50% subsidiado con 50% de descuento), estacionamiento (25% del precio por vehículo, 4 ocupantes), comisión sobre accesos (50% hasta 75.000 visitas acumuladas y después baja 10 pp por cada 75.000), gastronomía ($37.500, 30% de uso) y boutique ($1.500 por visitante).
- **Canon:** 6%, luego 8% y después 10% de los ingresos netos de IVA, según las visitas acumuladas. Antes rige el CMAA ($18 M por año, como máximo 3 años).
- **Impuestos:** IIBB 4,2%, IVA según la planilla y Ganancias 35% con un año de rezago. La D&A amortiza el 80% de cada inversión en los años que quedan de concesión.
- **Inversiones:**
  - «Equilibrio t1» (opción por defecto): filas 11 a 15 vacías y un único monto en el año 1 que deja el VAN en cero al WACC (18%).
  - «Filas 11–15»: el CAPEX anterior de la planilla.
  - «Alternativo»: la infraestructura revisada.

### Verificación contra la planilla (visitas de KPI, sin aleatoriedad, 20 años)

| Inversiones | VAN Volterra | TIR | VAN Parque Nacional |
|---|---|---|---|
| Equilibrio t1: $1.383,2 M | $0 | 18,00% | $1.477 M |
| Filas 11–15 anteriores | $91,4 M | 21,13% | $1.046 M |

El botón «Replicar Excel» reproduce estos valores.

> Repositorio público: cualquiera puede ver la app y los supuestos del plan.
