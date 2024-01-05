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
      emailInput: {
        label: 'Dirección de correo electrónico',
      },
      marketingAgreementText:
        'Acepto recibir correos electrónicos de marketing personalizados.',
      signUpButton: 'Acceso',
      validationError: {
        invalidEmail:
          'Por favor, introduce una dirección de correo electrónico válida.',
        maxLength: 'La longitud máxima es de 255 caracteres',
        emptyName: 'El nombre no puede estar vacío',
      },
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
    maintenance: {
      title: 'Mantenimiento en curso',
      description:
        'Lo sentimos, el servicio de reserva no está disponible temporalmente a medida que se realiza una actualización del sistema.Vuelva a consultar más tarde o comuníquese con el soporte.',
      note: 'Por favor regrese más tarde o',
      btn: {
        support: 'Soporte de contacto',
      },
    },
    notFound: {
      title: '404 Pagina no encontrada',
      description:
        'La página que está buscando podría haber sido eliminada o no está disponible temporalmente.',
      btn: {
        returnToLounge: 'Regresar a la salón',
        support: 'Soporte de contacto',
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
    topBarLinks: {
      backToLounge: 'DE REGRESO',
      faqs: 'Preguntas frecuentes',
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
        placeholder: 'E.g. EZY123',
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
      title: '¿Quién esta viniendo?',
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
      loungeTerms: {
        line1: 'Referirse a ',
        link: 'Condiciones de salón',
        line2: 'Para restricciones de edad',
      },
      errors: {
        capacity: (guests: number) =>
          `La capacidad máxima del salón es un total de ${guests} invitados.Cambiar el número de invitados.`,
      },
    },
    availableSlots: {
      title: 'Tiempo estimado de llegada',
      description:
        'Los puntos de tiempo se muestran en la zona horaria de la ubicación del salón',
      placeholder: 'Tiempo de selección',
      arrivalDescription: 'Este es el momento en que llegará al salón.',
      stayTime: {
        line1: 'Como su vuelo está en',
        line2: ', tu estadía máxima es',
        line3: '3 horas antes',
      },
      totalPrice: {
        title: 'Precio total',
        samePrice: 'No se requiere tarifa adicional',
      },
      panelInfoHeader: {
        date: 'Fecha',
        flightTime: 'Tiempo de vuelo',
        flightNumber: 'Número de vuelo',
      },
      cancellationPolicy: {
        title: 'Política de cancelación',
        descriptionLine1: `Cancele hasta 48 horas antes de su reserva para recibir un reembolso completo.Las reservas no pueden cancelarse dentro de las 48 horas posteriores a la hora de llegada de reservas, incluidas las nuevas reservas realizadas dentro de ese rango de tiempo.`,
        descriptionLine2:
          'Confirme que los detalles son correctos antes de realizar el pago.',
      },
      hsbcCancelationPolicy: {
        title:
          'Tenga en cuenta que se aplica una tarifa de reserva previa a los titulares de tarjetas HSBC',
        descriptionLine1:
          'Para los titulares de tarjetas HSBC Premier, este cargo por reserva previa se agregará a los cargos por pases de visita suyos y de sus invitados. Cuando llegue a la sala VIP, deberá pagar £24 por visitante.',
        descriptionLine2:
          'Para los titulares de tarjetas HSBC Premier World Elite, tenga en cuenta que, si bien recibe pases de visita gratuitos para usted y cualquier titular de tarjeta adicional (es decir, no para sus invitados), la tarifa de reserva previa actuará como una tarifa separada y también se aplicará a usted y a sus invitados. . Cuando llegue a la sala VIP, los invitados que no sean el titular principal o adicional de la tarjeta deberán pagar £24 por visitante.',
      },
      btn: 'CONFIRMAR',
      errors: {
        airportMismatch: {
          title: `Los aeropuertos no coinciden`,
          description:
            'El salón que está reservando no está en el mismo aeropuerto de su vuelo está programado para partir.',
        },
        terminalMismatch: {
          title: `Las terminales no coinciden`,
          description:
            'El salón que está reservando no está en la misma terminal de que su vuelo está programado para partir.',
        },
        confirmation: '¿Todavía quieres seguir adelante con esta reserva?',
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
      amendTitle: 'Resumen de reserva',
      text: 'Confirme que los detalles son correctos antes de realizar el pago.',
      btn: 'Ir al pago',
    },
    payment: {
      btnGoPayment: 'Ir al pago',
      title: 'Información del pago',
    },
    confirmationPayment: {
      title: 'Confirmación de reserva',
      processing: {
        beingProcessed: {
          title: 'El pago se está procesando',
          description: {
            line1: 'Su pago por',
            line2: 'está siendo procesado.',
            line3:
              'No actualice la página, puede tardar unos minutos en completarse.',
          },
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
          emailConfirmationLabel:
            'Se ha enviado un correo electrónico de confirmación a',
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
            download: 'Descargar confirmación de reserva',
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
      arrivalTitle: 'Selección de tiempo de llegada',
      amendTitle: 'Modificaciones de reserva',
      notFoundError: 'Algo salió mal. Por favor, vuelva a intentarlo',
      btn: 'Verifique la disponibilidad',
    },
    failureBooking: {
      declined: {
        title: 'Tu reserva ha sido rechazada.',
        description:
          'Lo sentimos, pero durante el proceso de pago cambió la capacidad del salón y ya no podemos confirmar su reserva.Se le reembolsará cualquier pago realizado.',
        note: 'Considere reservar otro espacio de tiempo o verificar si hay otro salón disponible.',
        btn: {
          selectAnotherTime: 'Seleccione otro momento',
          returnToLounge: 'Regresar a los salones',
        },
      },
    },
    confirmationPDF: {
      title: 'Confirmación de reserva',
      description: {
        line1: '¡Buenas noticias!Tu reserva para',
        line2: 'en',
        line3: 'ha sido confirmado.',
      },
      bookingDetails: {
        title: 'Tus detalles de la reserva',
        reference: 'Referencia de reserva:',
        date: 'Fecha:',
        flightNumber: 'Número de vuelo:',
        timeOfArrival: 'Tiempo estimado de llegada:',
      },
      guestDetails: {
        title: '¿Quién esta viniendo?',
        adults: 'Adulta',
        children: 'Niñas',
        infants: 'Bebés',
      },
      price: 'total',
      importantNotes: {
        title: 'Notas importantes',
        notes: [
          'Recuerde traer su número de referencia de reserva, pase de embarque e ID de foto junto con su tarjeta de membresía Priority Pass o método de acceso elegible para registrarse en el sala.',
          'La estancia máxima es de 3 horas antes de su tiempo de vuelo.',
          'La cancelación debe hacerse al menos 48 horas antes de la fecha y hora de su visita para recibir un reembolso. No se emitirá reembolso después de este tiempo. ',
        ],
      },
      cancelText: 'Haga clic aquí para cancelar su reserva',
      forwardText: 'Esperamos verlos allí!',
      loadingText: 'Documento de carga ...',
      error:
        '¡Se produjo un error al generar su confirmación de reserva!Inténtalo de nuevo.',
    },
  },
};
