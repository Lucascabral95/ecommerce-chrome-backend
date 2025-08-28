import { CreateRoleDto, RoleName } from "src/users/roles/create-role.dto";

const roleName: CreateRoleDto[] = [
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": RoleName.USER
    },
    {
        "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "name": RoleName.MANAGER
    },
    {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "name": RoleName.ADMIN
    }
]

export default roleName;