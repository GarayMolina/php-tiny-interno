// Configuración
const MAX_ANCHO = 1078;
const MAX_ALTO = 684;

// Variables globales
let editorActual = null;
let imagenSeleccionada = null;

// Funciones principales
function aplicarFormato(editorName, comando, valor = null) {
    const editor = document.getElementById('editor_' + editorName);
    if (!editor) return;

    editor.focus();
    document.execCommand(comando, false, valor);
    actualizarHiddenInput(editorName);
}

function insertarImagen(editorName) {
    editorActual = editorName;
    const fileInput = document.getElementById('fileInput_' + editorName);
    if (fileInput) fileInput.click();
}

function manejarImagen(event) {
    if (!editorActual) return;

    const file = event.target.files[0];
    if (!file || !file.type.match('image.*')) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            let ancho = this.width;
            let alto = this.height;

            // Redimensionar si es muy grande
            if (ancho > MAX_ANCHO) {
                alto = (alto * MAX_ANCHO) / ancho;
                ancho = MAX_ANCHO;
            }

            if (alto > MAX_ALTO) {
                ancho = (ancho * MAX_ALTO) / alto;
                alto = MAX_ALTO;
            }

            const imgHTML = '<img src="' + e.target.result + '" style="width: ' + ancho + 'px; height: ' + alto + 'px; max-width: 100%; border-radius: 4px; margin: 10px 0;" data-original-width="' + this.width + '" data-original-height="' + this.height + '">';

            aplicarFormato(editorActual, 'insertHTML', imgHTML);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function insertarEnlace(editorName) {
    const url = prompt('Ingresa la URL:', 'https://');
    if (url) aplicarFormato(editorName, 'createLink', url);
}

function cambiarColor(editorName) {
    const color = prompt('Color (ej: red, blue, #ff0000):', '#3498db');
    if (color) aplicarFormato(editorName, 'foreColor', color);
}

function actualizarHiddenInput(editorName) {
    const editor = document.getElementById('editor_' + editorName);
    const hiddenInput = document.getElementById('hidden_' + editorName);
    if (editor && hiddenInput) {
        hiddenInput.value = editor.innerHTML;
    }
}

// Funciones para redimensionar imágenes
function mostrarImageResizer(editorName, imgElement) {
    editorActual = editorName;
    imagenSeleccionada = imgElement;

    const overlay = document.getElementById('imageResizerOverlay') || crearImageResizerOverlay();
    overlay.style.display = 'flex';
    actualizarInfoTamaño();
}

function crearImageResizerOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'imageResizerOverlay';
    overlay.className = 'image-resizer-overlay';
    overlay.innerHTML = `
        <div class="image-resizer-controls">
            <h3>Redimensionar Imagen</h3>
            <p class="size-info" id="sizeInfo">Tamaño actual: 0 × 0 px</p>
            <p class="size-limit">Máximo permitido: ${MAX_ANCHO} × ${MAX_ALTO} px</p>
            
            <div class="resizer-buttons">
                <button class="btn-increase" onclick="redimensionarImagen(1.2)" id="btnIncrease">➕ Agrandar</button>
                <button class="btn-decrease" onclick="redimensionarImagen(0.8)">➖ Achicar</button>
            </div>
            
            <button class="btn-restore" onclick="restaurarTamanoOriginal()">🔄 Tamaño óptimo</button>
            
            <div style="margin-top: 20px;">
                <button class="btn-close" onclick="ocultarImageResizer()">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function ocultarImageResizer() {
    const overlay = document.getElementById('imageResizerOverlay');
    if (overlay) overlay.style.display = 'none';
    editorActual = null;
    imagenSeleccionada = null;
}

function redimensionarImagen(factor) {
    if (!imagenSeleccionada || !editorActual) return;

    const anchoActual = parseInt(imagenSeleccionada.style.width) || imagenSeleccionada.naturalWidth;
    const altoActual = parseInt(imagenSeleccionada.style.height) || imagenSeleccionada.naturalHeight;

    let nuevoAncho = anchoActual * factor;
    let nuevoAlto = altoActual * factor;

    // Aplicar límites
    if (nuevoAncho > MAX_ANCHO) {
        nuevoAncho = MAX_ANCHO;
        nuevoAlto = (altoActual * MAX_ANCHO) / anchoActual;
    }

    if (nuevoAlto > MAX_ALTO) {
        nuevoAlto = MAX_ALTO;
        nuevoAncho = (anchoActual * MAX_ALTO) / altoActual;
    }

    // Mínimo 50px
    nuevoAncho = Math.max(50, nuevoAncho);
    nuevoAlto = Math.max(50, nuevoAlto);

    imagenSeleccionada.style.width = nuevoAncho + 'px';
    imagenSeleccionada.style.height = nuevoAlto + 'px';

    actualizarInfoTamaño();
    actualizarHiddenInput(editorActual);

    // Deshabilitar botón si llega al máximo
    const btnIncrease = document.getElementById('btnIncrease');
    if (btnIncrease) {
        btnIncrease.disabled = nuevoAncho >= MAX_ANCHO || nuevoAlto >= MAX_ALTO;
    }
}

function restaurarTamanoOriginal() {
    if (!imagenSeleccionada || !editorActual) return;

    const anchoOriginal = parseInt(imagenSeleccionada.getAttribute('data-original-width')) || imagenSeleccionada.naturalWidth;
    const altoOriginal = parseInt(imagenSeleccionada.getAttribute('data-original-height')) || imagenSeleccionada.naturalHeight;

    let anchoFinal = anchoOriginal;
    let altoFinal = altoOriginal;

    if (anchoOriginal > MAX_ANCHO) {
        anchoFinal = MAX_ANCHO;
        altoFinal = (altoOriginal * MAX_ANCHO) / anchoOriginal;
    }

    if (altoFinal > MAX_ALTO) {
        altoFinal = MAX_ALTO;
        anchoFinal = (anchoOriginal * MAX_ALTO) / altoOriginal;
    }

    imagenSeleccionada.style.width = anchoFinal + 'px';
    imagenSeleccionada.style.height = altoFinal + 'px';

    actualizarInfoTamaño();
    actualizarHiddenInput(editorActual);
}

function actualizarInfoTamaño() {
    if (!imagenSeleccionada) return;

    const ancho = parseInt(imagenSeleccionada.style.width) || imagenSeleccionada.naturalWidth;
    const alto = parseInt(imagenSeleccionada.style.height) || imagenSeleccionada.naturalHeight;

    const sizeInfo = document.getElementById('sizeInfo');
    if (sizeInfo) {
        sizeInfo.textContent = `Tamaño actual: ${Math.round(ancho)} × ${Math.round(alto)} px`;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    // Configurar file inputs
    const fileInputs = document.querySelectorAll('input[type="file"][id^="fileInput_"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', manejarImagen);
    });

    // Configurar click en imágenes
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG' && e.target.closest('[class*="editor-content"]')) {
            e.preventDefault();
            const editorContainer = e.target.closest('[data-editor-instance]');
            if (editorContainer) {
                const editorName = editorContainer.getAttribute('data-editor-instance');
                mostrarImageResizer(editorName, e.target);
            }
        }
    });

    // Cerrar resizer al hacer click fuera
    document.addEventListener('click', function (e) {
        if (e.target.id === 'imageResizerOverlay') {
            ocultarImageResizer();
        }
    });
});

// API global para uso externo
window.TinyEditor = {
    getContent: function (editorName) {
        const editor = document.getElementById('editor_' + editorName);
        return editor ? editor.innerHTML : '';
    },

    setContent: function (editorName, content) {
        const editor = document.getElementById('editor_' + editorName);
        const hiddenInput = document.getElementById('hidden_' + editorName);
        if (editor) {
            editor.innerHTML = content;
            if (hiddenInput) hiddenInput.value = content;
        }
    }
};