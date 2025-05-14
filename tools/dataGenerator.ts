import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

export function generateValidUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthday: format(faker.date.birthdate(), 'dd-MM-yyyy'),
        email: faker.internet.email(),
        phone: generateUkrPhone(),
        password: faker.internet.password({
            length: 12,
            memorable: false,
            pattern: /[A-Za-z0-9]/,
            prefix: 'Aa1'
        })
    }
}

function generateUkrPhone(): string {
    const operatorCode = faker.helpers.arrayElement(['50', '66', '67', '68', '73', '91', '92', '93', '94', '95', '96', '97', '98', '99']);
    const part1 = faker.string.numeric(3);
    const part2 = faker.string.numeric(4);
    return `0${operatorCode}${part1}${part2}`;
}