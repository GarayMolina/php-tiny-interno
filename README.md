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
```

## Como usar

```php
<?php
require_once 'vendor/autoload.php';
use GarayMolina\TinyEditor\EditorWord;

// Create editor with initial content
$editor = new EditorWord('content', '<h1>My Title</h1><p>My content here...</p>', 400);

// Render the editor
echo $editor->render();
?>
```

## Formulario Ejemplo implementación

```php
<?php
require_once 'vendor/autoload.php';
use GarayMolina\TinyEditor\EditorWord;
?>

<form method="POST" action="procesar.php">
    <div class="mb-3">
        <label class="form-label">Título:</label>
        <input type="text" name="titulo" class="form-control" placeholder="Ingresa el título">
    </div>
    
    <div class="mb-3">
        <label class="form-label">Contenido:</label>
        <?php
        $editor = new EditorWord('contenido', '', 500);
        echo $editor->render();
        ?>
    </div>
    
    <button type="submit" class="btn btn-primary">Guardar Artículo</button>
</form>
```

## Procesar el Formulario

```php
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
    
    echo "<h2>Artículo Guardado Exitosamente</h2>";
    echo "<h3>Título: " . htmlspecialchars($titulo) . "</h3>";
    echo "<div class='contenido-articulo'>" . $contenido . "</div>";
}
?>
```

## Uso con contenido existente

```php
<?php
require_once 'vendor/autoload.php';
use GarayMolina\TinyEditor\EditorWord;

// Contenido desde base de datos
$articulo = [
    'titulo' => 'Mi Artículo',
    'contenido' => '<h1>Contenido Existente</h1><p>Este contenido viene de la base de datos...</p>'
];

$editor = new EditorWord('contenido', $articulo['contenido'], 450);
?>

<form method="POST" action="actualizar.php">
    <input type="hidden" name="id" value="1">
    
    <div class="mb-3">
        <label>Título:</label>
        <input type="text" name="titulo" value="<?= htmlspecialchars($articulo['titulo']) ?>" class="form-control">
    </div>
    
    <div class="mb-3">
        <label>Contenido:</label>
        <?= $editor->render() ?>
    </div>
    
    <button type="submit" class="btn btn-success">Actualizar Artículo</button>
</form>
```

## Api del constructor 
```php
// Parámetros:
// 1. name: nombre del campo en el formulario (requerido)
// 2. value: contenido HTML inicial (opcional)
// 3. height: altura del editor en píxeles (opcional, default: 400)

$editor = new EditorWord('nombre_campo', '<p>Contenido inicial</p>', 600);
```

## Api JavaScript
```js
// Obtener contenido del editor
const contenido = document.getElementById('editor_contenido').innerHTML;

// Establecer contenido
document.getElementById('editor_contenido').innerHTML = '<h1>Nuevo Contenido</h1>';

// Usar la API integrada
TinyEditor.getContent('contenido');
TinyEditor.setContent('contenido', '<p>Nuevo texto</p>');
```

## Botones Disponibles
## Botón	Función	Descripción
- **N** -	Negrita	Texto en negritas
- **K** -	Cursiva	Texto en cursiva
- **S** -	Subrayado	Texto subrayado
- **⬅** -	Alinear izquierda	Texto alineado a la izquierda
- **⬌** -	Alinear centro	Texto centrado
- **➡**	Alinear derecha	Texto alineado a la derecha
- **• Lista** -	Lista con viñetas	Lista no ordenada
- **1. Lista** - Lista numerada	Lista ordenada
- **🔗** - Insertar enlace	Agregar hipervínculo
- **🖼️** -	Insertar imagen	Subir y insertar imagen
- **🎨** - Color de texto	Cambiar color del texto
- **🧹** - Limpiar formato	Remover formato del texto seleccionado

## License

[MIT](https://choosealicense.com/licenses/mit/)
