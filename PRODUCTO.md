# Proyecto Faro Interior

Documento base del producto unificado a partir de **Almas del Sur** y las ideas de **Numen/Neumen**.

> `Faro Interior` es un nombre de trabajo, no la marca definitiva. El nombre `Numen` no conviene comercialmente porque ya existen aplicaciones del mismo sector con ese nombre.

## Propósito

Crear un compañero personal de bolsillo que conozca a la persona con el tiempo, la ayude a pensar con profundidad y transforme señales internas y externas en orientación práctica.

No pretende adivinar un futuro cierto ni reemplazar a un psicólogo. Presenta patrones, preguntas, escenarios y pequeños pasos para que el usuario decida con más conciencia.

## Promesa central

**“Te conozco, entiendo tu contexto y te acompaño a encontrar tu próximo paso.”**

La ventaja no será tener tarot, clima o noticias por separado. Será relacionar:

1. **La persona:** historia, valores, metas, vínculos, hábitos y límites.
2. **Su momento:** ánimo, energía, sueño, diario y conversaciones recientes.
3. **El entorno:** clima local, calendario, noticias sociales y económicas relevantes.
4. **Sus marcos de sentido:** astrología, espiritualidad, filosofía o religión, siempre elegidos por el usuario.
5. **La acción:** una pregunta profunda, una decisión posible y un paso pequeño y concreto.

## Posicionamiento

No es “otro horóscopo” ni un “psicólogo artificial”. Es una **brújula personal contextual**.

La astrología, el tarot y otros símbolos funcionan como lentes de reflexión, no como hechos científicos ni profecías. Política, sociedad y religión se tratan con pluralidad, fuentes y sin intentar manipular las creencias del usuario.

## Experiencia diaria

### 1. Pulso

Un chequeo de menos de un minuto:

- “¿Cómo estás de verdad?”
- energía, ánimo y preocupación principal;
- opción de escribir o hablar;
- posibilidad de omitir cualquier dato sensible.

### 2. Lectura del contexto

El sistema combina solo las fuentes autorizadas por el usuario:

- clima y luz del día;
- calendario y compromisos;
- diario y patrones personales;
- contexto social/económico seleccionado;
- tránsitos astrológicos o práctica espiritual elegida.

Debe distinguir claramente entre **dato**, **interpretación** y **símbolo**.

### 3. Conversación de profundidad

El compañero recuerda lo importante, detecta contradicciones con respeto y hace preguntas útiles. Puede decir:

> “Hace tres semanas que repetís que querés cambiar, pero cada lunes postergás la misma conversación. ¿Qué parte te da miedo perder?”

### 4. Próximo paso

Cada sesión termina con una salida útil:

- una acción de 5 a 15 minutos;
- una decisión para observar;
- una pregunta para el diario;
- o simplemente acompañamiento, si la persona no necesita empuje.

### 5. Espejo semanal

Resumen privado de patrones, avances, bloqueos y momentos significativos. Nunca diagnostica.

## Qué se conserva de Almas del Sur

- identidad cálida y espiritual rioplatense;
- perfil y onboarding personal;
- registro de estado de ánimo;
- diario;
- tarot, horóscopo y carta astral como modos opcionales;
- Madame Céleste, reformulada como una voz o experiencia dentro del producto;
- PWA instalable.

## Qué debe cambiar

- pasar de respuestas aisladas a memoria longitudinal y controlable;
- reemplazar “predicciones” tajantes por escenarios y reflexión;
- incorporar contexto real con fuentes y fecha;
- separar datos objetivos, interpretación y contenido simbólico;
- mover claves de IA, permisos Premium y pagos al servidor;
- añadir cuenta, sincronización cifrada, exportación y borrado;
- corregir métricas/contadores y crear analítica respetuosa de la privacidad;
- añadir protocolo de crisis y límites claros de salud mental.

## Módulos del producto

1. **Hoy:** pulso, contexto y orientación diaria.
2. **Compañero:** conversación con memoria y profundidad.
3. **Camino:** metas, decisiones y próximos pasos.
4. **Diario:** texto/voz, patrones y espejo semanal.
5. **Almas:** tarot, astrología, rituales y marcos espirituales opcionales.
6. **Contexto:** clima, sociedad, economía y política con controles de fuentes y sesgo.
7. **Privacidad:** qué recuerda, por qué lo recuerda y botón para olvidar.

