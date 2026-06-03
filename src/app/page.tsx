import prisma from "@/lib/db";

const Home = async () => {

  const users = await prisma.user.findMany();

  return    <main className="flex items-center justify-center min-h-screen">
      {JSON.stringify(users)}
    </main>;
};

export default Home;
