export function handleGreetingMessage() {
    const hoursOfDay = new Date().getHours()

    switch (true) {
      case hoursOfDay < 0:
        return "Olá tudo Bem";
      case hoursOfDay < 12:
        return "Bom dia";
      case hoursOfDay < 18:
        return "Boa tarde";
      default:
        return "Boa noite";
    }
  }