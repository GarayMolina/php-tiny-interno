# PHP Tiny Editor Word

Editor WYSIWYG tipo Word para PHP - Sin dependencias externas ni JavaScript externo.

## ✨ Características

- ✍️ **Editor tipo Word** - WYSIWYG (What You See Is What You Get)
- 🖼️ **Insertar imágenes** - Desde tu dispositivo con redimensionamiento automático
- 🎨 **Formato completo** - Negrita, cursiva, subrayado, colores, alineación
- 📏 **Límites de imagen** - Máximo 1078 × 684 px
- 📱 **Responsive** - Se adapta a diferentes tamaños de pantalla
- 🔧 **Sin dependencias** - No requiere JavaScript externo ni APIs
- 🎯 **Fácil de usar** - Interface intuitiva tipo Microsoft Word

## 📦 Instalación

```bash
composer require garaymolina/php-tiny-editor-word

💡 Uso Básico
php
<?php
require_once 'vendor/autoload.php';
use GarayMolina\TinyEditor\EditorWord;

// Crear editor básico
$editor = new EditorWord('contenido', '<h1>Mi Título</h1><p>Mi contenido aquí...</p>', 400);
echo $editor->render();
?>
📝 Uso en Formularios
php
<form method="POST" action="procesar.php">
    <div class="mb-3">
        <label>Título:</label>
        <input type="text" name="titulo" class="form-control">
    </div>
    
    <div class="mb-3">
        <label>Contenido:</label>
        <?php
        $contenido = '<h1>Escribe tu artículo aquí</h1><p>Comienza a escribir...</p>';
        $editor = new EditorWord('contenido', $contenido, 500);
        echo $editor->render();
        ?>
    </div>
    
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
🎨 Personalización
Altura del Editor
php
// Editor de 600px de alto
$editor = new EditorWord('contenido', '', 600);
Contenido Inicial con HTML
php
$contenidoInicial = '
<h1>Mi Artículo</h1>
<p>Este es el <strong>contenido inicial</strong> con formato.</p>
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
</ul>';

$editor = new EditorWord('articulo', $contenidoInicial, 400);
🔧 Procesamiento del Formulario
php
<?php
// procesar.php
require_once 'vendor/autoload.php';

if ($_POST) {
    $titulo = $_POST['titulo'] ?? '';
    $contenido = $_POST['contenido'] ?? '';
    
    // Guardar en base de datos
    // $db->insert('articulos', [
    //     'titulo' => $titulo,
    //     'contenido' => $contenido
    // ]);
    
    echo "<h2>Artículo Guardado:</h2>";
    echo "<h3>Título: " . htmlspecialchars($titulo) . "</h3>";
    echo "<div class='contenido'>" . $contenido . "</div>";
}
?>
🛠️ API JavaScript
Obtener Contenido
javascript
const contenido = document.getElementById('editor_contenido').innerHTML;
Establecer Contenido
javascript
document.getElementById('editor_contenido').innerHTML = '<p>Nuevo contenido</p>';
Usar la API del Editor
javascript
// Obtener contenido
const contenido = TinyEditor.getContent('contenido');

// Establecer contenido
TinyEditor.setContent('contenido', '<h1>Nuevo Título</h1>');
📋 Especificaciones Técnicas
Límite de imágenes: 1078 × 684 píxeles

Formatos soportados: JPEG, PNG, GIF, WebP

Navegadores compatibles: Chrome, Firefox, Safari, Edge

PHP requerido: 7.4 o superior

🤝 Soporte
Para reportar issues o solicitar características, visita nuestro repositorio GitHub.

📄 Licencia
Este proyecto está bajo la Licencia MIT.