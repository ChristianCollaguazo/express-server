# Curso de Express
## Herramientas utiles
[Esta pagina permite crear archivos gitignore para varias tecnologias](https://gitignore.io)

La cofiguracion debe tener [node, widowns, linux, macos]

## Dependecias de desarrollo
```bash
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
```
## Instalar express
```bash
npm i express
```
### Documentacion oficial
https://expressjs.com/es/

## REST: Representational State Transfer
Es una conveccion que se refiere a servicios web por protocolo HTTP

### Metodos:

* Get: Obtener
* Put: Modificar/Actualizar
* Patch: Modificar/Actualizar
* Post: Crear
* Delete: Eliminar

### Patch
El método de solicitud HTTP PATCH aplica modificaciones parciales a un recurso.

PATCH es algo análogo al concepto de “actualización” que se encuentra en CRUD, Una solicitud se considera un conjunto de instrucciones sobre cómo modificar un recurso. Contrasta esto con PUT; que es una representación completa de un recurso.PATCH

Mo es necesariamente idempotente, aunque puede serlo. Contrasta esto con PUT; que siempre es idempotente.

La palabra “idempotente” significa que cualquier número de solicitudes repetidas e idénticas dejará el recurso en el mismo estado.

Por ejemplo, si un campo de contador de incremento automático es una parte integral del recurso, entonces un PUT lo sobrescribirá naturalmente (ya que sobrescribe todo), pero no necesariamente para .PATCH

PATCH (como POST) puede tener efectos secundarios sobre otros recursos.

PATCH - HTTP | MDN

![alt text](https://static.platzi.com/media/user_upload/REST-65e4240f-662b-406e-91c9-57d8b0dd56f4.jpg)

## Anatomia de una URL
Dependiendo del diseño que se desea adoptar, una URL se compone de lo siguientes elementos:
![alt text](https://static.platzi.com/media/user_upload/Screen%20Shot%202022-04-02%20at%209.24.04-41a7268c-07f5-41a9-a85b-fac79a701b94.jpg)
* Protocolo - Define el medio con el cual se comunicarán los aplicativos (SMTP, FTP, SSH, etc), en el caso web HTTP o HTTPS.
* Host - Conocido como el nombre del dominio que define un nombre identificativo de nuestro servidor web; en localhost definimos como scope de la máquina en tema.
* Protocolo - Definiendo el acceso de comunicación que generalmente se relaciona con el protocolo Http(8080) o Https(443).
* Endpoint - Definiendo la ruta de acceso a la información la cual puede definirse como:
  * Contexto - Definición raíz de la API REST
  * Versión - (Opcional) Etiqueta
  * Recurso - (Opcional) Modelo de información
  * Parámetro - (Opcional) Selección índice o pivote
  * Query - (Opcional) Solicitud iterativo
