Para probar la página vaya a sansinews.pipexapp.com
Las credenciales son:
user: admin
pass: (su primer nombre de usted)
Para probarlo localmente:

1. Clonar el repositorio
2. Installar las dependencias con `npm i`
3. Crear `.env` y poner las variables CMS_USERNAME, y CMS_PASS y JWT_SECRET.
   CMS_USERNAME y CMSPASS son las credenciales para el panel de administración y Jwt_SECRET puede ir cualquier valor.
4. Correr el programa con `npm run dev`
5. Ir a `localhost:3000`
6. Para ir al paner de administración agregar /admin a la ruta `localhost:3000/admin` o `sansinews.pipexapp.com/admin`
