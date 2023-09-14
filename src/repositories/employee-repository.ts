import { PrismaClient, Employee } from "@prisma/client";

import { Api500Error } from "../util/500-error";

import redis from "../util/cache";

const prisma = new PrismaClient();

export default class EmployeeRepository {
  async getById(id: string) {
    try {
      const cacheKey = `employee:${id}`;

      const cachedEmployee = await redis.get(cacheKey);

      if (cachedEmployee) {
        return JSON.parse(cachedEmployee);
      }

      const employee = await prisma.employee.findFirst({ where: { id } });

      await redis.set(cacheKey, JSON.stringify(employee));

      return employee;
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar buscar um funcionário.",
        error.stack
      );
    }
  }

  async list() {
    try {
      return await prisma.employee.findMany();
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar listar os funcionários.",
        error.stack
      );
    }
  }

  async create(data: Pick<Employee, "name" | "role">) {
    try {
      return await prisma.employee.create({ data });
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar criar um funcionário.",
        error.stack
      );
    }
  }

  async update(id: string, data: Pick<Employee, "name" | "role">) {
    try {
      return await prisma.employee.update({ where: { id }, data });
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar atualizar um funcionário.",
        error.stack
      );
    }
  }

  async delete(id: string) {
    try {
      return await prisma.employee.delete({ where: { id } });
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar excluir um funcionário.",
        error.stack
      );
    }
  }
}
