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
  }
];
