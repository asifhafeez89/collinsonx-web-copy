export default {
  auth: {
    login: {
      email: {
        title: 'Introduce tu correo electrónico',
        input: {
          label: 'Ingresa tu dirección de correo electrónico',
          description:
            'Proporcione una dirección de correo electrónico que utilizaremos para comunicarnos con usted, incluida toda la información de la reserva.',
          placeholder: 'youremail@gmail.com',
        },
      },
      passwordText:
        'Le enviaremos un código de acceso de un solo uso por correo electrónico para continuar.',
      btnLogin: 'Continuar',
      error: {
        emailFormat:
          'Formato de correo electrónico incorrecto, inténtelo de nuevo',
        emailError:
          'Introduzca la dirección de correo electrónico correcta o llame al servicio de asistencia, ya que esta cuenta ya está vinculada a una dirección de correo electrónico diferente',
      },
    },
    checkCode: {
      title: 'Revisa tu correo electrónico',
      description: 'Hemos enviado un código único a ',
      wrongEmailTitle: '¿Correo electrónico incorrecto',
      reEnterEmailLabel: 'Vuelva a ingresar su dirección de correo electrónico',
      passcodeSubtitle: 'Código de acceso de un solo uso',
      uniqueCodeText: (count: number) =>
        `Puede volver a enviar el código único en ${count} segundos`,
      btn: {
        resend: 'Reenviar',
        verify: 'Verificar',
      },
      error: {
        wrongCode:
          'El código de acceso puede ser incorrecto o caducado. Por favor, inténtelo de nuevo.',
      },
    },
    signUp: {
      title: 'Detalles de la actualización',
      subtitle: 'Puedes actualizar tus datos a continuación',
      firstNameInput: {
        label: 'Nombre(s)',
        placeholder: 'John',
      },
      lastNameInput: {
        label: 'Apellido(s)',
        placeholder: 'Smith',
      },
      marketingAgreementText:
        'Acepto recibir correos electrónicos de marketing personalizados.',
      signUpButton: 'Confirmar',
      error: {
        signUpError: 'Ocurrió un error',
        attempts: {
          title: 'Lo siento, demasiados intentos incorrectos',
          description:
            'Se hicieron 5 intentos incorrectos para ingresar el código de verificación.Vuelva a intentarlo en una hora',
          btn: {
            reEnter: 'Volver a introducir correo electrónico',
            contact: 'Soporte de contacto',
          },
        },
      },
    },
  },
  lounge: {
    perPerson: 'por persona',
    errors: {
      capacity: {
        title: 'El salón está a su capacidad',
        description: {
          known:
            'Lo sentimos, el salón seleccionado está en capacidad en este momento.Puede intentar reservar para un número menor de invitados o verificar si hay otro salón disponible.',
          notKnown:
            'Nuestras disculpas, pero la capacidad del salón para la intervalos de tiempo que seleccionó es 2 adultos y 1 niño.',
        },
        solutions: {
          title: 'Puede',
          points: [
            'Cambiar el número de invitados',
            'Cambiar las ranuras de tiempo',
            'Encuentra otro salón',
          ],
        },
        btn: {
          change: 'Cambiar el número de invitados',
          return: 'Regresar a los salones',
        },
      },
      unavailable: {
        title: 'El salón no está disponible',
        description:
          'Lo siento, pero no podemos cumplir con su solicitud de reservar el salón en este momento.Pedimos disculpas por las molestias causadas.Vuelva a intentarlo más tarde o comuníquese con nuestra atención al cliente para obtener más ayuda.Gracias por su comprensión.',
      },
      terminalsMismatch: {
        title: 'Terminales no coincidiendo',
        description:
          'Tenga en cuenta que el salón que está reservando no está en la terminal que su vuelo está programado.La terminal de salón está en la terminal norte.La terminal de salida de vuelo es de South Terminaldo, ¿aún desea reservar este salón ni siquiera está en la terminal de salida?',

        btn: {
          return: 'Regresar a los salones',
          continue: "'Continuar reservando',",
        },
      },
    },
  },
  booking: {
    flightAndGuests: {
      title: 'Entrada de vuelo e invitados',
    },
    flightDetails: {
      title: 'Detalles de mi vuelo',
      dateInput: {
        label: 'Fecha',
        placeholder: 'Fecha de vuelo',
      },
      numberInput: {
        label: 'Número de vuelo',
        placeholder: 'P.ej.Ezyi123',
      },
      time: {
        label: 'Tiempo de vuelo',
      },
      errors: {
        invalid_date: 'Debe proporcionar fecha de vuelo.',
        invalid_dateflight:
          'Detalles del vuelo no reconocidos.Por favor revisa e intenta de nuevo.',
        invalid_flight:
          'Detalles del vuelo no reconocidos.Por favor revisa e intenta de nuevo.',
      },
    },
    guestDetails: {
      title: 'Quién esta viniendo',
      description: (guests: number) =>
        `El tamaño máximo del grupo es de ${guests}, excluyendo bebés.Verifique la disponibilidad para restricciones específicas de salón en el número de bebés.`,
      adultsInput: {
        label: 'Adulta',
        description: 'Mayores de 12 años',
      },
      childrenInput: {
        label: 'Niñas',
        description: 'Edades 2-11',
      },
      infantsInput: {
        label: 'Bebés',
        description: 'Edades 0-2',
      },
      loungeTerms:
        'Consulte las condiciones del salón para las restricciones de edad',
      errors: {
        capacity:
          'La capacidad máxima del salón es un total de 5 invitados.Cambiar el número de invitados.',
      },
    },
    availableSlots: {
      title: 'Tiempo estimado de llegada',
      description:
        'Los puntos de tiempo se muestran en la zona horaria de la ubicación del salón',
      arrivalDescription: 'Este es el momento en que llegará al salón.',
      stayTime: (flightTime: number) =>
        `Como su vuelo es de ${flightTime}, su estadía máxima es 3 horas antes.`,
      totalPrice: {
        title: 'Precio total',
      },
      btn: 'confirmar',
      errors: {
        estimatedTime: 'Seleccione la hora de llegada estimada',
        availabilityUnknown: {
          title: 'La disponibilidad es desconocida',
          description:
            'Nuestras disculpas, pero la capacidad para el tiempo que seleccionó es desconocida.',
          solutions: {
            title: 'Puede',
            points: [
              'Cambiar el número de invitados',
              'Cambiar la ranura de tiempo',
              'Encuentra otro salón',
            ],
          },
          endText: 'O inténtalo de nuevo más tarde',
        },
        btn: {
          edit: 'Editar reserva',
          return: 'Regresar a los salones',
        },
      },
    },
    confirmBooking: {
      title: 'Resumen de reservas',
      text: 'Confirme que los detalles son correctos antes de realizar el pago.',
      btn: 'Ir al pago',
    },
    payment: {
      btnGoPayment: 'Ir al pago',
    },
    confirmationPayment: {
      title: 'Confirmación de reserva',
      processing: {
        beingProcessed: {
          title: 'El pago se está procesando',
          description:
            'Se está procesando su pago por el salón Onelondon Gatwick.Estos pueden tardar unos minutos/segundos en completarse. ',
        },
        unsuccessful: {
          title: 'El pago no tiene éxito',
          description:
            'Por favor, no deje esta pantalla ni cierre su navegador hasta que termine la acción',
        },
      },
      outcome: {
        succesful: {
          title: '¡Buenas noticias!Tu reserva ha sido confirmada',
          reference: {
            label: 'Referencia de reserva',
          },
          description:
            'Nuestras disculpas, se produjeron error durante el proceso de pago y su pago no fue procesado.Le solicitamos amablemente que haga una nueva reserva o repita su pago.',
          importantNotes: {
            title: 'Notas importantes',
            notes: [
              'Recuerde traer su número de referencia de reserva, pase de embarque e ID de foto junto con su tarjeta de membresía prioritaria Pase o método de acceso elegible para registrarse en el salón ',
              'La estadía máxima es de 3 horas antes de su tiempo de vuelo.',
              'La cancelación debe hacerse al menos 48 horas antes de la fecha y hora de su visita para recibir un reembolso.No se emitirá reembolso después de este tiempo.',
            ],
          },
          btn: {
            download: 'Descargar confirmación de PDF',
            return: 'regresoALaSalón',
          },
        },
        notConfirmed: {
          title: 'Su pago no ha confirmado',
          description:
            'Nuestras disculpas, se produjeron error durante el proceso de pago y su pago no fue procesado.Le solicitamos amablemente que haga una nueva reserva o repita su pago.',
          btn: {
            payment: 'Pago repetido',
            return: 'Regreso a la salón',
          },
        },
        delay: {
          title: 'Retraso de confirmación de reserva',
          description:
            'Todavía no podemos confirmar su reserva, le enviaremos un correo electrónico una vez que se confirme su reserva',
          btn: 'Regresar a los salones',
        },
        delayError: {
          title: 'No recibió confirmación',
          description:
            'Todavía no podemos confirmar su reserva, le enviaremos un correo electrónico una vez que se confirme su reserva',
          btn: 'Regresar a los salones',
        },
        declined: {
          title: 'Tu reserva ha sido rechazada',
          description:
            'Disculpas por la demora en el procesamiento.Desafortunadamente, no pudimos confirmar su reserva.Considere reservar otro espacio de tiempo.',
          btn: {
            return: 'Regresar a los salones',
            select: 'Seleccione otro momento',
          },
        },
      },
    },
    cancellation: {
      policy: {
        title: 'Política de cancelación',
        description:
          'Cancele hasta 48 horas antes de su reserva para recibir un reembolso completo.Las reservas no pueden cancelarse dentro de las 48 horas posteriores a la hora de llegada de reservas, incluidas las nuevas reservas realizadas dentro de ese rango de tiempo.',
      },
      unsuccesful:
        'Lo sentimos, esta reserva no se puede cancelar dentro de las 48 horas posteriores a la hora de llegar a la reserva',
      btn: 'Confirmar',
    },
    checkAvailability: {
      btn: 'Verifique la disponibilidad',
    },
  },
};
