import { Api400Error } from "../util/400-error";
import { Api500Error } from "../util/500-error";
import { logger } from "../util/logger/logger";

import EmployeeRepository from "../repositories/employee-repository";

export default class NotificationService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async sendNotification({
    ids,
    message,
  }: {
    ids: Array<string>;
    message: string;
  }) {
    try {
      if (ids.length && message) {
        const usersWhichSendMessage = [];

        for (const id of ids) {
          const employee = await this.employeeRepository.getById(id);

          if (!employee) {
            logger?.warn(
              `Não foi possível encontrar o(a) funcionário(a) com id "${id}"`
            );
            continue;
          }

          logger?.info(`Enviando a mensagem para o(a) ${employee?.name}...`);

          usersWhichSendMessage.push(employee?.name);
        }

        if (!usersWhichSendMessage.length) {
          throw new Api400Error(
            "Não foi possível enviar a mensagem para nenhum(a) funcionário(a)."
          );
        }

        return usersWhichSendMessage;
      }
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro inesperado ao tentar enviar as notificações."
      );
    }
  }
}
