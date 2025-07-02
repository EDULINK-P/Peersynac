import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const courses = [
    'Liner Algebra',
    'Calculus',
    'Data Structures',
    'Operating Systems',
    'Computer Networks',
    'Database Systems',
];

async function main() {
    const existingCourses = await prisma.course.findMany();
    if (existingCourses.length > 0) {
        console.log('Courses already exist, skipping seeding');
        return;
    }
    for(let name of courses) {
        await prisma.course.create({data: {name}});
    }
    console.log('Courses seeded');
}
main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
