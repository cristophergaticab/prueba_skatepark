# prueba_skatepark

Descripción

La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el
nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo
año, y han iniciado con la gestión para desarrollar la plataforma web en la que los
participantes se podrán registrar y revisar el estado de su solicitud
En esta prueba deberás ocupar todos tus conocimientos para desarrollar un sistema que
involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el
frontend y backend.
Las tecnologías y herramientas que deberás ocupar son las siguientes:
- Express
- Handlebars
- PostgreSQL
- JWT
- Express-fileupload


Indicaciones:
● El sistema debe permitir registrar nuevos participantes.
● Se debe crear una vista para que los participantes puedan iniciar sesión con su
correo y contraseña.
● Luego de iniciar la sesión, los participantes deberán poder modificar sus datos,
exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT
y los datos que se utilicen en la plantilla deben ser extraídos del token.
● La vista correspondiente a la ruta raíz debe mostrar todos los participantes
registrados y su estado de revisión.
● La vista del administrador debe mostrar los participantes registrados y permitir
aprobarlos para cambiar su estado.

Requerimientos
1. Crear una API REST con el Framework Express (3 Puntos)
2. Servir contenido dinámico con express-handlebars (3 Puntos)
3. Ofrecer la funcionalidad Upload File con express-fileupload (2 Puntos)
4. Implementar seguridad y restricción de recursos o contenido con JWT (2 Puntos
