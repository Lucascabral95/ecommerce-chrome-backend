import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./create-role.dto";
import { handlePrismaError } from "src/errors/handler-prisma-error";

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    async createRole(createRoleDto: CreateRoleDto) {
        try {
            const { name } = createRoleDto;

            const role = await this.prisma.role.create({
                data:
                {
                    name: name,
                }
            });

            return { role, message: 'Role created successfully' };
        } catch (error) {
            handlePrismaError(error, 'Role');
            throw error;
        }
    }
}