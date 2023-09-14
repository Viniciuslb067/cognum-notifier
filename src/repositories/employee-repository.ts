import { PrismaClient } from "@prisma/client";

import { Api500Error, Api404Error } from "../util/errors";

import redis from "../util/cache";

const prisma = new PrismaClient();

export default class EmployeeRepository {
  async getById(id: string) {
    try {
      const cacheKey = `employee:${id}`;

      const cachedEmployee = await redis.get(cacheKey);

      if (cachedEmployee) return JSON.parse(cachedEmployee);

      const employee = await prisma.employee.findFirst({ where: { id } });

      if (!employee) throw new Api404Error("Funcionário não encontrado.");

      await redis.set(cacheKey, JSON.stringify(employee));

      return employee;
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar buscar um funcionário.",
        error.stack
      );
    }
  }
}
