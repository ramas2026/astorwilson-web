/* Suite Astor Wilson · presentación pública de herramientas.
   Sin dependencias, descargas ni servicios externos. */
(function () {
  "use strict";

  const base = "assets/img/apps/";
  const catalog = {
    principales: [
      {id:"iris",name:"IRIS",topic:"FUENTES ABIERTAS",description:"Permite relevar fuentes abiertas, registrar capturas y conservar sus datos de origen. Organiza la documentación por proyecto y facilita la elaboración de informes de lo relevado."},
      {id:"traza",name:"TRAZA",topic:"UBICACIONES",description:"Analiza registros de ubicación obtenidos de dispositivos móviles y los ordena en el tiempo. Permite representar los movimientos, recorridos y puntos de interés sobre mapas."},
      {id:"cavi",name:"CAVI",topic:"CONVERSACIONES",description:"Transforma conversaciones extraídas de dispositivos en informes claros y ordenados. Facilita seleccionar mensajes, identificar participantes y presentar intercambios relevantes."},
      {id:"vera",name:"VERA",topic:"LECTURA Y EXPLORACIÓN",description:"Permite explorar conversaciones y sus archivos adjuntos con una presentación similar a una aplicación de mensajería. Incluye filtros para localizar fechas, participantes y mensajes."},
      {id:"lara",name:"LARA",topic:"CRONOLOGÍAS",description:"Organiza cronológicamente la actividad registrada en dispositivos móviles y sus archivos asociados. Ayuda a reconstruir secuencias de eventos y preparar informes de consulta."},
      {id:"sirilo",name:"SIRILO",topic:"ARCHIVOS E INFORMES",description:"Facilita incorporar archivos adjuntos a los informes y verificar su integridad. Permite documentar la vinculación entre los archivos originales y el material presentado."},
      {id:"audia",name:"AUDIA + VEDIA",topic:"AUDIO Y ENTREVISTAS",description:"Transcribe archivos de audio, distingue intervenciones de distintos hablantes y permite revisar las transcripciones. Incluye herramientas específicas para entrevistas y trabaja con procesamiento local."},
      {id:"fico",name:"FICO",topic:"COMUNICACIONES",description:"Permite filtrar y organizar registros de comunicaciones para concentrarse en la información relevante. Facilita la revisión y el análisis de grandes conjuntos de datos."},
      {id:"cintia",name:"CintIA",topic:"PREVISUALIZACIONES",description:"Permite documentar la previsualización manual de teléfonos celulares mediante fotografías tomadas directamente de sus pantallas. Facilita organizar, recortar y anotar las imágenes para elaborar informes ilustrados, creando botones que incorporan audios, ya sea desde archivos o mediante grabación sobre grabación."},
      {id:"cata",name:"CATA",topic:"ARCHIVOS",description:"Interpreta y transforma archivos de datos mediante plantillas para obtener información ordenada y utilizable. También permite aplicar una misma plantilla a varios archivos de un lote."}
    ],
    auxiliares: [
      {id:"alba",name:"ALBA",topic:"RECONOCIMIENTO DE TEXTO",description:"Reconoce texto en imágenes y documentos escaneados mediante OCR. Permite generar documentos PDF en los que el contenido textual puede buscarse y seleccionarse."},
      {id:"folia",name:"FOLIA",topic:"DOCUMENTOS PDF",description:"Permite unir, dividir, reordenar, rotar y numerar páginas de archivos PDF. También permite adjuntar archivos dentro de un PDF y crear botones o vínculos para abrir esos adjuntos."},
      {id:"livia",name:"LIVIA",topic:"DOCUMENTOS PDF",description:"Reduce el tamaño de archivos PDF mediante distintas opciones de compresión. Ayuda a preparar documentos más livianos para conservarlos y compartirlos internamente."},
      {id:"medita",name:"MEDITA",topic:"METADATOS",description:"Extrae y organiza metadatos de archivos digitales, como información de fechas, formatos y propiedades del contenido. Facilita su consulta en tareas de análisis documental."},
      {id:"huella",name:"HUELLA",topic:"INTEGRIDAD",description:"Calcula y compara huellas digitales de archivos para comprobar si su contenido se mantiene intacto. Facilita documentar controles de integridad."},
      {id:"gala",name:"GALA",topic:"ARCHIVOS ADJUNTOS",description:"Facilita revisar los archivos adjuntos incorporados en informes y controlar su correspondencia e integridad. Ayuda a identificar de manera ordenada el material asociado."},
      {id:"medita-lite",name:"MEDITA LITE",topic:"METADATOS",description:"Versión liviana de MEDITA para consultar y extraer metadatos de archivos en tareas puntuales, con un flujo de trabajo más simple."},
      {id:"huella-lite",name:"HUELLA LITE",topic:"INTEGRIDAD",description:"Versión liviana de HUELLA para calcular y verificar hashes de archivos de forma rápida, sin utilizar el conjunto completo de funciones."},
      {id:"puerta",name:"PUERTA",topic:"RELEVAMIENTO PORTÁTIL",description:"Herramienta portátil destinada al relevamiento técnico de computadoras en el lugar del procedimiento. Permite documentar y recolectar información digital directamente del equipo examinado, sin necesidad de instalarla.",status:"Portátil"}
    ],
    proyectos: [
      {id:"orbe",name:"ORBE",topic:"CARTOGRAFÍA",description:"Proyecto de trabajo cartográfico para reunir puntos, recorridos y otras referencias geográficas de una investigación en un mapa organizado.",status:"En desarrollo"},
      {id:"maite",name:"MAITE",topic:"GESTIÓN DE INVESTIGACIONES",description:"Proyecto para administrar investigaciones, tareas, informes y expedientes en un mismo espacio de trabajo. Busca facilitar el seguimiento de cada causa.",status:"En desarrollo"},
      {id:"nexo",name:"NEXO",topic:"COMUNICACIONES Y ANTENAS",description:"Herramienta en desarrollo para reunir y analizar registros de comunicaciones, objetivos y antenas celulares. Su módulo inicial permite organizar y explorar esa información.",status:"Beta"}
    ]
  };

  const root = document.getElementById("appsExplorer");
  if (!root) return;

  const strip = document.getElementById("appsStrip");
  const largeLogo = document.getElementById("appsLargeLogo");
  const name = document.getElementById("appsName");
  const description = document.getElementById("appsDescription");
  const kicker = document.getElementById("appsKicker");
  const status = document.getElementById("appsStatus");
  const counter = document.getElementById("appsCounter");
  const stage = document.getElementById("appsContent");
  const tabs = Array.from(root.querySelectorAll(".apps-tab"));
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let group = "principales";
  let index = 0;

  function scrollToSelected() {
    const selected = strip.querySelector(".apps-logo-button.is-active");
    if (!selected) return;
    const stripBox = strip.getBoundingClientRect();
    const buttonBox = selected.getBoundingClientRect();
    const left = strip.scrollLeft + buttonBox.left - stripBox.left - (stripBox.width - buttonBox.width) / 2;
    strip.scrollTo({left: Math.max(0,left), behavior: reduceMotion ? "instant" : "smooth"});
  }

  function select(indexNext, animate) {
    const items = catalog[group];
    index = (indexNext + items.length) % items.length;
    const item = items[index];
    largeLogo.src = base + item.id + ".png";
    largeLogo.alt = "";
    name.textContent = item.name;
    description.textContent = item.description;
    kicker.textContent = item.topic;
    counter.textContent = String(index + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    status.hidden = !item.status;
    status.textContent = item.status || "";
    status.dataset.status = item.status === "Beta" ? "beta" : (item.status === "Portátil" ? "portatil" : "desarrollo");

    strip.querySelectorAll(".apps-logo-button").forEach(function (button, i) {
      const active = i === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    scrollToSelected();

    if (animate && !reduceMotion && stage.animate) {
      stage.animate(
        [{opacity: 0.78, transform: "translateY(5px)"}, {opacity: 1, transform: "translateY(0)"}],
        {duration: 250, easing: "ease-out"}
      );
    }
  }

  function setGroup(nextGroup) {
    if (!catalog[nextGroup]) return;
    group = nextGroup;
    index = 0;
    tabs.forEach(function (tab) {
      const active = tab.dataset.appGroup === nextGroup;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    const fragment = document.createDocumentFragment();
    catalog[group].forEach(function (item, i) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "apps-logo-button";
      button.dataset.appId = item.id;
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Ver " + item.name);
      button.innerHTML = '<img src="' + base + item.id + '.png" width="56" height="56" alt="" loading="lazy"><span></span>';
      button.querySelector("span").textContent = item.name;
      button.addEventListener("click", function () { select(i, true); });
      fragment.appendChild(button);
    });
    strip.replaceChildren(fragment);
    strip.scrollLeft = 0;
    select(0, false);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { setGroup(tab.dataset.appGroup); });
  });
  document.getElementById("appsPrev").addEventListener("click", function () { select(index - 1, true); });
  document.getElementById("appsNext").addEventListener("click", function () { select(index + 1, true); });
  strip.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const focused = event.target.closest(".apps-logo-button");
    const focusedIndex = focused ? Array.prototype.indexOf.call(strip.children, focused) : index;
    select((focusedIndex >= 0 ? focusedIndex : index) + (event.key === "ArrowRight" ? 1 : -1), true);
    const active = strip.querySelector(".apps-logo-button.is-active");
    if (active) active.focus({preventScroll: true});
  });
  setGroup(group);
})();
