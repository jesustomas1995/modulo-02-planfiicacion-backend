import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'UniqueArrayValidator', async: false })
export class UniqueArrayValidator implements ValidatorConstraintInterface {
    validate(value: any[], args: ValidationArguments) {
        if (!Array.isArray(value)) return false;

        // Extraemos el campo que debe ser único (producto_id)
        const field = args.constraints[0];
        const seen = new Set();

        for (const item of value) {
            if (seen.has(item[field])) {
                return false; // Si encontramos un duplicado, la validación falla
            }
            seen.add(item[field]);
        }
        return true; // Si todos los `producto_id` son únicos
    }

    defaultMessage(args: ValidationArguments) {
        return `El campo ${args.property} contiene valores duplicados en el campo ${args.constraints[0]}`;
    }
}
