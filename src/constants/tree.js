export const decisionTree = {
    id: 1,
    question: "¿Utilizas una tecnica de estudio?",
    options: [
      {
        answer: "No",
        nextNode: {
          id: 2,
          question: "¿Tomas Apuntes en clase?",
          options: [
            {
              answer: "No",
              nextNode: {
                id: 4,
                question: "¿Revisas el material de la clase?",
                options: [
                  {
                    answer: "No",
                    nextNode: {
                      id: 4,
                      question: "¿Repasas mentalmente lo que se discutió en clase?",
                      options: [
                        {
                          answer: "No",
                          nextNode: {
                            id: 4,
                            question: "¿Te resulta difícil recordar y reflexionar sobre lo aprendido?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 4,
                                  question: "¿Te es fácil explicar un concepto a alguien mas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 4,
                                  question: "¿Qué te resulta más facil: recordar los detalles específicos o reflexionar sobre los conceptos generales?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "Si",
                          nextNode: {
                            id: 4,
                            question: "¿Esas reflexiones o preguntas las escribes en algún lugar?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 4,
                                  question: "¿Te resulta difícil recordar y reflexionar sobre lo aprendido?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 4,
                                  question: "¿Escribes esas reflexiones o preguntas de manera estructurada?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    answer: "Si",
                    nextNode: {
                      id: 5,
                      question: "¿Tomas notas mientras lees el material?",
                      options: [
                        {
                          answer: "Sí",
                          nextNode: {
                            id: 5,
                            question: "¿Esas notas que realizas siguen algún orden o sistema?",
                            options: [
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "¿Haces preguntas o reflexiones sobre lo que aprendiste?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Te resulta difícil encontrar información específica cuando la necesitas?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "No",
                          nextNode: {
                            id: 5,
                            question: "Miras videos o buscas información adicional en internet?",
                            options: [
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "Preferirías una nota mas abierta o estructurada?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Consideras que tienes buena memoria?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              answer: "Si",
              nextNode: {
                id: 5,
                question: "¿Haces un plan de estudio antes de comenzar a estudiar?111",
                options: [
                  {
                    answer: "No",
                    nextNode: {
                      id: 5,
                      question: "¿Qué te impide estudiar de manera regular?",
                      options: [
                        
                        {
                          answer: "No",
                          nextNode: {
                            id: 5,
                            question: "Consideras que procrastinas mucho?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Los apuntes que realizas siguen algún método o sistema?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "¿Te tomas descansos regulares durante tus sesiones de estudio?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                              
                            ]
                          }
                        },
                        {
                          answer: "Sí",
                          nextNode: {
                            id: 5,
                            question: "¿Prefieres apuntes con mas texto o con imágenes?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Te es facil explicar un concepto a alguien mas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "Preferirías una nota mas abierta o estructurada?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                              
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    answer: "Sí",
                    nextNode: {
                      id: 5,
                      question: "¿Sigues el plan de estudio de manera consistente?",
                      options: [
                        {
                          answer: "Sí",
                          nextNode: {
                            id: 5,
                            question: "¿Los apuntes que realizas siguen algún método o sistema?",
                            options: [
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "¿Estas satisfecho con este método?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Te es facil explicar un concepto a alguien mas?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "No",
                          nextNode: {
                            id: 5,
                            question: "¿Te cuesta concentrarte cuando estudias?",
                            options: [
                              {
                                answer: "Sí",
                                nextNode: {
                                  id: 5,
                                  question: "¿Estudias en sesiones cortas y frecuentes en lugar de sesiones largas y esporádicas?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "No",
                                nextNode: {
                                  id: 5,
                                  question: "¿Revisas y corriges tus errores después de hacer ejercicios o exámenes de práctica?",
                                  options: [
                                    {
                                      answer: "Sí",
                                      nextNode: null
                                    },
                                    {
                                      answer: "No",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      //mitad
      {
        answer: "Si",
        nextNode: {
          id: 3,
          question: "¿Tomas Apuntes en clase?",
          options: [
            {
              answer: "No",
              nextNode: {
                id: 3,
                question: "¿Revisas el material de clase después de cada sesión?",
                options: [
                  {
                    answer: "No",
                    nextNode: {
                      id: 3,
                      question: "¿Te resulta fácil recordar la información sin tomar notas?",
                      options: [
                        {
                          answer: "No",
                          nextNode: {
                            id: 3,
                            question: "¿Te distraes fácilmente mientras estudias?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Prioriza tus tareas según su importancia y urgencia?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Sueles procrastinar o dejar tareas importantes para el último momento?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "Si",
                          nextNode: {
                            id: 3,
                            question: "¿Recuerdas mejor una imagen o una historia?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Tienes un objetivo claro para cada sesión de estudio?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Te es fácil explicar un concepto a alguien mas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    answer: "Si",
                    nextNode: {
                      id: 3,
                      question: "Realizas notas de esos materiales de clase?",
                      options: [
                        {
                          answer: "No",
                          nextNode: {
                            id: 3,
                            question: "¿Te resulta fácil recordar la información sin tomar notas?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Te resulta difícil mantener la concentración mientras estudias?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Te resulta útil releer tus notas varias veces para reforzar tu memoria?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "Si",
                          nextNode: {
                            id: 3,
                            question: "¿Encuentras tus notas útiles para repasar y estudiar??",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Sientes que tus notas te ayudan a conectar diferentes conceptos?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Los apuntes que realizas siguen algún método o sistema?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              answer: "Si",
              nextNode: {
                id: 3,
                question: "¿Los apuntes que realizas siguen algún método o sistema?",
                options: [
                  {
                    answer: "No",
                    nextNode: {
                      id: 3,
                      question: "Revisas periódicamente las notas que tomas?",
                      options: [
                        {
                          answer: "No",
                          nextNode: {
                            id: 3,
                            question: "¿Tus notas son difíciles de entender?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Prioriza tus tareas según su importancia y urgencia?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Sientes que falta información clave en tus notas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "Si",
                          nextNode: {
                            id: 3,
                            question: "¿Lees el material antes de clase para tener una idea de lo que se va a discutir??",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Te resultan tus notas desorganizadas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "Preferirías una nota mas abierta o estructurada?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    answer: "Si",
                    nextNode: {
                      id: 3,
                      question: "¿Haces un plan de estudio antes de comenzar a estudiar?",
                      options: [
                        {
                          answer: "No",
                          nextNode: {
                            id: 3,
                            question: "¿Estableces objetivos específicos para cada sesión de estudio?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Revisas tus notas regularmente?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Encuentras tus notas confusas o difíciles de entender cuando las revisas?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          answer: "Si",
                          nextNode: {
                            id: 3,
                            question: "¿Revisas y ajustas tu plan de estudio regularmente?",
                            options: [
                              {
                                answer: "No",
                                nextNode: {
                                  id: 3,
                                  question: "¿Te resulta difícil saber por dónde empezar sin objetivos claros?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              },
                              {
                                answer: "Si",
                                nextNode: {
                                  id: 3,
                                  question: "¿Sueles alcanzar los objetivos que te propones para cada sesión de estudio?",
                                  options: [
                                    {
                                      answer: "No",
                                      nextNode: null
                                    },
                                    {
                                      answer: "Si",
                                      nextNode: null
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  };