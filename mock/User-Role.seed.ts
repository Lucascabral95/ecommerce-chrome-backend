import { CreateRolesUserDto } from "src/users/dto";

const userRolesSeed: CreateRolesUserDto[] = [
    {
        "userId": "6e678f4c-c0a7-468a-be7a-29191bf49955", // Lucas
        "roleId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"  // ADMIN
    },
    {
        "userId": "569ad29f-e8a6-4f2b-b7a5-8f84dca33d7a", // Carlos
        "roleId": "550e8400-e29b-41d4-a716-446655440000"  // USER
    },
    {
        "userId": "3ed4f891-022f-44c5-999a-84721a374414", // Ana
        "roleId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"  // MANAGER
    },
    {
        "userId": "e4e382bc-225b-4a73-8069-69577df9b10a", // Juan
        "roleId": "550e8400-e29b-41d4-a716-446655440000"  // USER
    }
]

export default userRolesSeed;
