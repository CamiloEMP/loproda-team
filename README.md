<div align="center">
  <h1 align="center">Loproda team</h1>
</div>

## Acerca del proyecto
Nace de una hackathon organizada por [@midudev en Twitch](https://www.twitch.tv/midudev), donde el reto es crear un clon de [Google Meet](https://meet.google.com/)

## Construido con
- [Remix js](https://remix.run/)
- [Supabase js](https://supabase.io/)
- [Tailwind css](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)

## Requisitos previos
- Una cuenta en [supabase.com](https://supabase.com/)

## Instalacion
1. Clona el Repositorio
```sh
git clone https://github.com/thefersh/loproda-team.git
cd loproda-team
```
2. Ejecuta los archivos sql en `./sql` en orden numerico en supabase
3. Crea un archivo `.env`
```text
SUPABASE_URL=
SUPABASE_KEY=

TWILIO_ACCOUNT_SID=
TWILIO_ACCOUNT_TOKEN=
TWILIO_API_KEY_SID=
```
4. Instala las dependencias
```sh
npm install
```
5. Inicia el servidor de desarrollo
```sh
npm run dev
```

