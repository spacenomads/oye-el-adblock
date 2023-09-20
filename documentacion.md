# Documentación

[← Volver](./)

## Cómo se instala

- Te descargas los archivos JS y CSS de la carpeta **********dist/**********
- Los enlazas en la cabecera de tu web/página/plantilla:

    ```html
    <link rel="stylesheet" href="your-path-to/oye-el-adblock.css">
    <script src="your-path-to/oye-el-adblock.js" defer></script>
    ```

- Y en un js posterior llamas al plugin:

    ```jsx
    const adBlockWarning = new OyeElAdblock()
    ```

Por defecto tiene unos estilos y un mensaje.

![Pequeño formato de banner que te avisa de que no tienes un bloqueador de publicidad. Recuadro con fondo degradad de casi negro a casi negro más claro (en vertical) con textos centrado aparecen los textos: Oye, el adBlock! Pero bueno, que no se puede ir por la vida sin un bloqueador de publicidad! Por qué necesito uno? Entre el título «Oye, el adBlock!» y el resto del texto hay un emoji de un smiley con gorro de vaquero y parche pirata, y un trazo al lado como simulando que el título está en un bocadillo que dice el emoji. Los textos están en blanco excepto la última frase «Por qué necesito uno?» que está en amarillo porque será un enlace.](./assets/img/default-banner.png)

Adicionalmente le puedes pasar una configuración para personalizar estilos y mensaje.

## Personalización

El objeto completo de personalización por defecto es este:

```jsx
{
  title: 'Oye, que no tienes adBlock!',
  text: [
    'Pero bueno, que no se puede ir por la vida sin un bloqueador de publicidad!',
  ],
  link: {
    url: '#adblock',
    label: 'Por qué necesito uno?',
  },
  close_btn: {
    label: 'Cerrar ',
    sr_label: 'aviso de que no se ha detectado adBlock'
  },
  custom_class_name: 'my-custom-class'
}
```

Estos campos no son obligatorios, pero se puede crear un objeto para sustituir el de por defecto.

- `title` (Cadena) contiene el título del pane de alerta. Puede incluir HTML.
- `text` (Array de cadenas) generará tantos párrafos como elementos tenga el array. Puede incluir HTML.
- `link` (Objeto) configura un enlace adicional que se coloca tras los párrafos. Tiene dos propiedades con el texto (`label`) y el enlace (`url`), y de querer que aparezca necesita que se rellenen los dos.
- `close_btn` (Objeto) configura el botón de cierre, que aparecerá si cualquiera de las dos propiedades se rellenan. `label` define el texto que se va a ver en el botón, mientras que `sr_label` define el texto que se puede añadir para el lector de pantalla, y que por tanto no se verá. En el ejemplo solo se vería “Cerrar” mientras que con un lector de pantalla se leería “Cerrar aviso de que no se ha detectado el adBlock”.
- `custom_class_name` permite añadir un nombre de bloque para tener una nomenclatura propia y añadir tus propios estilos que sobre escriban a los del plugin.

### Contenido de la alerta

La configuración por defecto genera el siguiente código HTML:

```jsx
<aside class="🤠 js-🤠">
  <div class="🤠__wrapper">
    <h2 class="🤠__title">Oye, que no tienes adBlock!</h2>
    <p class="🤠__paragraph">Pero bueno, que no se puede ir por la vida sin un bloqueador de publicidad!</p>
    <p class="🤠__paragraph">
      <a href="#adblock" class="🤠__link">Por qué necesito uno?</a>
    </p>
  </div>
  <button type="button" class="🤠__close js-🤠-close">Cerrar <span class="🤠__sr-only">aviso de que no se ha detectado adBlock</span></button>
</aside>
```

### Estilos

Si queremos sobre escribir los estilos por defecto se puede no añadir el css del plugin y usar los siguientes selectores si como `custom_class_name` seteamos “my-custom-class”.

```css
.my-custom-class {}
.my-custom-class__wrapper {}
.my-custom-class__title {}
.my-custom-class__paragraph {}
.my-custom-class__link {}
.my-custom-class__sr-only {}
.my-custom-class__close {}
```

## FYI: Métodos de detección

Hay como dos métodos para saber si el usuario tiene un ad-blocker instalado:

1. Crear un div con una serie de clases concretas que suelen usar los bloqueadores para ocultar  la publicidad, consultar la altura del elemento, **y si es cero es que un bloqueador ha bloqueado**.
2. Hacer una petición a una url de google o similares, **y si falla seguramente sea porque alguien ha bloqueado algo**.

Me gusta **el primer método** porque no tienes que andar haciendo peticiones y creo que pintar un elemento en el DOM interfiere mucho menos con la carga normal de la página.

He sacado una lista de esas clases “sospechosas habituales”.

```
aan_fake
aan_fake__video-units
ad
adde_modal_detector
adde_modal-overlay
adsbyrunactive
advboxemb
advertising
aff-content-col
aff-inner-col
aff-item-list
amp-ad-inner
aoa_overlay
ark-ad-message
ave-pl
bloc-pub
bloc-pub2
blocker-notice
blocker-overlay
bottom-hor-block
brs-block
dbanner
exo-horizontal
fints-block__row
ftf-dma-note
full-ave-pl
full-bns-block
gallery-bns-bl
glx-watermark-container
GoogleActiveViewElement
happy-inside-player
happy-under-player
header-menu-bottom-ads
hor_banner
imggif
in_stream_banner
inplayer_banners
inplayer-ad
mdp-deblocker-wrapper
message
native-ad
native-ad-1
ninja-recommend-block
overlay-advertising-new
player-bns-block
preroll-blocker
rkads
rps_player_ads
stream-item-widget
trafficjunky-float-right
vertbars
video-brs
wgAdBlockMessage
wps-player__happy-inside
ytd-j
yxd-j
yxd-jd
```

Y tb tengo un ejemplo de cómo se haría lo de la petición:

```jsx
async function detectAdBlock() {
  let adBlockEnabled = false;
  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  try {
    await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true);
  } catch (e) {
    adBlockEnabled = true;
  } finally {
    return adBlockEnabled;
  }
}
detectAdBlock();
```
