✍️ PHP Tiny Editor WordEditor WYSIWYG tipo Word para PHP - Sin dependencias externas ni JavaScript externo.✨ Características PrincipalesEditor tipo Word (WYSIWYG): Proporciona una experiencia de edición "Lo que ves es lo que obtienes".🖼️ Inserción de Imágenes: Permite subir imágenes desde su dispositivo con redimensionamiento automático.Límite de Imagen: Máximo $1078 \times 684$ píxeles.🎨 Formato Completo: Incluye opciones básicas como Negrita, Cursiva, Subrayado, colores y alineación.📱 Responsive: Se adapta perfectamente a diferentes tamaños de pantalla.🔧 Cero Dependencias: No requiere JavaScript externo ni APIs.🎯 Fácil de Usar: Interfaz intuitiva similar a Microsoft Word.📦 InstalaciónUtilice Composer para agregar la librería a su proyecto:Bashcomposer require garaymolina/php-tiny-editor-word
💡 Uso Básico en PHPPara inicializar el editor, solo necesita incluir el autoload y crear una instancia de EditorWord.PHP<?php
require_once 'vendor/autoload.php';
use GarayMolina\TinyEditor\EditorWord;

// Parámetros: ID del campo, Contenido Inicial (HTML), Altura (en píxeles)
$editor = new EditorWord('contenido', '<h1>Mi Título</h1><p>Mi contenido aquí...</p>', 400);
echo $editor->render();
?>
📝 Uso en FormulariosPara integrar el editor en un formulario y capturar su contenido:PHP<form method="POST" action="procesar.php">
    <div class="mb-3">
        <label>Título:</label>
        <input type="text" name="titulo" class="form-control">
    </div>
    
    <div class="mb-3">
        <label>Contenido:</label>
        <?php
        $contenido = '<h1>Escribe tu artículo aquí</h1><p>Comienza a escribir...</p>';
        // 'contenido' es el nombre del campo que se enviará por POST
        $editor = new EditorWord('contenido', $contenido, 500);
        echo $editor->render();
        ?>
    </div>
    
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
🎨 PersonalizaciónAltura del EditorEl tercer parámetro del constructor define la altura en píxeles:PHP// Editor de 600px de alto
$editor = new EditorWord('contenido', '', 600);
Contenido Inicial con HTMLPuede precargar el editor con cualquier contenido HTML:PHP$contenidoInicial = '
<h1>Mi Artículo</h1>
<p>Este es el <strong>contenido inicial</strong> con formato.</p>
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
</ul>';

$editor = new EditorWord('articulo', $contenidoInicial, 400);
🛠️ Procesamiento del Formulario (procesar.php)El contenido del editor se recibe como un string HTML en la variable $_POST con el nombre que usted le haya asignado.PHP<?php
// procesar.php
require_once 'vendor/autoload.php';

if ($_POST) {
    $titulo = $_POST['titulo'] ?? '';
    // El contenido del editor ya es HTML
    $contenido = $_POST['contenido'] ?? '';
    
    // **********************************
    // !!! IMPORTANTE: SANITRIZAR ANTES DE GUARDAR EN DB Y MOSTRAR !!!
    // **********************************
    
    // Para mostrar el contenido guardado:
    echo "<h2>Artículo Guardado:</h2>";
    echo "<h3>Título: " . htmlspecialchars($titulo) . "</h3>";
    echo "<div class='contenido'>" . $contenido . "</div>";
}
?>

💻 API JavaScript (Opcional)Aunque el editor no requiere JavaScript externo, proporciona una pequeña API para interactuar con él si es necesario.AcciónAPI Clásica (DOM)API del EditorObtener Contenidodocument.getElementById('editor_contenido').innerHTMLconst contenido = TinyEditor.getContent('contenido');Establecer Contenidodocument.getElementById('editor_contenido').innerHTML = '<p>Nuevo contenido</p>';TinyEditor.setContent('contenido', '<h1>Nuevo Título</h1>');⚠️ Nota: Reemplace 'contenido' con el ID (primer parámetro) que le dio al crear la instancia de EditorWord.📋 Especificaciones TécnicasCaracterísticaDetalleLímite de Imagen$1078 \times 684$ píxelesFormatos SoportadosJPEG, PNG, GIF, WebPPHP Requerido$7.4$ o superiorNavegadoresChrome, Firefox, Safari, Edge🤝 Soporte y LicenciaPara reportar issues o solicitar características, visite nuestro repositorio GitHub.Este proyecto está bajo la Licencia MIT.