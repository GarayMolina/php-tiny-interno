<?php

namespace FranciscoGaray\PhpTinyEditorWord;

class EditorWord
{
    private $name;
    private $value;
    private $height;

    public function __construct(string $name, string $value = '', int $height = 400)
    {
        $this->name = $name;
        $this->value = $value;
        $this->height = $height;
    }

    public function render(): string
    {
        $css = file_get_contents(__DIR__ . '/assets/editor-word.css');
        $js = file_get_contents(__DIR__ . '/assets/editor-word.js');

        return '
        <div class="editor-word-container" data-editor-instance="' . $this->name . '">
            <style>' . $css . '</style>
            
            <div class="editor-container">
                <div class="toolbar">
                    ' . $this->renderToolbar() . '
                </div>
                
                <div class="editor-area">
                    <div 
                        id="editor_' . $this->name . '" 
                        class="editor-content" 
                        contenteditable="true"
                        style="min-height: ' . $this->height . 'px;"
                    >' . $this->value . '</div>
                </div>
                
                <input type="hidden" name="' . $this->name . '" id="hidden_' . $this->name . '" value="' . htmlspecialchars($this->value) . '">
            </div>
            
            <script>' . $js . '</script>
        </div>';
    }

    private function renderToolbar(): string
    {
        return '
        <div class="tool-group">
            <select onchange="aplicarFormato(\'' . $this->name . '\', \'formatBlock\', this.value)">
                <option value="p">Normal</option>
                <option value="h1">Título 1</option>
                <option value="h2">Título 2</option>
                <option value="h3">Título 3</option>
            </select>

            <button type="button" title="Letras en negritas" onclick="aplicarFormato(\'' . $this->name . '\', \'bold\')">
                <strong>N</strong>
            </button>

            <button type="button" title="Formato Italic" onclick="aplicarFormato(\'' . $this->name . '\', \'italic\')">
                <em>K</em>
            </button>

            <button type="button" title="Formato underline" onclick="aplicarFormato(\'' . $this->name . '\', \'underline\')">
                <u>S</u>
            </button>

            <button type="button" title="Alinear izquierda" onclick="aplicarFormato(\'' . $this->name . '\', \'justifyLeft\')">⬅</button>
            <button type="button" title="Alinear centro" onclick="aplicarFormato(\'' . $this->name . '\', \'justifyCenter\')">⬌</button>
            <button type="button" title="Alinear derecha" onclick="aplicarFormato(\'' . $this->name . '\', \'justifyRight\')">➡</button>

            <button type="button" title="Lista con puntos" onclick="aplicarFormato(\'' . $this->name . '\', \'insertUnorderedList\')">• Lista</button>
            <button type="button" title="Lista numerada" onclick="aplicarFormato(\'' . $this->name . '\', \'insertOrderedList\')">1. Lista</button>

            <button type="button" title="Insertar enlace" onclick="insertarEnlace(\'' . $this->name . '\')">🔗</button>
            <button type="button" title="Insertar imagen" onclick="insertarImagen(\'' . $this->name . '\')">🖼️</button>

            <input type="file" id="fileInput_' . $this->name . '" accept="image/*" style="display: none;">

            <button type="button" title="Color de texto" onclick="cambiarColor(\'' . $this->name . '\')">🎨</button>
            <button type="button" title="Quitar formato" onclick="aplicarFormato(\'' . $this->name . '\', \'removeFormat\')">🧹</button>
        </div>';
    }
}
