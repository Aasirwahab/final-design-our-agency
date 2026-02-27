import { mutation } from "./_generated/server";

const teamMembers = [
    { name: 'Zaidh Zammer', role: 'Founder, Director & Head of Marketing', image: '/Zamir Founder.webp', position: 'object-top', order: 0 },
    { name: 'Wahab Aasir', role: 'Co-Founder & Full-stack Developer', image: '/cofounder_new.webp', position: 'object-top', order: 1 },
    { name: 'Hasni Ahmed', role: 'Senior Full-Stack Developer & UI/UX Designer', image: '/HASNI.webp', position: 'object-top', order: 2 },
    { name: 'RaajGughan', role: 'Software Engineer & UI/UX Designer', image: '/Kuhan.webp', position: 'object-[center_20%]', order: 3 },
]

const values = [
    { title: 'Innovative Solutions', description: 'Leading the industry with cutting-edge solutions that drive business success and transform operations.', order: 0 },
    { title: 'Client-Centric Excellence', description: 'Prioritizing client needs through customized services that enhance growth and operational efficiency.', order: 1 },
    { title: 'Quality Commitment', description: 'Maintaining unwavering commitment to excellence in every aspect of our work, ensuring outstanding results.', order: 2 },
    { title: 'Strategic Empowerment', description: 'Empowering businesses to achieve their full potential through strategic guidance and innovative solutions.', order: 3 },
]

export const seedStudio = mutation({
    handler: async (ctx) => {
        const currentMembers = await ctx.db.query("teamMembers").collect();
        if (currentMembers.length === 0) {
            for (const member of teamMembers) {
                await ctx.db.insert("teamMembers", member);
            }
        }

        const currentValues = await ctx.db.query("studioValues").collect();
        if (currentValues.length === 0) {
            for (const value of values) {
                await ctx.db.insert("studioValues", value);
            }
        }
    }
});
