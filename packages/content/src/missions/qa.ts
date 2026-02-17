import type { Mission } from "@qa-quest/shared";

export const missions: Mission[] = [
  {
    id: "qa-001",
    version: 2,
    title: "What is a Bug?",
    description: "Entendé qué es realmente un bug en QA.",
    difficulty: "easy",
    xp: 20,
    lessonBlocks: [
      {
        type: "text",
        text: "Un bug es una desviación entre el comportamiento esperado y el observado del sistema."
      },
      {
        type: "tip",
        text: "No todo inconveniente reportado por un usuario es un bug: primero validá requisitos y contexto."
      }
    ],
    activity: {
      type: "quiz",
      instruction: "Seleccioná la opción correcta",
      questions: [
        {
          id: "q1",
          prompt: "¿Qué describe mejor un bug?",
          options: [
            "Algo que al tester no le gusta",
            "Una desviación del comportamiento esperado"
          ],
          correctIndex: 1,
          explanation: "Correcto: debe compararse contra el comportamiento esperado."
        },
        {
          id: "q2",
          prompt: "Si una funcionalidad cumple exactamente con el requerimiento, ¿es bug?",
          options: ["Sí, si el usuario se queja", "No, porque cumple lo esperado"],
          correctIndex: 1,
          explanation: "Correcto: QA valida contra expectativas definidas."
        }
      ]
    }
  },
  {
    id: "qa-002",
    version: 1,
    title: "Test Cases 101",
    description: "Aprendé a escribir casos de prueba efectivos.",
    difficulty: "easy",
    xp: 25,
    lessonBlocks: [
      {
        type: "text",
        text: "Un caso de prueba define una condición de entrada, los pasos a seguir y el resultado esperado."
      },
      {
        type: "tip",
        text: "Un buen caso de prueba es reproducible, independiente y tiene un solo resultado esperado claro."
      },
      {
        type: "text",
        text: "Los casos de prueba pueden ser positivos (flujo feliz) o negativos (flujos de error y borde)."
      }
    ],
    activity: {
      type: "quiz",
      instruction: "Seleccioná la opción correcta",
      questions: [
        {
          id: "tc-q1",
          prompt: "¿Cuál es un componente esencial de un caso de prueba?",
          options: [
            "El nombre del tester que lo ejecuta",
            "El resultado esperado",
            "La fecha de creación"
          ],
          correctIndex: 1,
          explanation: "El resultado esperado es clave: sin él no podés determinar si la prueba pasó o falló."
        },
        {
          id: "tc-q2",
          prompt: "Un test case negativo sirve para...",
          options: [
            "Verificar que el sistema funciona correctamente con datos válidos",
            "Verificar que el sistema maneja correctamente entradas inválidas o inesperadas",
            "Medir el tiempo de respuesta del sistema"
          ],
          correctIndex: 1,
          explanation: "Los test cases negativos validan que el sistema maneja errores y casos borde sin romperse."
        },
        {
          id: "tc-q3",
          prompt: "¿Qué significa que un caso de prueba sea 'independiente'?",
          options: [
            "Que puede ejecutarse sin depender del resultado de otros test cases",
            "Que fue escrito sin ayuda de otros testers",
            "Que no necesita datos de entrada"
          ],
          correctIndex: 0,
          explanation: "La independencia garantiza que si un test falla, el problema está aislado y no en una dependencia externa."
        }
      ]
    }
  }
];