## Seguridad y confianza

- No usar títulos como “psicólogo”, “terapeuta” o “diagnóstico”.
- No afirmar que planetas, religión, clima o política determinan decisiones personales.
- No reforzar paranoia, delirios, dependencia emocional ni aislamiento.
- En señales de crisis: conversación segura, recomendación de ayuda humana y recursos locales.
- Consentimiento separado para ubicación, salud, calendario, creencias y memoria.
- Cifrado, exportación y eliminación completa de datos.
- Fuentes visibles cuando se use información política, social, económica o climática.

## Modelo comercial inicial

### Gratis

- pulso diario;
- diario básico;
- conversación limitada;
- una lectura simbólica semanal;
- datos guardados localmente cuando sea posible.

### Plus

- memoria profunda y sincronización;
- conversaciones ampliadas;
- espejo semanal;
- contexto personalizado;
- carta astral y lecturas avanzadas;
- voz y planes de acción.

Precio a validar con usuarios; hipótesis inicial: equivalente local de **USD 5–8/mes** o plan anual con descuento. No fijar precio definitivo sin entrevistas y prueba de pago.

## MVP comercial

El primer producto vendible debe hacer solo cinco cosas muy bien:

1. onboarding con valores, metas y límites;
2. pulso diario;
3. conversación con memoria editable;
4. orientación contextual con próximo paso;
5. espejo semanal.

Tarot y astrología entran como una capa opcional de identidad, no como el motor central.

## Arquitectura recomendada

- **Frontend:** PWA móvil primero, reutilizando lo rescatable de Almas.
- **Backend:** API propia para IA, pagos y permisos; ninguna clave secreta en el navegador.
- **Datos:** PostgreSQL/Supabase u opción equivalente con cifrado y políticas por usuario.
- **Memoria:** hechos confirmados, resúmenes editables y caducidad de recuerdos sensibles.
- **Contexto:** adaptadores separados para clima, calendario y noticias; cada salida conserva fuente y fecha.
- **IA:** modelo intercambiable, reglas de seguridad y evaluación de respuestas antes de escalar.

## Validación antes de construir todo

Entrevistar a 10–15 personas y probar un prototipo conversacional durante 14 días. Medir:

- cuántas vuelven 3 o más días por semana;
- si recuerdan y cumplen el “próximo paso”;
- si el espejo semanal les muestra algo útil y verdadero;
- qué contexto aceptan compartir;
- cuántas pagarían y por qué función concreta.

## Revisión de alternativas existentes (7 de octubre de 2026)

Ningún proyecto abierto revisado cubre el producto completo:

| Proyecto | Estrellas | Licencia | Último push | Veredicto |
|---|---:|---|---|---|
| `g-battaglia/kerykeion` | 717 | AGPL-3.0 | 2026-10-05 | Motor astrológico maduro; útil como referencia o servicio separado, no como producto completo. |
| `Marlon0066/AI-Pocket-Chat` | 57 | GPL-3.0 | 2026-09-28 | Compañero Android local; riesgo por comunidad pequeña y licencia copyleft. |
| `cedar-panda/Holt` | 29 | AGPL-3.0 | 2026-09-26 | Compañero Flutter activo, pero demasiado pequeño para depender comercialmente de él. |
| `Rogendo/Mental-health-Chatbot` | 214 | Sin licencia | 2026-09-08 | No reutilizable legalmente y no cumple la visión contextual. |

Competidores comerciales como Co–Star, Sanctuary, Finch y Yap validan partes de la demanda, pero ninguno debe copiarse. La diferenciación defendible es la unión de **memoria personal editable + contexto verificable + profundidad conversacional + acción concreta + espiritualidad opcional**.

## Próxima decisión

Antes de diseñar pantallas definitivas hay que elegir a la primera persona usuaria ideal. Recomendación: adultos hispanohablantes de 30–55 años que buscan claridad personal y espiritualidad sin dogmas, no tratamiento clínico.
