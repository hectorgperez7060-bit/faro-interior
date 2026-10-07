# Faro Interior — prototipo

Primera experiencia móvil navegable del producto que unifica el acompañamiento contextual de Numen/Neumen con la identidad espiritual de Almas del Sur.

## Incluye

- onboarding con nombre, momento, intención y preferencia espiritual;
- pulso emocional y orientación del día;
- conversación de demostración orientada a preguntas profundas;
- camino semanal y próximo paso;
- diario local;
- memoria visible y eliminable;
- Almas como capa simbólica opcional.

Los datos del prototipo se guardan solamente en `localStorage`. No hay backend, cuentas, IA real, noticias, clima ni pagos todavía.

## Ejecutar

```bash
python3 -m http.server 4173
```

Abrir `http://localhost:4173`.

## Próxima etapa

Probar el recorrido con personas reales antes de conectar servicios externos. Las primeras integraciones deberían ser autenticación, almacenamiento seguro y conversación con memoria editable.
